import { colors } from "@/app/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Job {
  id: string;
  title: string;
  company: string;
  industry: string;
  location: string;
  salary: string;
  type: string;
  level: string;
  logo: any;
}

interface JobCardProps {
  job: Job;
  onPress: (job: Job) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.jobCard}
      onPress={() => onPress(job)}
      activeOpacity={0.7}
    >
      <View style={styles.jobHeaderRow}>
        <View style={styles.jobLogoWrapper}>
          <Image source={job.logo} style={styles.companyLogo} />
        </View>
        <Ionicons name="bookmark-outline" size={20} color={colors.text} />
      </View>

      <Text style={styles.jobTitle}>{job.title}</Text>
      <Text style={styles.jobCompany}>{job.company}</Text>
      <Text style={styles.jobIndustry}>{job.industry}</Text>

      <View style={styles.jobLocationRow}>
        <Ionicons name="location-outline" size={14} color="#666" />
        <Text style={styles.jobLocation}>{job.location}</Text>
      </View>

      <View style={styles.tagsRow}>
        <View style={styles.tag}>
          <Text style={styles.tagText}>{job.type}</Text>
        </View>
        <View style={styles.tag}>
          <Text style={styles.tagText}>{job.level}</Text>
        </View>
      </View>

      <View style={styles.jobFooterRow}>
        <Text style={styles.salaryText}>{job.salary}</Text>
        <TouchableOpacity
          style={styles.applyButton}
          onPress={(e) => {
            e.stopPropagation();
            onPress(job);
          }}
        >
          <Text style={styles.applyButtonText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default JobCard;

const styles = StyleSheet.create({
  jobCard: {
    width: 260,
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 16,
    marginRight: 14,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  jobHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  jobLogoWrapper: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
  },
  companyLogo: {
    width: "90%",
    height: "90%",
    resizeMode: "contain",
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
    marginTop: 4,
  },
  jobCompany: {
    fontSize: 14,
    color: "#333",
    marginTop: 4,
    fontWeight: "600",
  },
  jobIndustry: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
  jobLocationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 4,
  },
  jobLocation: {
    fontSize: 12,
    color: "#666",
  },
  tagsRow: {
    flexDirection: "row",
    marginTop: 10,
    gap: 8,
    flexWrap: "wrap",
  },
  tag: {
    backgroundColor: "#F5F5F5",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  tagText: {
    fontSize: 11,
    color: "#444",
  },
  jobFooterRow: {
    flexDirection: "row",
    marginTop: 12,
    justifyContent: "space-between",
    alignItems: "center",
  },
  salaryText: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.text,
  },
  applyButton: {
    backgroundColor: colors.buttonPrimary,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
  },
  applyButtonText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: "600",
  },
});
