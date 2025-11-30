import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack, usePathname, useRouter, useSegments } from "expo-router";
import React, { useEffect } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import NavBottom from "../components/ui/NavBottom";
import { AuthProvider, useAuthContext } from "../contexts/AuthContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
    mutations: {
      retry: 1,
    },
  },
});

const RootLayoutNav = () => {
  const pathname = usePathname();
  const segments = useSegments();
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuthContext();

  const authRoutes = [
    "/screens/(auth)/LoginScreen",
    "/screens/(auth)/RegisterScreen",
    "/screens/(auth)/ForgotPasswordScreen",
    "/screens/(auth)/OTPVerificationScreen",
    "/screens/(auth)/ResetPasswordScreen",
  ];

  const isAuthRoute = authRoutes.some((route) => pathname.includes(route));
  const isLandingPage = pathname === "/" || pathname === "";

  const shouldHideNav =
    pathname.includes("/JobDetailScreen") ||
    isAuthRoute ||
    isLandingPage ||
    !isAuthenticated;

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === "screens" && segments[1] === "(auth)";
    const isOnLandingPage = pathname === "/";

    if (isAuthenticated && (inAuthGroup || isOnLandingPage)) {
      router.replace("/screens/(home)/HomeScreen");
    } else if (!isAuthenticated && !inAuthGroup && !isOnLandingPage) {
      router.replace("/");
    }
  }, [isAuthenticated, segments, isLoading, router, pathname]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#ffffff"
          translucent={true}
          hidden={false}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#ffffff"
        translucent={true}
        hidden={false}
      />
      <Stack screenOptions={{ headerShown: false }} />
      {!shouldHideNav && <NavBottom />}
    </View>
  );
};

const RootLayout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RootLayoutNav />
      </AuthProvider>
    </QueryClientProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default RootLayout;
