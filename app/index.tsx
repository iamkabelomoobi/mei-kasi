import useAuthAnimations from "@/app/hooks/useAuthAnimations";
import { router } from "expo-router";
import React from "react";
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LandingScreen = () => {
  const { logoFadeAnim, logoScaleAnim, formSlideAnim, formFadeAnim } =
    useAuthAnimations();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.imageContainer,
            {
              opacity: logoFadeAnim,
              transform: [{ scale: logoScaleAnim }],
            },
          ]}
        >
          <Image
            source={require("../assets/images/icon.png")}
            style={styles.image}
            resizeMode="contain"
          />
        </Animated.View>

        <Animated.View
          style={[
            styles.bottomCard,
            {
              opacity: formFadeAnim,
              transform: [{ translateY: formSlideAnim }],
            },
          ]}
        >
          <Text style={styles.title}>Find your dream job</Text>

          <Text style={styles.subtitle}>
            Discover opportunities, connect with employers, and advance your
            career—your journey starts here.
          </Text>

          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Get Started</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.push("/screens/LoginScreen")}
          >
            <Text style={styles.secondaryButtonText}>Login</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 20,
    justifyContent: "center",
    paddingBottom: 30,
  },

  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: "80%",
    height: "60%",
  },

  bottomCard: {
    backgroundColor: "#1a1a1a",
    paddingVertical: 40,
    paddingHorizontal: 25,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 12,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 14,
    color: "#b0b0b0",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 20,
  },

  primaryButton: {
    backgroundColor: "#FFD60A",
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#FFD60A",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },

  primaryButtonText: {
    textAlign: "center",
    color: "#000000",
    fontWeight: "700",
    fontSize: 16,
  },

  secondaryButton: {
    backgroundColor: "#ffffff",
    borderWidth: 0,
    paddingVertical: 16,
    borderRadius: 12,
  },

  secondaryButtonText: {
    textAlign: "center",
    color: "#1a1a1a",
    fontWeight: "600",
    fontSize: 16,
  },
});
