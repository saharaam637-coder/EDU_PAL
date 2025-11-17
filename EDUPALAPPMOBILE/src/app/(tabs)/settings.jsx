import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
  Switch,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  Settings as SettingsIcon,
  User,
  Mail,
  IdCard,
  Moon,
  Bell,
  Shield,
  HelpCircle,
  Trash2,
  ChevronRight,
  Info,
} from "lucide-react-native";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import { useTeacherTheme } from "../../components/theme/useTeacherTheme";

export default function Settings() {
  const insets = useSafeAreaInsets();
  const { colors, isDark } = useTeacherTheme();
  const [userProfile, setUserProfile] = useState({
    name: "Sarah Johnson",
    email: "sarah.johnson@school.edu",
    teacherId: "TCH-2024-001",
  });
  const [preferences, setPreferences] = useState({
    darkMode: isDark,
    notifications: true,
  });
  const [editing, setEditing] = useState(false);

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleSaveProfile = () => {
    setEditing(false);
    Alert.alert("Success", "Profile updated successfully!");
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "This action cannot be undone. Are you sure you want to delete your account?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            Alert.alert(
              "Feature Disabled",
              "Account deletion is not available in this demo.",
            );
          },
        },
      ],
    );
  };

  const ProfileSection = () => (
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
          User Profile
        </Text>
        <TouchableOpacity
          onPress={() => (editing ? handleSaveProfile() : setEditing(true))}
        >
          <Text
            style={{
              fontFamily: "Montserrat_600SemiBold",
              fontSize: 14,
              color: colors.accent,
            }}
          >
            {editing ? "Save" : "Edit"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ gap: 16 }}>
        <View>
          <Text
            style={{
              fontFamily: "Montserrat_600SemiBold",
              fontSize: 12,
              color: colors.secondaryText,
              marginBottom: 8,
            }}
          >
            Name
          </Text>
          {editing ? (
            <TextInput
              value={userProfile.name}
              onChangeText={(text) =>
                setUserProfile((prev) => ({ ...prev, name: text }))
              }
              style={{
                backgroundColor: colors.searchBackground,
                borderRadius: 8,
                padding: 12,
                fontFamily: "Montserrat_400Regular",
                fontSize: 14,
                color: colors.primaryText,
              }}
            />
          ) : (
            <Text
              style={{
                fontFamily: "Montserrat_400Regular",
                fontSize: 14,
                color: colors.primaryText,
                backgroundColor: colors.searchBackground,
                borderRadius: 8,
                padding: 12,
              }}
            >
              {userProfile.name}
            </Text>
          )}
        </View>

        <View>
          <Text
            style={{
              fontFamily: "Montserrat_600SemiBold",
              fontSize: 12,
              color: colors.secondaryText,
              marginBottom: 8,
            }}
          >
            Email
          </Text>
          {editing ? (
            <TextInput
              value={userProfile.email}
              onChangeText={(text) =>
                setUserProfile((prev) => ({ ...prev, email: text }))
              }
              keyboardType="email-address"
              style={{
                backgroundColor: colors.searchBackground,
                borderRadius: 8,
                padding: 12,
                fontFamily: "Montserrat_400Regular",
                fontSize: 14,
                color: colors.primaryText,
              }}
            />
          ) : (
            <Text
              style={{
                fontFamily: "Montserrat_400Regular",
                fontSize: 14,
                color: colors.primaryText,
                backgroundColor: colors.searchBackground,
                borderRadius: 8,
                padding: 12,
              }}
            >
              {userProfile.email}
            </Text>
          )}
        </View>

        <View>
          <Text
            style={{
              fontFamily: "Montserrat_600SemiBold",
              fontSize: 12,
              color: colors.secondaryText,
              marginBottom: 8,
            }}
          >
            Teacher ID
          </Text>
          {editing ? (
            <TextInput
              value={userProfile.teacherId}
              onChangeText={(text) =>
                setUserProfile((prev) => ({ ...prev, teacherId: text }))
              }
              style={{
                backgroundColor: colors.searchBackground,
                borderRadius: 8,
                padding: 12,
                fontFamily: "Montserrat_400Regular",
                fontSize: 14,
                color: colors.primaryText,
              }}
            />
          ) : (
            <Text
              style={{
                fontFamily: "Montserrat_400Regular",
                fontSize: 14,
                color: colors.primaryText,
                backgroundColor: colors.searchBackground,
                borderRadius: 8,
                padding: 12,
              }}
            >
              {userProfile.teacherId}
            </Text>
          )}
        </View>
      </View>
    </View>
  );

  const PreferencesSection = () => (
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
        Preferences
      </Text>

      <View style={{ gap: 16 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
            <Moon size={18} color={colors.accent} style={{ marginRight: 12 }} />
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: "Montserrat_600SemiBold",
                  fontSize: 14,
                  color: colors.primaryText,
                  marginBottom: 2,
                }}
              >
                Dark Mode
              </Text>
              <Text
                style={{
                  fontFamily: "Montserrat_400Regular",
                  fontSize: 12,
                  color: colors.secondaryText,
                }}
              >
                Switch to dark theme
              </Text>
            </View>
          </View>
          <Switch
            value={preferences.darkMode}
            onValueChange={(value) => {
              setPreferences((prev) => ({ ...prev, darkMode: value }));
              Alert.alert(
                "Dark Mode",
                "Theme changes will apply on app restart.",
              );
            }}
            trackColor={{ false: colors.searchBackground, true: colors.accent }}
            thumbColor="white"
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
            <Bell size={18} color={colors.accent} style={{ marginRight: 12 }} />
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: "Montserrat_600SemiBold",
                  fontSize: 14,
                  color: colors.primaryText,
                  marginBottom: 2,
                }}
              >
                Notifications
              </Text>
              <Text
                style={{
                  fontFamily: "Montserrat_400Regular",
                  fontSize: 12,
                  color: colors.secondaryText,
                }}
              >
                Receive app notifications
              </Text>
            </View>
          </View>
          <Switch
            value={preferences.notifications}
            onValueChange={(value) =>
              setPreferences((prev) => ({ ...prev, notifications: value }))
            }
            trackColor={{ false: colors.searchBackground, true: colors.accent }}
            thumbColor="white"
          />
        </View>
      </View>
    </View>
  );

  const SupportSection = () => (
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
        Support & Privacy
      </Text>

      <View style={{ gap: 16 }}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 8,
          }}
          onPress={() =>
            Alert.alert("FAQ", "Frequently Asked Questions coming soon!")
          }
        >
          <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
            <HelpCircle
              size={18}
              color={colors.accent}
              style={{ marginRight: 12 }}
            />
            <Text
              style={{
                fontFamily: "Montserrat_600SemiBold",
                fontSize: 14,
                color: colors.primaryText,
              }}
            >
              FAQ
            </Text>
          </View>
          <ChevronRight size={16} color={colors.secondaryText} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 8,
          }}
          onPress={() =>
            Alert.alert(
              "Privacy Policy",
              "Privacy Policy will be available soon.",
            )
          }
        >
          <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
            <Shield
              size={18}
              color={colors.accent}
              style={{ marginRight: 12 }}
            />
            <Text
              style={{
                fontFamily: "Montserrat_600SemiBold",
                fontSize: 14,
                color: colors.primaryText,
              }}
            >
              Privacy Policy
            </Text>
          </View>
          <ChevronRight size={16} color={colors.secondaryText} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 8,
          }}
          onPress={() =>
            Alert.alert(
              "About",
              "EduPal Teacher Support App v1.0\n\nDeveloped by:\n• Anirudh Thota\n• Sahara Mumin\n• Matt Chan",
            )
          }
        >
          <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
            <Info size={18} color={colors.accent} style={{ marginRight: 12 }} />
            <Text
              style={{
                fontFamily: "Montserrat_600SemiBold",
                fontSize: 14,
                color: colors.primaryText,
              }}
            >
              About
            </Text>
          </View>
          <ChevronRight size={16} color={colors.secondaryText} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const DangerSection = () => (
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
          justifyContent: "center",
          paddingVertical: 12,
        }}
        onPress={handleDeleteAccount}
      >
        <Trash2 size={18} color={colors.error} style={{ marginRight: 8 }} />
        <Text
          style={{
            fontFamily: "Montserrat_600SemiBold",
            fontSize: 14,
            color: colors.error,
          }}
        >
          Delete Account
        </Text>
      </TouchableOpacity>
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
        <Text
          style={{
            fontFamily: "Montserrat_700Bold",
            fontSize: 32,
            color: colors.primaryText,
            marginBottom: 8,
          }}
        >
          Settings
        </Text>
        <Text
          style={{
            fontFamily: "Montserrat_400Regular",
            fontSize: 16,
            color: colors.secondaryText,
          }}
        >
          Manage your profile and preferences
        </Text>
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
        <ProfileSection />
        <PreferencesSection />
        <SupportSection />
        <DangerSection />
      </ScrollView>
    </View>
  );
}
