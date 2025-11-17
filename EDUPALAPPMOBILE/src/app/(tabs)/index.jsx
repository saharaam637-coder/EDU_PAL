import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Plus, Book, Users } from "lucide-react-native";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import { useRouter } from "expo-router";
import { useTeacherTheme } from "../../components/theme/useTeacherTheme";

export default function ClassesHome() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { colors, isDark } = useTeacherTheme();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/classes");
      if (!response.ok) {
        throw new Error("Failed to fetch classes");
      }
      const data = await response.json();
      setClasses(data);
    } catch (error) {
      console.error("Error fetching classes:", error);
      Alert.alert("Error", "Failed to load classes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddClass = () => {
    Alert.alert("Add New Class", "This feature will be available soon!", [
      { text: "OK", style: "default" },
    ]);
  };

  if (!fontsLoaded) {
    return null;
  }

  const AppLogo = () => (
    <View
      style={{
        width: 52,
        height: 52,
        backgroundColor: colors.cardBackground,
        borderRadius: 16,
        shadowColor: isDark ? "rgba(255, 107, 53, 0.3)" : "#FFB89A",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
      }}
    >
      <View
        style={{
          width: 8,
          height: 16,
          backgroundColor: colors.accent,
          borderRadius: 4,
        }}
      />
      <View
        style={{
          width: 8,
          height: 16,
          backgroundColor: colors.primaryLight,
          borderRadius: 4,
        }}
      />
    </View>
  );

  const ClassCard = ({ classItem }) => (
    <TouchableOpacity
      style={{
        backgroundColor: colors.cardBackground,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: colors.border,
        padding: 24,
        marginBottom: 16,
        marginHorizontal: 20,
        shadowColor: colors.accent,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        borderLeftWidth: 4,
        borderLeftColor: classItem.color || colors.accent,
      }}
      onPress={() => router.push(`/(tabs)/classroom/${classItem.id}`)}
    >
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}
      >
        <View
          style={{
            width: 36,
            height: 36,
            backgroundColor: classItem.color || colors.accent,
            borderRadius: 18,
            alignItems: "center",
            justifyContent: "center",
            marginRight: 12,
          }}
        >
          <Book color="white" size={18} />
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily: "Montserrat_700Bold",
              fontSize: 18,
              color: colors.primaryText,
              marginBottom: 2,
            }}
          >
            {classItem.name}
          </Text>
          <Text
            style={{
              fontFamily: "Montserrat_400Regular",
              fontSize: 14,
              color: colors.secondaryText,
            }}
          >
            {classItem.subject}
          </Text>
        </View>
      </View>
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
        <Book size={48} color={colors.accent} strokeWidth={1.5} />
      </View>

      <Text
        style={{
          fontFamily: "Montserrat_700Bold",
          fontSize: 24,
          color: colors.primaryText,
          marginBottom: 12,
          textAlign: "center",
        }}
      >
        Welcome to EduPal
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
        Start by adding your first class to begin organizing your teaching
        materials and tracking student progress.
      </Text>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={isDark ? "light" : "dark"} />

      {/* Fixed Header */}
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
            marginBottom: 24,
          }}
        >
          <AppLogo />
          <TouchableOpacity
            style={{
              width: 52,
              height: 52,
              backgroundColor: colors.accent,
              borderRadius: 26,
              alignItems: "center",
              justifyContent: "center",
              shadowColor: colors.accent,
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.25,
              shadowRadius: 6,
              elevation: 6,
            }}
            onPress={handleAddClass}
          >
            <Plus color="white" size={26} strokeWidth={2} />
          </TouchableOpacity>
        </View>

        <Text
          style={{
            fontFamily: "Montserrat_700Bold",
            fontSize: 36,
            color: colors.primaryText,
            marginBottom: 8,
          }}
        >
          EduPal
        </Text>
        <Text
          style={{
            fontFamily: "Montserrat_400Regular",
            fontSize: 16,
            color: colors.secondaryText,
          }}
        >
          Manage your classes and students
        </Text>
      </View>

      {/* Main Content */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: insets.bottom + 100,
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
      >
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
              Loading classes...
            </Text>
          </View>
        ) : classes.length === 0 ? (
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
              Your Classes
            </Text>
            {classes.map((classItem) => (
              <ClassCard key={classItem.id} classItem={classItem} />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
