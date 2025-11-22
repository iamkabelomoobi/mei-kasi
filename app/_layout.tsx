import { Stack } from "expo-router";
import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";

const RootLayout = () => {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#ffffff"
        translucent={true}
        hidden={false}
      />
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default RootLayout;
