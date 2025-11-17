import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  ChevronLeft,
  ChevronDown,
  BookOpen,
  Plus,
  Filter,
} from "lucide-react-native";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useTeacherTheme } from "../../../components/theme/useTeacherTheme";

export default function TopicsPage() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { classId } = useLocalSearchParams();
  const { colors, isDark } = useTeacherTheme();
  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filterExpanded, setFilterExpanded] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState(null);

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  useEffect(() => {
    if (classId) {
      fetchClassData();
    }
  }, [classId]);

  const fetchClassData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/classes/${classId}`);
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
          Loading topics...
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

  const weeks = [
    ...new Set(classData.topics?.map((t) => t.week_number) || []),
  ].sort();

  const filteredTopics = selectedWeek
    ? classData.topics?.filter((t) => t.week_number === selectedWeek) || []
    : classData.topics || [];

  const FilterDropdown = () => (
    <View
      style={{
        backgroundColor: colors.cardBackground,
        borderRadius: 16,
        padding: 16,
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
        }}
        onPress={() => setFilterExpanded(!filterExpanded)}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Filter size={18} color={colors.accent} style={{ marginRight: 8 }} />
          <Text
            style={{
              fontFamily: "Montserrat_600SemiBold",
              fontSize: 16,
              color: colors.primaryText,
            }}
          >
            Filter by Week
          </Text>
        </View>
        <ChevronDown
          size={20}
          color={colors.secondaryText}
          style={{
            transform: [{ rotate: filterExpanded ? "180deg" : "0deg" }],
          }}
        />
      </TouchableOpacity>

      {filterExpanded && (
        <View style={{ marginTop: 16, gap: 8 }}>
          <TouchableOpacity
            style={{
              padding: 12,
              borderRadius: 8,
              backgroundColor: !selectedWeek
                ? colors.accent
                : colors.searchBackground,
            }}
            onPress={() => setSelectedWeek(null)}
          >
            <Text
              style={{
                fontFamily: "Montserrat_400Regular",
                fontSize: 14,
                color: !selectedWeek ? "white" : colors.primaryText,
              }}
            >
              All Weeks
            </Text>
          </TouchableOpacity>

          {weeks.map((week) => (
            <TouchableOpacity
              key={week}
              style={{
                padding: 12,
                borderRadius: 8,
                backgroundColor:
                  selectedWeek === week
                    ? colors.accent
                    : colors.searchBackground,
              }}
              onPress={() => setSelectedWeek(week)}
            >
              <Text
                style={{
                  fontFamily: "Montserrat_400Regular",
                  fontSize: 14,
                  color: selectedWeek === week ? "white" : colors.primaryText,
                }}
              >
                Week {week}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );

  const TopicCard = ({ topic }) => (
    <TouchableOpacity
      style={{
        backgroundColor: colors.cardBackground,
        borderRadius: 16,
        padding: 20,
        marginHorizontal: 20,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: colors.border,
        borderLeftWidth: 4,
        borderLeftColor: colors.accent,
      }}
    >
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}
      >
        <BookOpen size={18} color={colors.accent} style={{ marginRight: 12 }} />
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily: "Montserrat_700Bold",
              fontSize: 16,
              color: colors.primaryText,
            }}
          >
            {topic.title}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: colors.accentLight,
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 8,
          }}
        >
          <Text
            style={{
              fontFamily: "Montserrat_600SemiBold",
              fontSize: 10,
              color: colors.accent,
            }}
          >
            Week {topic.week_number}
          </Text>
        </View>
      </View>

      <Text
        style={{
          fontFamily: "Montserrat_400Regular",
          fontSize: 14,
          color: colors.secondaryText,
          marginLeft: 30,
        }}
      >
        Added {new Date(topic.created_at).toLocaleDateString()}
      </Text>
    </TouchableOpacity>
  );

  const EmptyState = () => (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 40,
        paddingVertical: 80,
      }}
    >
      <View
        style={{
          width: 120,
          height: 120,
          backgroundColor: colors.accentLight,
          borderRadius: 60,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 24,
        }}
      >
        <BookOpen size={48} color={colors.accent} strokeWidth={1.5} />
      </View>

      <Text
        style={{
          fontFamily: "Montserrat_700Bold",
          fontSize: 22,
          color: colors.primaryText,
          marginBottom: 12,
          textAlign: "center",
        }}
      >
        No Topics Yet
      </Text>

      <Text
        style={{
          fontFamily: "Montserrat_400Regular",
          fontSize: 16,
          color: colors.secondaryText,
          textAlign: "center",
          lineHeight: 24,
        }}
      >
        {selectedWeek
          ? `No topics found for Week ${selectedWeek}. Try selecting a different week.`
          : "Start adding topics to organize your curriculum and lesson plans."}
      </Text>
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
            marginBottom: 16,
          }}
        >
          <TouchableOpacity onPress={() => router.back()}>
            <ChevronLeft color={colors.primaryText} size={28} />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: 36,
              height: 36,
              backgroundColor: colors.accent,
              borderRadius: 18,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => Alert.alert("Add Topic", "Feature coming soon!")}
          >
            <Plus color="white" size={18} strokeWidth={2} />
          </TouchableOpacity>
        </View>

        <Text
          style={{
            fontFamily: "Montserrat_700Bold",
            fontSize: 28,
            color: colors.primaryText,
            marginBottom: 4,
          }}
        >
          {classData.name} - Topics
        </Text>
        <Text
          style={{
            fontFamily: "Montserrat_400Regular",
            fontSize: 16,
            color: colors.secondaryText,
          }}
        >
          {filteredTopics.length}{" "}
          {filteredTopics.length === 1 ? "topic" : "topics"}
        </Text>
      </View>

      {/* Content */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: insets.bottom + 100,
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
      >
        <FilterDropdown />

        {filteredTopics.length === 0 ? (
          <EmptyState />
        ) : (
          <View>
            {filteredTopics.map((topic) => (
              <TopicCard key={topic.id} topic={topic} />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
