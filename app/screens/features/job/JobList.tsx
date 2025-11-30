import { colors } from "@/app/theme/colors";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  logo: any;
}

interface JobListProps {
  job: Job;
  onPress: (job: Job) => void;
}

/**
 * JobList component for displaying individual job items
 * Shows job title, company, location, and salary
 */
const JobList: React.FC<JobListProps> = ({ job, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.recentJobItem}
      onPress={() => onPress(job)}
      activeOpacity={0.7}
    >
      <View style={styles.recentJobLeft}>
        <View style={styles.smallLogoWrapper}>
          <Image source={job.logo} style={styles.smallCompanyLogo} />
        </View>
        <View>
          <Text style={styles.recentJobTitle}>{job.title}</Text>
          <Text style={styles.recentJobCompany}>
            {job.company} • {job.location}
          </Text>
        </View>
      </View>
      <Text style={styles.recentJobSalary}>{job.salary}</Text>
    </TouchableOpacity>
  );
};

export default JobList;

const styles = StyleSheet.create({
  recentJobItem: {
    marginTop: 14,
    marginHorizontal: 20,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  recentJobLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  smallLogoWrapper: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
  },
  smallCompanyLogo: {
    width: "85%",
    height: "85%",
    resizeMode: "contain",
  },
  recentJobTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
  },
  recentJobCompany: {
    fontSize: 12,
    color: "#9A9A9A",
    marginTop: 2,
  },
  recentJobSalary: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primary,
  },
});
