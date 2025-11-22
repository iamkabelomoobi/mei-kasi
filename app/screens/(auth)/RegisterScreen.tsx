import useAuthAnimations from "@/app/hooks/useAuthAnimations";
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
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const RegisterScreen = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { logoFadeAnim, logoScaleAnim, formSlideAnim, formFadeAnim } =
    useAuthAnimations();

  const handleSignUp = () => {
    // TODO: implement register logic
  };

  return (
    <SafeAreaView style={authStyles.safeArea}>
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
            <Text style={authStyles.title}>Create your account</Text>
            <Text style={authStyles.subtitle}>
              Join us and start your journey today
            </Text>

            <View style={authStyles.row}>
              <View style={authStyles.halfInputWrapper}>
                <Text style={authStyles.label}>First name</Text>
                <View style={[authStyles.inputContainer]}>
                  <Ionicons
                    name="person-outline"
                    size={18}
                    color="#888"
                    style={authStyles.inputIcon}
                  />
                  <TextInput
                    placeholder="Jack"
                    placeholderTextColor="#999"
                    style={authStyles.input}
                    autoCapitalize="words"
                    value={""}
                  />
                </View>
              </View>
              <View style={authStyles.halfInputWrapper}>
                <Text style={authStyles.label}>Last name</Text>
                <View style={[authStyles.inputContainer]}>
                  <Ionicons
                    name="person-outline"
                    size={18}
                    color="#888"
                    style={authStyles.inputIcon}
                  />
                  <TextInput
                    placeholder="Smith"
                    placeholderTextColor="#999"
                    style={authStyles.input}
                    autoCapitalize="words"
                    value={""}
                  />
                </View>
              </View>
            </View>

            <View style={authStyles.inputWrapper}>
              <Text style={authStyles.label}>Email</Text>
              <View style={[authStyles.inputContainer]}>
                <Ionicons
                  name="mail-outline"
                  size={18}
                  color="#888"
                  style={authStyles.inputIcon}
                />
                <TextInput
                  placeholder="j.smith@example.com"
                  placeholderTextColor="#999"
                  style={authStyles.input}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={""}
                />
              </View>
            </View>

            <View style={authStyles.inputWrapper}>
              <Text style={authStyles.label}>
                Phone number <Text style={{ color: "#999" }}>(optional)</Text>
              </Text>
              <View style={[authStyles.inputContainer]}>
                <Ionicons
                  name="call-outline"
                  size={18}
                  color="#888"
                  style={authStyles.inputIcon}
                />
                <TextInput
                  placeholder="0787735258"
                  placeholderTextColor="#999"
                  style={authStyles.input}
                  keyboardType="phone-pad"
                  maxLength={10}
                  value={""}
                />
              </View>
            </View>

            <View style={authStyles.inputWrapper}>
              <Text style={authStyles.label}>Password</Text>
              <View style={[authStyles.inputContainer]}>
                <Ionicons
                  name="lock-closed-outline"
                  size={18}
                  color="#888"
                  style={authStyles.inputIcon}
                />
                <TextInput
                  placeholder="At least 8 characters"
                  placeholderTextColor="#999"
                  style={[
                    authStyles.input,
                    authStyles.passwordInput,
                  ]}
                  secureTextEntry={!showPassword}
                  value={""}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={authStyles.eyeIcon}
                >
                  <Ionicons
                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                    size={20}
                    color="#888"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={[authStyles.primaryButton]}
              onPress={handleSignUp}
              disabled={false}
            >
              {false ? (
                <ActivityIndicator color="#000000" />
              ) : (
                <Text style={authStyles.primaryButtonText}>Sign Up</Text>
              )}
            </TouchableOpacity>

            <View style={authStyles.separator}>
              <View style={authStyles.separatorLine} />
              <View style={authStyles.separatorLine} />
            </View>

            <TouchableOpacity
              onPress={() => router.push("/screens/(auth)/LoginScreen")}
            >
              <Text style={authStyles.footerText}>
                Already have an account?{" "}
                <Text style={authStyles.footerLink}>Sign In</Text>
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
