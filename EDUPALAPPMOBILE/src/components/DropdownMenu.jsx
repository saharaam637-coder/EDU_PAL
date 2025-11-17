import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import {
  Menu,
  X,
  Home,
  Bell,
  Calendar,
  BarChart3,
  User,
  HelpCircle,
  Info,
  History,
  ChevronRight,
} from "lucide-react-native";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import { useRouter } from "expo-router";
import { useTeacherTheme } from "./theme/useTeacherTheme";

export default function DropdownMenu({ onClose }) {
  const router = useRouter();
  const { colors, isDark } = useTeacherTheme();
  const [visible, setVisible] = useState(true);

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const menuItems = [
    {
      icon: Home,
      title: "Home",
      subtitle: "Back to classes",
      onPress: () => {
        router.push("/(tabs)");
        handleClose();
      },
    },
    {
      icon: Bell,
      title: "Notifications",
      subtitle: "View alerts and updates",
      onPress: () => {
        // Placeholder for notifications
        handleClose();
      },
    },
    {
      icon: History,
      title: "History",
      subtitle: "Recent activities",
      onPress: () => {
        // Placeholder for history
        handleClose();
      },
    },
    {
      icon: Calendar,
      title: "Calendar",
      subtitle: "Schedule and events",
      onPress: () => {
        router.push("/(tabs)/calendar");
        handleClose();
      },
    },
    {
      icon: BarChart3,
      title: "Reports",
      subtitle: "Performance analytics",
      onPress: () => {
        // Placeholder for reports
        handleClose();
      },
    },
    {
      icon: User,
      title: "Profile",
      subtitle: "Account settings",
      onPress: () => {
        router.push("/(tabs)/settings");
        handleClose();
      },
    },
  ];

  const supportItems = [
    {
      icon: HelpCircle,
      title: "FAQ",
      onPress: () => {
        // Placeholder for FAQ
        handleClose();
      },
    },
    {
      icon: Info,
      title: "About Us",
      onPress: () => {
        router.push("/(tabs)/about");
        handleClose();
      },
    },
  ];

  const handleClose = () => {
    setVisible(false);
    onClose?.();
  };

  const MenuItem = ({ item, isSupport = false }) => (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
      }}
      onPress={item.onPress}
    >
      <View
        style={{
          width: 40,
          height: 40,
          backgroundColor: isSupport
            ? colors.searchBackground
            : colors.accentLight,
          borderRadius: 20,
          alignItems: "center",
          justifyContent: "center",
          marginRight: 16,
        }}
      >
        <item.icon
          size={20}
          color={isSupport ? colors.secondaryText : colors.accent}
        />
      </View>

      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontFamily: "Montserrat_600SemiBold",
            fontSize: 16,
            color: colors.primaryText,
            marginBottom: item.subtitle ? 2 : 0,
          }}
        >
          {item.title}
        </Text>
        {item.subtitle && (
          <Text
            style={{
              fontFamily: "Montserrat_400Regular",
              fontSize: 13,
              color: colors.secondaryText,
            }}
          >
            {item.subtitle}
          </Text>
        )}
      </View>

      <ChevronRight size={16} color={colors.secondaryText} />
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <TouchableWithoutFeedback onPress={handleClose}>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            justifyContent: "flex-end",
          }}
        >
          <TouchableWithoutFeedback onPress={() => {}}>
            <View
              style={{
                backgroundColor: colors.cardBackground,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                maxHeight: "80%",
              }}
            >
              {/* Header */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: 20,
                  paddingVertical: 20,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Montserrat_700Bold",
                    fontSize: 20,
                    color: colors.primaryText,
                  }}
                >
                  Menu
                </Text>
                <TouchableOpacity onPress={handleClose}>
                  <X size={24} color={colors.secondaryText} />
                </TouchableOpacity>
              </View>

              {/* Menu Items */}
              <View>
                {menuItems.map((item, index) => (
                  <MenuItem key={index} item={item} />
                ))}

                {/* Support Section */}
                <View
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 16,
                    borderBottomWidth: 1,
                    borderBottomColor: colors.border,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Montserrat_600SemiBold",
                      fontSize: 14,
                      color: colors.secondaryText,
                      textTransform: "uppercase",
                      letterSpacing: 0.5,
                    }}
                  >
                    Support
                  </Text>
                </View>

                {supportItems.map((item, index) => (
                  <MenuItem key={index} item={item} isSupport={true} />
                ))}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
