import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  ChevronLeft,
  ChevronDown,
  Users,
  BookOpen,
  Calendar,
  BarChart3,
  Menu,
} from "lucide-react-native";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useTeacherTheme } from "../../../components/theme/useTeacherTheme";
import DropdownMenu from "../../../components/DropdownMenu";

export default function ClassroomDashboard() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { colors, isDark } = useTeacherTheme();
  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [topicsExpanded, setTopicsExpanded] = useState(true);
  const [showMenu, setShowMenu] = useState(false);

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  useEffect(() => {
    if (id) {
      fetchClassData();
    }
  }, [id]);

  const fetchClassData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/classes/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch class data");
      }
      const data = await response.json();
      setClassData(data);
    } catch (error) {
      console.error("Error fetching class data:", error);
      Alert.alert("Error", "Failed to load class data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!fontsLoaded || loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "Montserrat_400Regular",
            fontSize: 16,
            color: colors.secondaryText,
          }}
        >
          Loading classroom...
        </Text>
      </View>
    );
  }

  if (!classData) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "Montserrat_400Regular",
            fontSize: 16,
            color: colors.error,
          }}
        >
          Class not found
        </Text>
      </View>
    );
  }

  const days = ["MON", "TUE", "WED", "THU", "FRI"];

  const getGradeColor = (grade) => {
    switch (grade) {
      case "A":
        return colors.gradeA;
      case "B":
        return colors.gradeB;
      case "C":
        return colors.gradeC;
      case "D":
        return colors.gradeD;
      case "F":
        return colors.gradeF;
      default:
        return colors.secondaryText;
    }
  };

  const TopicsSection = () => (
    <View
      style={{
        backgroundColor: colors.cardBackground,
        borderRadius: 16,
        padding: 20,
        marginHorizontal: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: colors.border,
      }}
    >
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: topicsExpanded ? 16 : 0,
        }}
        onPress={() => setTopicsExpanded(!topicsExpanded)}
      >
        <Text
          style={{
            fontFamily: "Montserrat_700Bold",
            fontSize: 18,
            color: colors.primaryText,
          }}
        >
          TOPICS
        </Text>
        <ChevronDown
          size={20}
          color={colors.secondaryText}
          style={{
            transform: [{ rotate: topicsExpanded ? "0deg" : "180deg" }],
          }}
        />
      </TouchableOpacity>

      {topicsExpanded && (
        <View>
          {classData.topics?.map((topic, index) => (
            <TouchableOpacity
              key={topic.id}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 8,
                borderBottomWidth: index < classData.topics.length - 1 ? 1 : 0,
                borderBottomColor: colors.border,
              }}
              onPress={() => router.push(`/(tabs)/topics/${classData.id}`)}
            >
              <BookOpen
                size={16}
                color={colors.accent}
                style={{ marginRight: 12 }}
              />
              <Text
                style={{
                  fontFamily: "Montserrat_400Regular",
                  fontSize: 14,
                  color: colors.primaryText,
                  flex: 1,
                }}
              >
                {topic.title}
              </Text>
              <Text
                style={{
                  fontFamily: "Montserrat_400Regular",
                  fontSize: 12,
                  color: colors.secondaryText,
                }}
              >
                Week {topic.week_number}
              </Text>
            </TouchableOpacity>
          ))}
          {(!classData.topics || classData.topics.length === 0) && (
            <Text
              style={{
                fontFamily: "Montserrat_400Regular",
                fontSize: 14,
                color: colors.secondaryText,
                textAlign: "center",
                fontStyle: "italic",
              }}
            >
              No topics added yet
            </Text>
          )}
        </View>
      )}
    </View>
  );

  const StudentsSection = () => (
    <View
      style={{
        backgroundColor: colors.cardBackground,
        borderRadius: 16,
        padding: 20,
        marginHorizontal: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: colors.border,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <Text
          style={{
            fontFamily: "Montserrat_700Bold",
            fontSize: 18,
            color: colors.primaryText,
          }}
        >
          STUDENTS
        </Text>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: colors.accentLight,
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 12,
          }}
        >
          <BarChart3
            size={16}
            color={colors.accent}
            style={{ marginRight: 6 }}
          />
          <Text
            style={{
              fontFamily: "Montserrat_600SemiBold",
              fontSize: 12,
              color: colors.accent,
            }}
          >
            View Stats
          </Text>
        </TouchableOpacity>
      </View>

      {/* Simple Statistics */}
      <View
        style={{
          backgroundColor: colors.searchBackground,
          borderRadius: 12,
          padding: 16,
          marginBottom: 16,
        }}
      >
        <Text
          style={{
            fontFamily: "Montserrat_600SemiBold",
            fontSize: 14,
            color: colors.primaryText,
            marginBottom: 8,
          }}
        >
          Class Statistics
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontFamily: "Montserrat_700Bold",
                fontSize: 20,
                color: colors.accent,
              }}
            >
              {classData.students?.length || 0}
            </Text>
            <Text
              style={{
                fontFamily: "Montserrat_400Regular",
                fontSize: 12,
                color: colors.secondaryText,
              }}
            >
              Students
            </Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontFamily: "Montserrat_700Bold",
                fontSize: 20,
                color: colors.success,
              }}
            >
              {classData.topics?.length || 0}
            </Text>
            <Text
              style={{
                fontFamily: "Montserrat_400Regular",
                fontSize: 12,
                color: colors.secondaryText,
              }}
            >
              Topics
            </Text>
          </View>
        </View>
      </View>

      {/* Student List */}
      <View>
        {classData.students?.slice(0, 3).map((student, index) => (
          <TouchableOpacity
            key={student.id}
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 12,
              borderBottomWidth:
                index < Math.min(classData.students.length - 1, 2) ? 1 : 0,
              borderBottomColor: colors.border,
            }}
            onPress={() => router.push(`/(tabs)/student/${student.id}`)}
          >
            <View
              style={{
                width: 32,
                height: 32,
                backgroundColor: colors.accent,
                borderRadius: 16,
                alignItems: "center",
                justifyContent: "center",
                marginRight: 12,
              }}
            >
              <Text
                style={{
                  fontFamily: "Montserrat_600SemiBold",
                  fontSize: 14,
                  color: "white",
                }}
              >
                {student.name.charAt(0)}
              </Text>
            </View>
            <Text
              style={{
                fontFamily: "Montserrat_400Regular",
                fontSize: 14,
                color: colors.primaryText,
                flex: 1,
              }}
            >
              {student.name}
            </Text>
            <Text
              style={{
                fontFamily: "Montserrat_400Regular",
                fontSize: 12,
                color: colors.secondaryText,
              }}
            >
              View →
            </Text>
          </TouchableOpacity>
        ))}

        {classData.students?.length > 3 && (
          <TouchableOpacity
            style={{
              paddingVertical: 12,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "Montserrat_600SemiBold",
                fontSize: 14,
                color: colors.accent,
              }}
            >
              View all {classData.students.length} students
            </Text>
          </TouchableOpacity>
        )}

        {(!classData.students || classData.students.length === 0) && (
          <Text
            style={{
              fontFamily: "Montserrat_400Regular",
              fontSize: 14,
              color: colors.secondaryText,
              textAlign: "center",
              fontStyle: "italic",
            }}
          >
            No students enrolled yet
          </Text>
        )}
      </View>
    </View>
  );

  const CalendarSection = () => (
    <View
      style={{
        backgroundColor: colors.cardBackground,
        borderRadius: 16,
        padding: 20,
        marginHorizontal: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: colors.border,
      }}
    >
      <Text
        style={{
          fontFamily: "Montserrat_700Bold",
          fontSize: 18,
          color: colors.primaryText,
          marginBottom: 16,
        }}
      >
        WEEKLY CALENDAR
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ flexDirection: "row", gap: 16 }}>
          {days.map((day, index) => (
            <View
              key={day}
              style={{
                minWidth: 80,
                backgroundColor: colors.searchBackground,
                borderRadius: 12,
                padding: 12,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "Montserrat_600SemiBold",
                  fontSize: 12,
                  color: colors.secondaryText,
                  marginBottom: 8,
                }}
              >
                {day}
              </Text>

              {/* Sample events */}
              {index === 0 && (
                <View
                  style={{
                    backgroundColor: colors.accent,
                    borderRadius: 6,
                    padding: 6,
                    marginBottom: 4,
                    minHeight: 24,
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Montserrat_400Regular",
                      fontSize: 10,
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    Quiz
                  </Text>
                </View>
              )}

              {index === 2 && (
                <View
                  style={{
                    backgroundColor: colors.success,
                    borderRadius: 6,
                    padding: 6,
                    marginBottom: 4,
                    minHeight: 24,
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Montserrat_400Regular",
                      fontSize: 10,
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    Project
                  </Text>
                </View>
              )}

              {index !== 0 && index !== 2 && <View style={{ minHeight: 24 }} />}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={isDark ? "light" : "dark"} />

      {/* Header */}
      <View
        style={{
          backgroundColor: colors.background,
          paddingTop: insets.top + 16,
          paddingHorizontal: 20,
          paddingBottom: 20,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity onPress={() => router.back()}>
            <ChevronLeft color={colors.primaryText} size={28} />
          </TouchableOpacity>

          <View style={{ flex: 1, alignItems: "center" }}>
            <Text
              style={{
                fontFamily: "Montserrat_700Bold",
                fontSize: 20,
                color: colors.primaryText,
              }}
            >
              {classData.name}
            </Text>
            <Text
              style={{
                fontFamily: "Montserrat_400Regular",
                fontSize: 14,
                color: colors.secondaryText,
              }}
            >
              {classData.subject}
            </Text>
          </View>

          <TouchableOpacity onPress={() => setShowMenu(true)}>
            <Menu color={colors.primaryText} size={24} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: insets.bottom + 100,
        }}
        showsVerticalScrollIndicator={false}
      >
        <TopicsSection />
        <StudentsSection />
        <CalendarSection />
      </ScrollView>

      {/* Dropdown Menu */}
      {showMenu && <DropdownMenu onClose={() => setShowMenu(false)} />}
    </View>
  );
}
