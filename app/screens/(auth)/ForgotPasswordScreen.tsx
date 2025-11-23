import useAuthAnimations from "@/app/hooks/useAuthAnimations";
import { colors } from "@/app/theme/colors";
import { authStyles } from "@/app/theme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const { logoFadeAnim, logoScaleAnim, formSlideAnim, formFadeAnim } =
    useAuthAnimations();

  const handleSubmit = () => {
    // TODO: Implement reset update password logic
  };

  return (
    <SafeAreaView style={authStyles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.background}
        translucent={false}
      />
      <KeyboardAvoidingView
        style={authStyles.safeArea}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          contentContainerStyle={authStyles.scrollContent}
          bounces={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View
            style={[
              authStyles.imageContainer,
              {
                opacity: logoFadeAnim,
                transform: [{ scale: logoScaleAnim }],
              },
            ]}
          >
            <Image
              source={require("../../../assets/images/icon.png")}
              style={authStyles.image}
              resizeMode="contain"
            />
          </Animated.View>

          <Animated.View
            style={[
              authStyles.bottomCard,
              {
                opacity: formFadeAnim,
                transform: [{ translateY: formSlideAnim }],
              },
            ]}
          >
            <Text style={authStyles.title}>Reset your password</Text>
            <Text style={styles.helperText}>
              No worries! Enter your email and we&apos;ll send you a code to
              reset it.
            </Text>

            <View style={authStyles.inputWrapper}>
              <Text style={authStyles.label}>Email address</Text>
              <View
                style={[
                  authStyles.inputContainer,
                  error && authStyles.inputError,
                ]}
              >
                <Ionicons
                  name="mail-outline"
                  size={18}
                  color={colors.textMuted}
                  style={authStyles.inputIcon}
                />
                <TextInput
                  placeholder="you@example.com"
                  placeholderTextColor={colors.textPlaceholder}
                  style={authStyles.input}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    if (error) setError("");
                  }}
                />
              </View>
              {error && <Text style={authStyles.errorText}>{error}</Text>}
            </View>

            <TouchableOpacity
              style={[authStyles.primaryButton]}
              onPress={() => router.push("/screens/OTPVerificationScreen")}
              disabled={false}
            >
              {false ? (
                <ActivityIndicator color={colors.buttonText} />
              ) : (
                <Text style={authStyles.primaryButtonText}>
                  Send reset code
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.backLink}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={16} color={colors.text} />
              <Text style={styles.backLinkText}>Back to Sign In</Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  helperText: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 20,
  },
  backLink: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 12,
  },
  backLinkText: {
    color: colors.text,
    fontWeight: "600",
    fontSize: 14,
  },
});

export default ForgotPasswordScreen;
