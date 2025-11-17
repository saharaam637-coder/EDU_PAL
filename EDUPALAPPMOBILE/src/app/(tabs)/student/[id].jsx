import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  ChevronLeft,
  User,
  CheckCircle,
  XCircle,
  BarChart3,
  MessageSquare,
} from "lucide-react-native";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useTeacherTheme } from "../../../components/theme/useTeacherTheme";

export default function StudentDetail() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { colors, isDark } = useTeacherTheme();
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  useEffect(() => {
    if (id) {
      fetchStudentData();
    }
  }, [id]);

  const fetchStudentData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/students/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch student data");
      }
      const data = await response.json();
      setStudentData(data);
    } catch (error) {
      console.error("Error fetching student data:", error);
      Alert.alert("Error", "Failed to load student data. Please try again.");
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
          Loading student...
        </Text>
      </View>
    );
  }

  if (!studentData) {
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
          Student not found
        </Text>
      </View>
    );
  }

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

  const AttendanceSection = () => (
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
        Attendance
      </Text>

      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        {studentData.attendance?.map((record, index) => (
          <View key={index} style={{ alignItems: "center" }}>
            {record.status === "present" ? (
              <CheckCircle size={24} color={colors.present} />
            ) : (
              <XCircle size={24} color={colors.absent} />
            )}
            <Text
              style={{
                fontFamily: "Montserrat_400Regular",
                fontSize: 10,
                color: colors.secondaryText,
                marginTop: 4,
              }}
            >
              {new Date(record.date).getDate()}/
              {new Date(record.date).getMonth() + 1}
            </Text>
          </View>
        ))}
      </View>

      {(!studentData.attendance || studentData.attendance.length === 0) && (
        <Text
          style={{
            fontFamily: "Montserrat_400Regular",
            fontSize: 14,
            color: colors.secondaryText,
            textAlign: "center",
            fontStyle: "italic",
          }}
        >
          No attendance records
        </Text>
      )}
    </View>
  );

  const GradesSection = () => (
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
        Grades
      </Text>

      <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
        {studentData.grades?.slice(0, 4).map((grade, index) => (
          <View
            key={index}
            style={{
              backgroundColor: getGradeColor(grade.grade),
              borderRadius: 20,
              paddingHorizontal: 12,
              paddingVertical: 8,
              minWidth: 40,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "Montserrat_700Bold",
                fontSize: 16,
                color: "white",
              }}
            >
              {grade.grade}
            </Text>
            <Text
              style={{
                fontFamily: "Montserrat_400Regular",
                fontSize: 10,
                color: "white",
                opacity: 0.9,
              }}
            >
              {grade.subject.substring(0, 8)}
            </Text>
          </View>
        ))}
      </View>

      {(!studentData.grades || studentData.grades.length === 0) && (
        <Text
          style={{
            fontFamily: "Montserrat_400Regular",
            fontSize: 14,
            color: colors.secondaryText,
            textAlign: "center",
            fontStyle: "italic",
          }}
        >
          No grades recorded
        </Text>
      )}
    </View>
  );

  const CommentsSection = () => (
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
        Comments
      </Text>

      {studentData.comments?.map((comment, index) => (
        <View
          key={comment.id}
          style={{
            backgroundColor: colors.searchBackground,
            borderRadius: 12,
            padding: 16,
            marginBottom: index < studentData.comments.length - 1 ? 12 : 0,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <MessageSquare size={16} color={colors.accent} />
            <Text
              style={{
                fontFamily: "Montserrat_600SemiBold",
                fontSize: 12,
                color: colors.secondaryText,
                marginLeft: 8,
              }}
            >
              {new Date(comment.created_at).toLocaleDateString()}
            </Text>
          </View>
          <Text
            style={{
              fontFamily: "Montserrat_400Regular",
              fontSize: 14,
              color: colors.primaryText,
              lineHeight: 20,
            }}
          >
            {comment.comment_text}
          </Text>
        </View>
      ))}

      {(!studentData.comments || studentData.comments.length === 0) && (
        <Text
          style={{
            fontFamily: "Montserrat_400Regular",
            fontSize: 14,
            color: colors.secondaryText,
            textAlign: "center",
            fontStyle: "italic",
          }}
        >
          No comments added
        </Text>
      )}
    </View>
  );

  const StatsSection = () => {
    const presentCount =
      studentData.attendance?.filter((a) => a.status === "present").length || 0;
    const totalAttendance = studentData.attendance?.length || 0;
    const attendanceRate =
      totalAttendance > 0
        ? Math.round((presentCount / totalAttendance) * 100)
        : 0;

    const gradeAverage =
      studentData.grades?.length > 0
        ? studentData.grades.reduce((sum, grade) => {
            const gradePoints = { A: 4, B: 3, C: 2, D: 1, F: 0 };
            return sum + (gradePoints[grade.grade] || 0);
          }, 0) / studentData.grades.length
        : 0;

    return (
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
            Statistics
          </Text>
          <BarChart3 size={20} color={colors.accent} />
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ alignItems: "center", flex: 1 }}>
            <Text
              style={{
                fontFamily: "Montserrat_700Bold",
                fontSize: 24,
                color: colors.accent,
              }}
            >
              {attendanceRate}%
            </Text>
            <Text
              style={{
                fontFamily: "Montserrat_400Regular",
                fontSize: 12,
                color: colors.secondaryText,
                textAlign: "center",
              }}
            >
              Attendance Rate
            </Text>
          </View>

          <View style={{ alignItems: "center", flex: 1 }}>
            <Text
              style={{
                fontFamily: "Montserrat_700Bold",
                fontSize: 24,
                color: colors.success,
              }}
            >
              {gradeAverage.toFixed(1)}
            </Text>
            <Text
              style={{
                fontFamily: "Montserrat_400Regular",
                fontSize: 12,
                color: colors.secondaryText,
                textAlign: "center",
              }}
            >
              Grade Average
            </Text>
          </View>

          <View style={{ alignItems: "center", flex: 1 }}>
            <Text
              style={{
                fontFamily: "Montserrat_700Bold",
                fontSize: 24,
                color: colors.primaryText,
              }}
            >
              {studentData.grades?.length || 0}
            </Text>
            <Text
              style={{
                fontFamily: "Montserrat_400Regular",
                fontSize: 12,
                color: colors.secondaryText,
                textAlign: "center",
              }}
            >
              Total Grades
            </Text>
          </View>
        </View>
      </View>
    );
  };

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
          }}
        >
          <TouchableOpacity
            onPress={() => router.back()}
            style={{ marginRight: 16 }}
          >
            <ChevronLeft color={colors.primaryText} size={28} />
          </TouchableOpacity>

          <View
            style={{
              width: 48,
              height: 48,
              backgroundColor: colors.accent,
              borderRadius: 24,
              alignItems: "center",
              justifyContent: "center",
              marginRight: 16,
            }}
          >
            <Text
              style={{
                fontFamily: "Montserrat_700Bold",
                fontSize: 18,
                color: "white",
              }}
            >
              {studentData.name.charAt(0)}
            </Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontFamily: "Montserrat_700Bold",
                fontSize: 20,
                color: colors.primaryText,
              }}
            >
              {studentData.name}
            </Text>
            <Text
              style={{
                fontFamily: "Montserrat_400Regular",
                fontSize: 14,
                color: colors.secondaryText,
              }}
            >
              {studentData.class_name} • {studentData.class_subject}
            </Text>
          </View>
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
        <AttendanceSection />
        <GradesSection />
        <CommentsSection />
        <StatsSection />
      </ScrollView>
    </View>
  );
}
