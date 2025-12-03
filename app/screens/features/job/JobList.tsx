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
        <View style={styles.jobDetails}>
          <Text style={styles.recentJobTitle} numberOfLines={1}>{job.title}</Text>
          <Text style={styles.recentJobCompany} numberOfLines={1}>
            {job.company}
          </Text>
          <Text style={styles.recentJobLocation} numberOfLines={1}>
            {job.location}
          </Text>
        </View>
      </View>
      <View style={styles.rightSection}>
        <Text style={styles.recentJobSalary}>{job.salary}</Text>
        <Text style={styles.salaryPeriod}>per month</Text>
      </View>
    </TouchableOpacity>
  );
};

export default JobList;

const styles = StyleSheet.create({
  recentJobItem: {
    marginTop: 14,
    marginHorizontal: 20,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  recentJobLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 12,
  },
  smallLogoWrapper: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: colors.backgroundLight,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.borderLight,
    overflow: "hidden",
    marginRight: 12,
  },
  smallCompanyLogo: {
    width: "70%",
    height: "70%",
    resizeMode: "contain",
  },
  jobDetails: {
    flex: 1,
  },
  recentJobTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 4,
  },
  recentJobCompany: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 4,
  },
  recentJobLocation: {
    fontSize: 12,
    color: colors.textMuted,
  },
  rightSection: {
    alignItems: "flex-end",
  },
  recentJobSalary: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 2,
  },
  salaryPeriod: {
    fontSize: 11,
    color: colors.textMuted,
  },
});
