import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  Calendar as CalendarIcon,
  Plus,
  Clock,
  BookOpen,
} from "lucide-react-native";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import { useTeacherTheme } from "../../components/theme/useTeacherTheme";

export default function Calendar() {
  const insets = useSafeAreaInsets();
  const { colors, isDark } = useTeacherTheme();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      // For MVP, we'll use mock data since we don't have a dedicated events endpoint
      // In a real implementation, you would fetch from `/api/events` or similar
      const mockEvents = [
        {
          id: 1,
          title: "Quiz on Linear Equations",
          date: "2024-11-18",
          class_name: "Algebra I",
          type: "quiz",
        },
        {
          id: 2,
          title: "Group Project Due",
          date: "2024-11-20",
          class_name: "Algebra I",
          type: "assignment",
        },
        {
          id: 3,
          title: "Lab Experiment",
          date: "2024-11-19",
          class_name: "Biology 101",
          type: "lab",
        },
        {
          id: 4,
          title: "Chapter Test",
          date: "2024-11-21",
          class_name: "Biology 101",
          type: "test",
        },
      ];
      setEvents(mockEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
      Alert.alert("Error", "Failed to load calendar events. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  const getDaysInWeek = () => {
    const today = new Date();
    const week = [];
    const startOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay()),
    );

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      week.push(day);
    }
    return week;
  };

  const getEventTypeColor = (type) => {
    switch (type) {
      case "quiz":
        return colors.accent;
      case "test":
        return colors.error;
      case "assignment":
        return colors.warning;
      case "lab":
        return colors.success;
      default:
        return colors.primaryText;
    }
  };

  const getEventTypeIcon = (type) => {
    switch (type) {
      case "quiz":
      case "test":
        return Clock;
      case "assignment":
      case "lab":
        return BookOpen;
      default:
        return CalendarIcon;
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const WeekView = () => {
    const weekDays = getDaysInWeek();

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
        <Text
          style={{
            fontFamily: "Montserrat_700Bold",
            fontSize: 18,
            color: colors.primaryText,
            marginBottom: 16,
          }}
        >
          This Week
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: "row", gap: 12 }}>
            {weekDays.map((day, index) => (
              <View
                key={index}
                style={{
                  minWidth: 80,
                  backgroundColor: isToday(day)
                    ? colors.accent
                    : colors.searchBackground,
                  borderRadius: 12,
                  padding: 12,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Montserrat_600SemiBold",
                    fontSize: 12,
                    color: isToday(day) ? "white" : colors.secondaryText,
                    marginBottom: 4,
                  }}
                >
                  {day
                    .toLocaleDateString("en-US", { weekday: "short" })
                    .toUpperCase()}
                </Text>

                <Text
                  style={{
                    fontFamily: "Montserrat_700Bold",
                    fontSize: 16,
                    color: isToday(day) ? "white" : colors.primaryText,
                  }}
                >
                  {day.getDate()}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  };

  const EventCard = ({ event }) => {
    const EventIcon = getEventTypeIcon(event.type);

    return (
      <View
        style={{
          backgroundColor: colors.cardBackground,
          borderRadius: 16,
          padding: 20,
          marginHorizontal: 20,
          marginBottom: 16,
          borderWidth: 1,
          borderColor: colors.border,
          borderLeftWidth: 4,
          borderLeftColor: getEventTypeColor(event.type),
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <EventIcon
            size={18}
            color={getEventTypeColor(event.type)}
            style={{ marginRight: 12 }}
          />
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontFamily: "Montserrat_700Bold",
                fontSize: 16,
                color: colors.primaryText,
              }}
            >
              {event.title}
            </Text>
            <Text
              style={{
                fontFamily: "Montserrat_400Regular",
                fontSize: 14,
                color: colors.secondaryText,
                marginTop: 2,
              }}
            >
              {event.class_name}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: colors.searchBackground,
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 8,
            }}
          >
            <Text
              style={{
                fontFamily: "Montserrat_600SemiBold",
                fontSize: 10,
                color: colors.secondaryText,
              }}
            >
              {new Date(event.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </Text>
          </View>
        </View>
      </View>
    );
  };

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
        <CalendarIcon size={48} color={colors.accent} strokeWidth={1.5} />
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
        No Events Scheduled
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
        Add events to keep track of quizzes, assignments, and important dates
        for your classes.
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
            Calendar
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
            onPress={() => Alert.alert("Add Event", "Feature coming soon!")}
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
          Manage your class schedule and events
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
        <WeekView />

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
              Loading events...
            </Text>
          </View>
        ) : events.length === 0 ? (
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
              Upcoming Events
            </Text>
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
