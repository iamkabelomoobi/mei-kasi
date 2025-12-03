import { useRouter } from "expo-router";
import JobList from "@/app/screens/features/job/JobList";
import { colors } from "@/app/theme";
import { Images } from "@/assets/images";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Job = {
  logo: any;
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  status?: "Applied" | "Hired" | "Closed" | "Saved" | string;
};

const mockSaved: Job[] = [
  {
    logo: Images.companies[0].image,
    id: "1",
    title: "DevOps Lead",
    company: "Figma Inc.",
    location: "San Francisco, USA",
    salary: "R25K",
    status: "Saved",
  },
  {
    logo: Images.companies[1].image,
    id: "2",
    title: "Back-End Engineer",
    company: "Dribbble Inc.",
    location: "Kentucky, USA",
    salary: "R14K",
    status: "Saved",
  },
];

const mockApplied: Job[] = [
  {
    logo: Images.companies[2].image,
    id: "3",
    title: "Senior UI/UX Designer",
    company: "Tripadvisor",
    location: "Newton, Massachusetts",
    salary: "R45K",
  },
  {
    logo: Images.companies[3].image,
    id: "4",
    title: "Frontend Engineer",
    company: "Acme Labs",
    location: "Remote",
    salary: "R15K",
  },
];

const SavedJobsScreen: React.FC = () => {
  const router = useRouter();
  const [tab, setTab] = useState<"saved" | "applied">("applied");

  const data = useMemo(
    () => (tab === "saved" ? mockSaved : mockApplied),
    [tab]
  );

  const handleJobPress = (job: Job) => {
    router.push({
      pathname: "/screens/(jobs)/JobDetailScreen",
      params: {
        id: job.id,
        title: job.title,
        company: job.company,
        location: job.location,
        salary: job.salary,
        status: job.status || "Saved",
      },
    });
  };

  const renderJobItem = ({ item }: { item: Job }) => (
    <View style={styles.jobWrapper}>
      <JobList job={item} onPress={handleJobPress} />
      {tab === "applied" && item.status && (
        <View style={styles.statusBadge}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerTopRow}>
            <Text style={styles.headerTitle}>My Jobs</Text>
          </View>

          <View style={styles.filterContainer}>
            <TouchableOpacity
              style={[
                styles.filterButton,
                tab === "saved" && styles.filterButtonActive,
              ]}
              onPress={() => setTab("saved")}
            >
              <Text
                style={[
                  styles.filterText,
                  tab === "saved" && styles.filterTextActive,
                ]}
              >
                Saved
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.filterButton,
                tab === "applied" && styles.filterButtonActive,
              ]}
              onPress={() => setTab("applied")}
            >
              <Text
                style={[
                  styles.filterText,
                  tab === "applied" && styles.filterTextActive,
                ]}
              >
                Applied
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.jobsCountRow}>
            <Text style={styles.countText}>
              {data.length} {tab === "saved" ? "Jobs" : "Applications"}
            </Text>
          </View>
        </View>

        <FlatList
          data={data}
          keyExtractor={(i) => i.id}
          renderItem={renderJobItem}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={{ height: 0 }} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default SavedJobsScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
    paddingHorizontal: 0,
  },
  header: {
    backgroundColor: colors.white,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 16,
  },
  headerTopRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.text,
  },
  filterContainer: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    marginBottom: 12,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.backgroundLight,
    borderWidth: 1,
    borderColor: colors.border,
    minWidth: 80,
    alignItems: "center",
  },
  filterButtonActive: {
    backgroundColor: colors.buttonPrimary,
    borderColor: colors.buttonPrimary,
  },
  filterText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textLight,
  },
  filterTextActive: {
    color: colors.text,
    fontWeight: "700",
  },
  jobsCountRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  countText: {
    color: colors.textSecondary,
    fontWeight: "600",
    fontSize: 14,
  },
  listContent: {
    paddingBottom: 90,
  },
  jobWrapper: {
    position: "relative",
  },
  statusBadge: {
    position: "absolute",
    top: 24,
    right: 32,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.backgroundLight,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    marginRight: 6,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.text,
  },
});
