import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  ChevronLeft,
  Users,
  Target,
  Eye,
  Mail,
  MapPin,
} from "lucide-react-native";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import { useRouter } from "expo-router";
import { useTeacherTheme } from "../../components/theme/useTeacherTheme";

export default function AboutUs() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { colors, isDark } = useTeacherTheme();

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const teamMembers = [
    {
      name: "Anirudh Thota",
      location: "Frisco, TX",
      email: "axt240049@utdallas.edu",
      degree: "B.S. Computer Science",
      year: "Freshman at UTD",
      initials: "AT",
    },
    {
      name: "Sahara Mumin",
      location: "Dallas, TX",
      email: "dal772544@utdallas.edu",
      degree: "B.S. Software Engineering",
      year: "Freshman at UTD",
      initials: "SM",
    },
    {
      name: "Matt Chan",
      location: "Frisco, TX",
      email: "dal831061@utdallas.edu",
      degree: "B.S. Computer Science",
      year: "Freshman at UTD",
      initials: "MC",
    },
  ];

  const TeamCard = ({ member }) => (
    <View
      style={{
        backgroundColor: colors.cardBackground,
        borderRadius: 16,
        padding: 20,
        marginHorizontal: 20,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: colors.border,
        alignItems: "center",
      }}
    >
      {/* Profile Circle */}
      <View
        style={{
          width: 80,
          height: 80,
          backgroundColor: colors.accent,
          borderRadius: 40,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 16,
        }}
      >
        <Text
          style={{
            fontFamily: "Montserrat_700Bold",
            fontSize: 24,
            color: "white",
          }}
        >
          {member.initials}
        </Text>
      </View>

      {/* Name */}
      <Text
        style={{
          fontFamily: "Montserrat_700Bold",
          fontSize: 18,
          color: colors.primaryText,
          marginBottom: 4,
          textAlign: "center",
        }}
      >
        {member.name}
      </Text>

      {/* Location */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <MapPin size={14} color={colors.accent} style={{ marginRight: 6 }} />
        <Text
          style={{
            fontFamily: "Montserrat_400Regular",
            fontSize: 14,
            color: colors.secondaryText,
          }}
        >
          {member.location}
        </Text>
      </View>

      {/* Email */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <Mail size={14} color={colors.accent} style={{ marginRight: 6 }} />
        <Text
          style={{
            fontFamily: "Montserrat_400Regular",
            fontSize: 12,
            color: colors.secondaryText,
          }}
        >
          {member.email}
        </Text>
      </View>

      {/* Education */}
      <Text
        style={{
          fontFamily: "Montserrat_600SemiBold",
          fontSize: 14,
          color: colors.primaryText,
          textAlign: "center",
          marginBottom: 2,
        }}
      >
        {member.degree}
      </Text>
      <Text
        style={{
          fontFamily: "Montserrat_400Regular",
          fontSize: 12,
          color: colors.secondaryText,
          textAlign: "center",
        }}
      >
        {member.year}
      </Text>
    </View>
  );

  const InfoSection = ({ title, content, icon: Icon }) => (
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
          marginBottom: 12,
        }}
      >
        <Icon size={20} color={colors.accent} style={{ marginRight: 12 }} />
        <Text
          style={{
            fontFamily: "Montserrat_700Bold",
            fontSize: 18,
            color: colors.primaryText,
          }}
        >
          {title}
        </Text>
      </View>
      <Text
        style={{
          fontFamily: "Montserrat_400Regular",
          fontSize: 14,
          color: colors.primaryText,
          lineHeight: 22,
        }}
      >
        {content}
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
            marginBottom: 16,
          }}
        >
          <TouchableOpacity
            onPress={() => router.back()}
            style={{ marginRight: 16 }}
          >
            <ChevronLeft color={colors.primaryText} size={28} />
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: "Montserrat_700Bold",
              fontSize: 24,
              color: colors.primaryText,
              flex: 1,
            }}
          >
            About Us
          </Text>
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
        {/* Team Introduction Header */}
        <View
          style={{
            backgroundColor: colors.cardBackground,
            borderRadius: 16,
            padding: 20,
            marginHorizontal: 20,
            marginBottom: 20,
            borderWidth: 1,
            borderColor: colors.border,
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 80,
              height: 80,
              backgroundColor: colors.accentLight,
              borderRadius: 40,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 16,
            }}
          >
            <Users size={40} color={colors.accent} />
          </View>
          <Text
            style={{
              fontFamily: "Montserrat_700Bold",
              fontSize: 24,
              color: colors.primaryText,
              marginBottom: 8,
              textAlign: "center",
            }}
          >
            Team Introduction
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
            Meet the passionate developers behind EduPal Teacher Support App
          </Text>
        </View>

        {/* Team Members */}
        {teamMembers.map((member, index) => (
          <TeamCard key={index} member={member} />
        ))}

        {/* Mission */}
        <InfoSection
          title="Our Mission"
          icon={Target}
          content="To streamline classroom management by giving teachers simple tools to track topics, students, and schedules. We believe technology should reduce workload, not add complexity."
        />

        {/* Vision */}
        <InfoSection
          title="Our Vision"
          icon={Eye}
          content="To build an intuitive educational companion that reduces workload and improves organization for educators everywhere, helping them focus on what matters most - teaching."
        />

        {/* Why We Selected This Project */}
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
              marginBottom: 12,
            }}
          >
            Why We Selected This Project
          </Text>
          <View style={{ gap: 8 }}>
            <Text
              style={{
                fontFamily: "Montserrat_400Regular",
                fontSize: 14,
                color: colors.primaryText,
                lineHeight: 22,
              }}
            >
              • Inspired by challenges faced during online learning in COVID-19,
              when teachers were under pressure to grade assignments quickly and
              maintain curriculum.
            </Text>
            <Text
              style={{
                fontFamily: "Montserrat_400Regular",
                fontSize: 14,
                color: colors.primaryText,
                lineHeight: 22,
              }}
            >
              • Our goal is to streamline and simplify the teaching process
              using intuitive digital tools.
            </Text>
            <Text
              style={{
                fontFamily: "Montserrat_400Regular",
                fontSize: 14,
                color: colors.primaryText,
                lineHeight: 22,
              }}
            >
              • We wanted to create something that could make a real difference
              in educators' daily lives.
            </Text>
          </View>
        </View>

        {/* Intended Audience */}
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
              marginBottom: 12,
            }}
          >
            Intended Audience
          </Text>
          <Text
            style={{
              fontFamily: "Montserrat_400Regular",
              fontSize: 14,
              color: colors.primaryText,
              lineHeight: 22,
            }}
          >
            • Teachers from public schools and online learning organizations
            (e.g., Kumon, virtual schools).{"\n"}• Education coordinators and
            curriculum managers.{"\n"}• Tutors and private instructors.
          </Text>
        </View>

        {/* What the App Does */}
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
              marginBottom: 12,
            }}
          >
            What the App Does
          </Text>
          <View style={{ gap: 8 }}>
            <Text
              style={{
                fontFamily: "Montserrat_400Regular",
                fontSize: 14,
                color: colors.primaryText,
                lineHeight: 22,
              }}
            >
              • Helps teachers organize lesson materials and classrooms.
            </Text>
            <Text
              style={{
                fontFamily: "Montserrat_400Regular",
                fontSize: 14,
                color: colors.primaryText,
                lineHeight: 22,
              }}
            >
              • Provides topic tracking, student insights, and calendar tools.
            </Text>
            <Text
              style={{
                fontFamily: "Montserrat_400Regular",
                fontSize: 14,
                color: colors.primaryText,
                lineHeight: 22,
              }}
            >
              • Makes weekly lesson planning easier and more consistent.
            </Text>
          </View>
        </View>

        {/* Core Use Case */}
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
              marginBottom: 12,
            }}
          >
            Core Use Case
          </Text>
          <View style={{ gap: 8 }}>
            <Text
              style={{
                fontFamily: "Montserrat_400Regular",
                fontSize: 14,
                color: colors.primaryText,
                lineHeight: 22,
              }}
            >
              • Reduce teacher workload by simplifying organization and
              classroom tracking.
            </Text>
            <Text
              style={{
                fontFamily: "Montserrat_400Regular",
                fontSize: 14,
                color: colors.primaryText,
                lineHeight: 22,
              }}
            >
              • Improve remote and hybrid learning outcomes.
            </Text>
            <Text
              style={{
                fontFamily: "Montserrat_400Regular",
                fontSize: 14,
                color: colors.primaryText,
                lineHeight: 22,
              }}
            >
              • Allow flexible weekly lesson adjustments.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
