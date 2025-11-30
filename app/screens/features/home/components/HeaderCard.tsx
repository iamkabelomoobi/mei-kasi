import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "@/app/theme";

/**
 * Header component for the home screen
 * Displays logo, notifications, menu, user profile, and search bar
 */
const HeaderCard = () => {
  return (
    <View style={styles.header}>
      <View style={styles.headerTopRow}>
        <Text style={styles.logoText}>Home</Text>

        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons
              name="notifications-outline"
              size={20}
              color={colors.text}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="menu-outline" size={22} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.profileRow}>
        <View style={styles.avatarWrapper}>
          <Image
            source={{
              uri: "https://i.pravatar.cc/150?img=3",
            }}
            style={styles.avatar}
          />
        </View>

        <View style={styles.welcomeTextWrapper}>
          <Text style={styles.welcomeText}>Welcome, Jerome!</Text>
          <View style={styles.locationRow}>
            <Ionicons
              name="location-outline"
              size={14}
              color={colors.text}
            />
            <Text style={styles.locationText}>South Africa, Pretoria</Text>
          </View>
        </View>
      </View>

      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={18} color="#7A7A7A" />
        <Text style={styles.searchPlaceholder}>
          Search for jobs, roles...
        </Text>
      </View>
    </View>
  );
};

export default HeaderCard;

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.white,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  headerTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoText: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.text,
  },
  headerIcons: {
    flexDirection: "row",
    gap: 8,
  },
  iconButton: {
    backgroundColor: colors.buttonPrimary,
    borderRadius: 999,
    padding: 6,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  avatarWrapper: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 2,
    borderColor: colors.primary,
    overflow: "hidden",
    marginRight: 12,
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  welcomeTextWrapper: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    gap: 4,
  },
  locationText: {
    fontSize: 13,
    color: "#333",
  },
  searchBar: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchPlaceholder: {
    marginLeft: 8,
    color: "#7A7A7A",
    fontSize: 14,
  },
});
