import { colors } from "@/app/theme/colors";
import { Images } from "@/assets/images";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const JobDetailScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [isOverviewExpanded, setIsOverviewExpanded] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const [activeTab, setActiveTab] = useState<"description" | "company">(
    "description"
  );

  const jobData = {
    company: (params.company as string) || "BMW Company",
    title: (params.title as string) || "Lead UX Designer",
    location: (params.location as string) || "New York",
    salary: (params.salary as string) || "$125K",
    type: (params.type as string) || "Full Time",
    description:
      (params.description as string) ||
      "We are seeking a talented UX Designer to join our fast-growing marketing team. You'll work with the Director of UX and the marketing team to design user-focused experiences that support our business growth. This is an exciting opportunity to shape the digital presence of a leading brand while working in a collaborative and innovative environment. The ideal candidate will have a strong portfolio showcasing user-centered design solutions and a passion for creating intuitive digital experiences that drive engagement and conversion.",
    requirements: params.requirements
      ? JSON.parse(params.requirements as string)
      : [
          "Minimum 3+ years of experience in UX/UI design",
          "Bachelor's degree in Design, HCI, or related field",
          "Strong portfolio demonstrating user-centered design process",
          "Proficiency in Figma, Sketch, Adobe Creative Suite",
          "Experience with design systems and component libraries",
          "Understanding of HTML, CSS, and responsive design principles",
          "Excellent communication and presentation skills",
          "Ability to work independently and manage multiple projects",
        ],
    responsibilities: params.responsibilities
      ? JSON.parse(params.responsibilities as string)
      : [
          "Work with a cross-functional team to create polished, thoughtful, and visually refined design solutions",
          "Create site maps, user flows, wireframes, and low-to-high-fidelity mockups and prototypes, then iterate based on feedback",
          "Conduct user research and usability testing to validate design decisions",
          "Collaborate with developers to ensure pixel-perfect implementation",
          "Maintain and evolve our design system and component library",
          "Present design concepts and rationale to stakeholders",
        ],
    benefits: params.benefits
      ? JSON.parse(params.benefits as string)
      : [
          "Competitive salary and performance bonuses",
          "Comprehensive health, dental, and vision insurance",
          "Flexible working hours and remote work options",
          "Professional development and training budget",
          "401(k) retirement plan with company match",
          "Generous paid time off and holidays",
          "Modern office space with the latest design tools",
          "Team building activities and company events",
        ],
    skills: params.skills
      ? JSON.parse(params.skills as string)
      : [
          "Expert in Adobe Creative Suite (Photoshop, Illustrator, InDesign).",
          "Preference in any 3D Design Software.",
        ],
    companyLogoIndex: params.companyLogoIndex
      ? parseInt(params.companyLogoIndex as string)
      : 2,
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={24} color={colors.text} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Job Details</Text>

          <View style={{ width: 40 }} />
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={[colors.backgroundLight, colors.white, colors.backgroundLight]}
          style={styles.headerGradient}
        >
          <View style={styles.companyLogoContainer}>
            <View style={styles.companyLogoWrapper}>
              <Image
                source={
                  Images.companies[jobData.companyLogoIndex]?.image ??
                  Images.companies[0].image
                }
                style={styles.companyLogo}
              />
            </View>
          </View>
        </LinearGradient>

        <View style={styles.titleCard}>
          <Text style={styles.jobTitle}>{jobData.title}</Text>
          <Text style={styles.jobSubtitle}>{jobData.salary}</Text>

          <View style={styles.infoRow}>
            <View style={styles.infoChip}>
              <Text style={styles.infoChipText}>{jobData.type}</Text>
            </View>

            <View style={styles.infoChip}>
              <Text style={styles.infoChipText}>Remote</Text>
            </View>

            <View style={styles.infoChip}>
              <Text style={styles.infoChipText}>Anywhere</Text>
            </View>
          </View>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === "description" && styles.tabButtonActive,
            ]}
            onPress={() => setActiveTab("description")}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.tabButtonText,
                activeTab === "description" && styles.tabButtonTextActive,
              ]}
            >
              Description
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === "company" && styles.tabButtonActive,
            ]}
            onPress={() => setActiveTab("company")}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.tabButtonText,
                activeTab === "company" && styles.tabButtonTextActive,
              ]}
            >
              Company
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === "description" ? (
          <>
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>About the Opportunity</Text>
              <Text
                style={styles.sectionText}
                numberOfLines={isOverviewExpanded ? undefined : 3}
                onTextLayout={(e) => {
                  if (!showReadMore && e.nativeEvent.lines.length > 3) {
                    setShowReadMore(true);
                  }
                }}
              >
                {jobData.description}
              </Text>

              {showReadMore && (
                <TouchableOpacity
                  onPress={() => setIsOverviewExpanded((prev) => !prev)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.readMoreText}>
                    {isOverviewExpanded ? "Read less" : "..."}
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>Job Requirements</Text>
              {jobData.requirements.map((req: string, index: number) => (
                <View key={index} style={styles.bulletItem}>
                  <View style={styles.bulletDot} />
                  <Text style={styles.bulletText}>{req}</Text>
                </View>
              ))}
            </View>

            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>Job Responsibilities</Text>
              {jobData.responsibilities.map((resp: string, index: number) => (
                <View key={index} style={styles.bulletItem}>
                  <View style={styles.bulletDot} />
                  <Text style={styles.bulletText}>{resp}</Text>
                </View>
              ))}
            </View>

            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>Benefits & Perks</Text>
              {jobData.benefits.map((benefit: string, index: number) => (
                <View key={index} style={styles.bulletItem}>
                  <View style={styles.bulletDot} />
                  <Text style={styles.bulletText}>{benefit}</Text>
                </View>
              ))}
            </View>
          </>
        ) : (
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>About {jobData.company}</Text>
            <Text style={styles.sectionText}>
              {jobData.company} is a leading company in the industry, committed
              to innovation and excellence. We provide a collaborative work
              environment where talented individuals can thrive and make a
              meaningful impact.
            </Text>
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={styles.bottomContainer}>
        <View style={styles.actionButtonsRow}>
          <TouchableOpacity style={styles.applyButton} activeOpacity={0.8}>
            <Text style={styles.applyButtonText}>Apply for Job</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.bookmarkButton} activeOpacity={0.7}>
            <Ionicons name="bookmark-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default JobDetailScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
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
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.backgroundLight,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.text,
  },
  headerGradient: {
    paddingTop: 10,
    paddingBottom: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  companyLogoContainer: {
    alignItems: "center",
  },
  companyLogoWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  companyLogo: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  titleCard: {
    backgroundColor: colors.white,
    marginTop: -20,
    marginHorizontal: 20,
    padding: 24,
    borderRadius: 24,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  jobTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.text,
    textAlign: "center",
    marginBottom: 8,
  },
  jobSubtitle: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: "center",
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    flexWrap: "wrap",
  },
  infoChip: {
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  infoChipText: {
    fontSize: 12,
    color: colors.text,
    fontWeight: "500",
  },
  tabContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 20,
    gap: 12,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 50,
    backgroundColor: colors.backgroundLight,
    alignItems: "center",
    borderWidth: 0,
  },
  tabButtonActive: {
    backgroundColor: colors.text,
    borderColor: colors.text,
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textLight,
  },
  tabButtonTextActive: {
    color: colors.white,
  },
  sectionCard: {
    backgroundColor: colors.white,
    marginTop: 20,
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 24,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.textLight,
  },
  bulletItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
    paddingLeft: 4,
  },
  bulletDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.text,
    marginTop: 7,
    marginRight: 12,
  },
  bulletText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 22,
    color: colors.textLight,
  },
  readMoreText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primary,
    marginTop: 4,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 32,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  actionButtonsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  bookmarkButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.backgroundLight,
    alignItems: "center",
    justifyContent: "center",
  },
  applyButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.text,
    borderRadius: 28,
    height: 56,
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.white,
  },
});
