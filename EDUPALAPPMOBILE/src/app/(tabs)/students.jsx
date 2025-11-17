import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Users, Plus, Search, User, ChevronRight } from "lucide-react-native";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import { useRouter } from "expo-router";
import { useTeacherTheme } from "../../components/theme/useTeacherTheme";

export default function Students() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { colors, isDark } = useTeacherTheme();
  const [allStudents, setAllStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Filter students based on search text
    if (searchText.trim() === "") {
      setFilteredStudents(allStudents);
    } else {
      const filtered = allStudents.filter(
        (student) =>
          student.name.toLowerCase().includes(searchText.toLowerCase()) ||
          student.class_name
            ?.toLowerCase()
            .includes(searchText.toLowerCase()) ||
          student.class_subject
            ?.toLowerCase()
            .includes(searchText.toLowerCase()),
      );
      setFilteredStudents(filtered);
    }
  }, [searchText, allStudents]);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch classes first to get all students
      const classesResponse = await fetch("/api/classes");
      if (!classesResponse.ok) {
        throw new Error("Failed to fetch classes");
      }
      const classesData = await classesResponse.json();
      setClasses(classesData);

      // Get all students from all classes
      let allStudentsData = [];

      for (const classItem of classesData) {
        const classResponse = await fetch(`/api/classes/${classItem.id}`);
        if (classResponse.ok) {
          const classDetail = await classResponse.json();
          if (classDetail.students) {
            const studentsWithClass = classDetail.students.map((student) => ({
              ...student,
              class_name: classItem.name,
              class_subject: classItem.subject,
              class_color: classItem.color,
            }));
            allStudentsData = [...allStudentsData, ...studentsWithClass];
          }
        }
      }

      setAllStudents(allStudentsData);
    } catch (error) {
      console.error("Error fetching students:", error);
      Alert.alert("Error", "Failed to load students. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  const getClassStatistics = () => {
    const totalStudents = allStudents.length;
    const totalClasses = classes.length;
    const averagePerClass =
      totalClasses > 0 ? Math.round(totalStudents / totalClasses) : 0;

    return { totalStudents, totalClasses, averagePerClass };
  };

  const stats = getClassStatistics();

  const StudentCard = ({ student }) => (
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
        borderLeftColor: student.class_color || colors.accent,
      }}
      onPress={() => router.push(`/(tabs)/student/${student.id}`)}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={{
            width: 48,
            height: 48,
            backgroundColor: student.class_color || colors.accent,
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
            {student.name.charAt(0)}
          </Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily: "Montserrat_700Bold",
              fontSize: 16,
              color: colors.primaryText,
              marginBottom: 2,
            }}
          >
            {student.name}
          </Text>
          <Text
            style={{
              fontFamily: "Montserrat_400Regular",
              fontSize: 14,
              color: colors.secondaryText,
            }}
          >
            {student.class_name} • {student.class_subject}
          </Text>
        </View>

        <ChevronRight size={20} color={colors.secondaryText} />
      </View>
    </TouchableOpacity>
  );

  const StatisticsSection = () => (
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
        Overview
      </Text>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ alignItems: "center", flex: 1 }}>
          <Text
            style={{
              fontFamily: "Montserrat_700Bold",
              fontSize: 24,
              color: colors.accent,
            }}
          >
            {stats.totalStudents}
          </Text>
          <Text
            style={{
              fontFamily: "Montserrat_400Regular",
              fontSize: 12,
              color: colors.secondaryText,
              textAlign: "center",
            }}
          >
            Total Students
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
            {stats.totalClasses}
          </Text>
          <Text
            style={{
              fontFamily: "Montserrat_400Regular",
              fontSize: 12,
              color: colors.secondaryText,
              textAlign: "center",
            }}
          >
            Classes
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
            {stats.averagePerClass}
          </Text>
          <Text
            style={{
              fontFamily: "Montserrat_400Regular",
              fontSize: 12,
              color: colors.secondaryText,
              textAlign: "center",
            }}
          >
            Avg per Class
          </Text>
        </View>
      </View>
    </View>
  );

  const SearchBar = () => (
    <View
      style={{
        height: 44,
        backgroundColor: colors.searchBackground,
        borderRadius: 22,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 20,
        marginHorizontal: 20,
        marginBottom: 20,
      }}
    >
      <Search size={18} color={colors.secondaryText} />
      <TextInput
        placeholder="Search students or classes..."
        placeholderTextColor={colors.secondaryText}
        value={searchText}
        onChangeText={setSearchText}
        style={{
          flex: 1,
          marginLeft: 12,
          fontFamily: "Montserrat_400Regular",
          fontSize: 16,
          color: colors.primaryText,
        }}
      />
    </View>
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
        <Users size={48} color={colors.accent} strokeWidth={1.5} />
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
        {searchText ? "No Students Found" : "No Students Yet"}
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
        {searchText
          ? `No students match "${searchText}". Try a different search term.`
          : "Students will appear here as you add them to your classes."}
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
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <Text
            style={{
              fontFamily: "Montserrat_700Bold",
              fontSize: 32,
              color: colors.primaryText,
            }}
          >
            Students
          </Text>
          <TouchableOpacity
            style={{
              width: 44,
              height: 44,
              backgroundColor: colors.accent,
              borderRadius: 22,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => Alert.alert("Add Student", "Feature coming soon!")}
          >
            <Plus color="white" size={22} strokeWidth={2} />
          </TouchableOpacity>
        </View>

        <Text
          style={{
            fontFamily: "Montserrat_400Regular",
            fontSize: 16,
            color: colors.secondaryText,
          }}
        >
          View and manage all your students
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
        <StatisticsSection />
        <SearchBar />

        {loading ? (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 80,
            }}
          >
            <Text
              style={{
                fontFamily: "Montserrat_400Regular",
                fontSize: 16,
                color: colors.secondaryText,
              }}
            >
              Loading students...
            </Text>
          </View>
        ) : filteredStudents.length === 0 ? (
          <EmptyState />
        ) : (
          <View>
            <Text
              style={{
                fontFamily: "Montserrat_600SemiBold",
                fontSize: 18,
                color: colors.primaryText,
                marginBottom: 16,
                marginHorizontal: 20,
              }}
            >
              {searchText
                ? `Search Results (${filteredStudents.length})`
                : "All Students"}
            </Text>
            {filteredStudents.map((student) => (
              <StudentCard
                key={`${student.id}-${student.class_id}`}
                student={student}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
