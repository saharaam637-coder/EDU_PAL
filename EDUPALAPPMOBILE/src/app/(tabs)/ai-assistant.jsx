import React, { useState } from "react";
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
import {
  Bot,
  Send,
  Sparkles,
  MessageCircle,
  Lightbulb,
  FileText,
  Calendar,
  Users,
} from "lucide-react-native";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import { useTeacherTheme } from "../../components/theme/useTeacherTheme";

export default function AIAssistant() {
  const insets = useSafeAreaInsets();
  const { colors, isDark } = useTeacherTheme();
  const [inputText, setInputText] = useState("");
  const [responseText, setResponseText] = useState("");
  const [loading, setLoading] = useState(false);

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    setLoading(true);
    setResponseText("");

    try {
      const res = await fetch(
        "https://8ddc4f93-642e-40c3-be60-5c65d597abc1-00-8nyyjzznj41n.spock.replit.dev/api/educator-ai",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: inputText }),
        }
      );

      const data = await res.json();
      setResponseText(data?.response || "No response received.");
    } catch (err) {
      Alert.alert("Error", "Failed to get AI response.");
    } finally {
      setLoading(false);
      setInputText("");
    }
  };

  const suggestedPrompts = [
    {
      icon: FileText,
      title: "Create Lesson Plan",
      subtitle: "Generate a lesson plan for any topic",
      prompt: "Help me create a lesson plan for algebra basics",
    },
    {
      icon: Users,
      title: "Student Insights",
      subtitle: "Analyze student performance patterns",
      prompt: "What insights can you provide about my students' progress?",
    },
    {
      icon: Calendar,
      title: "Schedule Optimizer",
      subtitle: "Optimize your teaching schedule",
      prompt: "Help me optimize my weekly teaching schedule",
    },
    {
      icon: Lightbulb,
      title: "Teaching Ideas",
      subtitle: "Get creative teaching suggestions",
      prompt: "Give me creative ways to teach fractions to middle schoolers",
    },
  ];

  const FeatureCard = ({ icon: Icon, title, subtitle, onPress }) => (
    <TouchableOpacity
      style={{
        backgroundColor: colors.cardBackground,
        borderRadius: 16,
        padding: 20,
        marginHorizontal: 20,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: colors.border,
        flexDirection: "row",
        alignItems: "center",
      }}
      onPress={onPress}
    >
      <View
        style={{
          width: 48,
          height: 48,
          backgroundColor: colors.accentLight,
          borderRadius: 24,
          alignItems: "center",
          justifyContent: "center",
          marginRight: 16,
        }}
      >
        <Icon size={24} color={colors.accent} />
      </View>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontFamily: "Montserrat_600SemiBold",
            fontSize: 16,
            color: colors.primaryText,
            marginBottom: 4,
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            fontFamily: "Montserrat_400Regular",
            fontSize: 13,
            color: colors.secondaryText,
            lineHeight: 18,
          }}
        >
          {subtitle}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={isDark ? "light" : "dark"} />

      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top + 20,
          paddingBottom: insets.bottom + 140,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={{
            fontFamily: "Montserrat_700Bold",
            fontSize: 24,
            textAlign: "center",
            color: colors.primaryText,
            marginBottom: 20,
          }}
        >
          Ask the AI Assistant
        </Text>

        {suggestedPrompts.map((item, i) => (
          <FeatureCard
            key={i}
            icon={item.icon}
            title={item.title}
            subtitle={item.subtitle}
            onPress={() => setInputText(item.prompt)}
          />
        ))}

        {responseText.length > 0 && (
          <View
            style={{
              margin: 20,
              backgroundColor: colors.cardBackground,
              borderRadius: 16,
              padding: 16,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <Text
              style={{
                fontFamily: "Montserrat_400Regular",
                color: colors.primaryText,
                fontSize: 14,
              }}
            >
              {responseText}
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Input */}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          paddingBottom: insets.bottom + 16,
          paddingHorizontal: 20,
          paddingTop: 16,
          backgroundColor: colors.background,
          borderTopWidth: 1,
          borderColor: colors.border,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderRadius: 20,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.cardBackground,
            paddingHorizontal: 16,
          }}
        >
          <TextInput
            placeholder="Ask something..."
            placeholderTextColor={colors.tertiaryText}
            value={inputText}
            onChangeText={setInputText}
            style={{
              flex: 1,
              fontFamily: "Montserrat_400Regular",
              fontSize: 16,
              color: colors.primaryText,
              paddingVertical: 12,
            }}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            onPress={handleSendMessage}
            style={{
              width: 36,
              height: 36,
              backgroundColor: colors.accent,
              borderRadius: 18,
              alignItems: "center",
              justifyContent: "center",
              marginLeft: 8,
            }}
            disabled={loading}
          >
            <Send size={18} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}