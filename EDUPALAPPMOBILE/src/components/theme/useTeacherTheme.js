import { useColorScheme } from "react-native";

export const useTeacherTheme = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const colors = {
    // Main backgrounds
    background: isDark ? "#121212" : "#FFFFFF",
    cardBackground: isDark ? "#1E1E1E" : "#FFFFFF",

    // Orange theme colors
    primary: "#FF6B35", // Main orange
    primaryLight: "#FF8A5C", // Lighter orange
    primaryDark: "#E55A2B", // Darker orange

    // Text colors
    primaryText: isDark ? "rgba(255, 255, 255, 0.87)" : "#2D3748",
    secondaryText: isDark ? "rgba(255, 255, 255, 0.60)" : "#718096",
    tertiaryText: isDark ? "rgba(255, 255, 255, 0.50)" : "#A0AEC0",
    quaternaryText: isDark ? "rgba(255, 255, 255, 0.40)" : "#CBD5E0",

    // UI elements
    border: isDark ? "rgba(255, 255, 255, 0.12)" : "#E2E8F0",
    searchBackground: isDark ? "rgba(255, 255, 255, 0.08)" : "#F7FAFC",

    // Orange accents
    accent: "#FF6B35",
    accentLight: isDark ? "rgba(255, 107, 53, 0.12)" : "#FFF5F2",
    accentText: isDark ? "rgba(255, 107, 53, 0.80)" : "#FF6B35",

    // Status colors
    success: "#38A169",
    warning: "#D69E2E",
    error: "#E53E3E",

    // Grade colors
    gradeA: "#38A169", // Green for A
    gradeB: "#3182CE", // Blue for B
    gradeC: "#D69E2E", // Yellow for C
    gradeD: "#DD6B20", // Orange for D
    gradeF: "#E53E3E", // Red for F

    // Attendance colors
    present: "#38A169", // Green
    absent: "#E53E3E", // Red

    // Chart colors
    chartColors: [
      "#FF6B35", // Primary orange
      "#38A169", // Green
      "#3182CE", // Blue
      "#D69E2E", // Yellow
      "#9F7AEA", // Purple
    ],
  };

  return { colors, isDark };
};
