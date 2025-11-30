import { colors } from "@/app/theme/colors";
import { recentJobs, suggestedJobs } from "@/data/jobs";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderCard from "../features/home/components/HeaderCard";
import JobCard from "../features/job/JobCard";
import JobList from "../features/job/JobList";

const recentFilters = [
  "All",
  "Web Developer",
  "Game Developer",
  "UI/UX Designer",
  "Product Manager",
];

/**
 * Home screen component displaying job listings and top companies
 */
const HomeScreen = () => {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const [shuffledRecentJobs] = useState(() =>
    [...recentJobs].sort(() => Math.random() - 0.5)
  );

  const filteredRecentJobs = useMemo(() => {
    if (activeFilter === "All") return shuffledRecentJobs;

    return shuffledRecentJobs.filter((job) => job.category === activeFilter);
  }, [activeFilter, shuffledRecentJobs]);

  const topCompanies = useMemo(() => {
    const map = new Map<
      string,
      { name: string; logo: any; jobsCount: number }
    >();

    [...suggestedJobs, ...recentJobs].forEach((job) => {
      if (!map.has(job.company)) {
        map.set(job.company, {
          name: job.company,
          logo: job.logo,
          jobsCount: 1,
        });
      } else {
        const existing = map.get(job.company)!;
        map.set(job.company, {
          ...existing,
          jobsCount: existing.jobsCount + 1,
        });
      }
    });

    return Array.from(map.values()).slice(0, 10);
  }, []);

  /**
   * Handles navigation to job detail screen
   * @param {any} job - Job object containing job details
   */
  const handleJobPress = (job: any) => {
    router.push({
      pathname: "/screens/(job)/JobDetailScreen",
      params: {
        company: job.company,
        title: job.title,
        location: job.location,
        salary: job.salary,
        type: job.type,
        description:
          job.description ||
          `Join ${job.company} as a ${job.title}. We're looking for talented individuals to join our team.`,
        requirements: JSON.stringify(
          job.requirements || [
            "Working Model: Hybrid (Mondays / Remote Optional)",
            "Experience Level: Mid to Senior Level",
            `Location: ${job.location}`,
            `Salary: ${job.salary}`,
          ]
        ),
        skills: JSON.stringify(
          job.skills || [
            "Strong communication skills",
            "Team player with excellent problem-solving abilities",
          ]
        ),
        companyLogoIndex: job.logoIndex || 0,
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 90 }}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER  */}
        <HeaderCard />

        {/* SUGGESTED JOBS */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Suggested Jobs</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20 }}
          >
            {suggestedJobs.map((job) => (
              <JobCard key={job.id} job={job} onPress={handleJobPress} />
            ))}
          </ScrollView>
        </View>

        {/* RECENT JOBS */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Jobs</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>

          {/* Filter chips */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20 }}
          >
            {recentFilters.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <TouchableOpacity
                  key={filter}
                  onPress={() => setActiveFilter(filter)}
                  style={[
                    styles.filterChip,
                    isActive && styles.filterChipActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      isActive && styles.filterChipTextActive,
                    ]}
                  >
                    {filter}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Recent job list */}
          <View style={styles.recentJobsList}>
            {filteredRecentJobs.map((job) => (
              <JobList key={job.id} job={job} onPress={handleJobPress} />
            ))}
          </View>
        </View>

        {/* TOP COMPANIES */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top Companies</Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 8 }}
          >
            {topCompanies.map((company) => (
              <View key={company.name} style={styles.companyChip}>
                <Image source={company.logo} style={styles.companyChipLogo} />
                <View style={styles.companyChipTextWrapper}>
                  <Text style={styles.companyChipName}>{company.name}</Text>
                  <Text style={styles.companyChipCount}>
                    {company.jobsCount} jobs
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  section: {
    marginTop: 24,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.primary,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    marginRight: 8,
    marginBottom: 8,
  },
  filterChipActive: {
    backgroundColor: colors.buttonPrimary,
    borderColor: colors.buttonPrimary,
  },
  filterChipText: {
    fontSize: 12,
    color: colors.textLight,
  },
  filterChipTextActive: {
    color: colors.text,
    fontWeight: "600",
  },
  recentJobsList: {
    marginTop: 8,
  },
  companyChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 10,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  companyChipLogo: {
    width: 28,
    height: 28,
    borderRadius: 8,
    marginRight: 8,
    resizeMode: "contain",
  },
  companyChipTextWrapper: {
    justifyContent: "center",
  },
  companyChipName: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.text,
  },
  companyChipCount: {
    fontSize: 11,
    color: colors.textLight,
  },
});
