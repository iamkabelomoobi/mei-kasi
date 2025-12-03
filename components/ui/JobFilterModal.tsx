import { colors } from "@/app/theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

export interface FilterOptions {
  categories: string[];
  locations: string[];
  salaryRanges: string[];
  jobTypes: string[];
  companies: string[];
  experienceLevels: string[];
}

export interface ActiveFilters {
  category?: string;
  location?: string;
  jobType?: string;
  company?: string;
  experienceLevel?: string;
}

interface JobFilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: ActiveFilters) => void;
  currentFilters: ActiveFilters;
  filterOptions: FilterOptions;
}

export const JobFilterModal: React.FC<JobFilterModalProps> = ({
  visible,
  onClose,
  onApply,
  currentFilters,
  filterOptions,
}) => {
  const [tempFilters, setTempFilters] = useState<ActiveFilters>(currentFilters);

  useEffect(() => {
    if (visible) {
      setTempFilters(currentFilters);
    }
  }, [visible, currentFilters]);

  const handleApply = () => {
    onApply(tempFilters);
    onClose();
  };

  const handleClear = () => {
    setTempFilters({});
  };

  const handleCategorySelect = (category: string) => {
    setTempFilters((prev) => ({
      ...prev,
      category: prev.category === category ? undefined : category,
    }));
  };

  const handleLocationSelect = (location: string) => {
    setTempFilters((prev) => ({
      ...prev,
      location: prev.location === location ? undefined : location,
    }));
  };

  const handleJobTypeSelect = (jobType: string) => {
    setTempFilters((prev) => ({
      ...prev,
      jobType: prev.jobType === jobType ? undefined : jobType,
    }));
  };

  const handleCompanySelect = (company: string) => {
    setTempFilters((prev) => ({
      ...prev,
      company: prev.company === company ? undefined : company,
    }));
  };

  const handleExperienceLevelSelect = (level: string) => {
    setTempFilters((prev) => ({
      ...prev,
      experienceLevel: prev.experienceLevel === level ? undefined : level,
    }));
  };

  const hasActiveFilters = Object.keys(tempFilters).some(
    (key) => tempFilters[key as keyof ActiveFilters]
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.modalContainer} onPress={(e) => e.stopPropagation()}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Ionicons name="options-outline" size={24} color={colors.text} />
              <Text style={styles.headerTitle}>Filter Jobs</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.content}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Category</Text>
              <View style={styles.optionsGrid}>
                {filterOptions.categories.map((category) => {
                  const isSelected = tempFilters.category === category;
                  return (
                    <TouchableOpacity
                      key={category}
                      style={[
                        styles.optionChip,
                        isSelected && styles.optionChipSelected,
                      ]}
                      onPress={() => handleCategorySelect(category)}
                      activeOpacity={0.7}
                    >
                      <Text
                        style={[
                          styles.optionChipText,
                          isSelected && styles.optionChipTextSelected,
                        ]}
                      >
                        {category}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Location</Text>
              <View style={styles.optionsGrid}>
                {filterOptions.locations.map((location) => {
                  const isSelected = tempFilters.location === location;
                  return (
                    <TouchableOpacity
                      key={location}
                      style={[
                        styles.optionChip,
                        isSelected && styles.optionChipSelected,
                      ]}
                      onPress={() => handleLocationSelect(location)}
                      activeOpacity={0.7}
                    >
                      <Text
                        style={[
                          styles.optionChipText,
                          isSelected && styles.optionChipTextSelected,
                        ]}
                      >
                        {location}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {filterOptions.companies && filterOptions.companies.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Company</Text>
                <View style={styles.optionsGrid}>
                  {filterOptions.companies.map((company) => {
                    const isSelected = tempFilters.company === company;
                    return (
                      <TouchableOpacity
                        key={company}
                        style={[
                          styles.optionChip,
                          isSelected && styles.optionChipSelected,
                        ]}
                        onPress={() => handleCompanySelect(company)}
                        activeOpacity={0.7}
                      >
                        <Text
                          style={[
                            styles.optionChipText,
                            isSelected && styles.optionChipTextSelected,
                          ]}
                        >
                          {company}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            )}

            {filterOptions.experienceLevels && filterOptions.experienceLevels.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Experience Level</Text>
                <View style={styles.optionsGrid}>
                  {filterOptions.experienceLevels.map((level) => {
                    const isSelected = tempFilters.experienceLevel === level;
                    return (
                      <TouchableOpacity
                        key={level}
                        style={[
                          styles.optionChip,
                          isSelected && styles.optionChipSelected,
                        ]}
                        onPress={() => handleExperienceLevelSelect(level)}
                        activeOpacity={0.7}
                      >
                        <Text
                          style={[
                            styles.optionChipText,
                            isSelected && styles.optionChipTextSelected,
                          ]}
                        >
                          {level}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            )}

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Job Type</Text>
              <View style={styles.optionsGrid}>
                {filterOptions.jobTypes.map((jobType) => {
                  const isSelected = tempFilters.jobType === jobType;
                  return (
                    <TouchableOpacity
                      key={jobType}
                      style={[
                        styles.optionChip,
                        isSelected && styles.optionChipSelected,
                      ]}
                      onPress={() => handleJobTypeSelect(jobType)}
                      activeOpacity={0.7}
                    >
                      <Text
                        style={[
                          styles.optionChipText,
                          isSelected && styles.optionChipTextSelected,
                        ]}
                      >
                        {jobType}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity
              style={[
                styles.clearButton,
                !hasActiveFilters && styles.clearButtonDisabled,
              ]}
              onPress={handleClear}
              disabled={!hasActiveFilters}
            >
              <Text
                style={[
                  styles.clearButtonText,
                  !hasActiveFilters && styles.clearButtonTextDisabled,
                ]}
              >
                Clear All
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: "85%",
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
  },
  closeButton: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 20,
  },
  section: {
    marginTop: 16,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 12,
  },
  optionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  optionChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: colors.backgroundLight,
    borderWidth: 1,
    borderColor: colors.border,
  },
  optionChipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  optionChipText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.textSecondary,
  },
  optionChipTextSelected: {
    color: colors.white,
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  clearButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: colors.backgroundLight,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  clearButtonDisabled: {
    opacity: 0.5,
  },
  clearButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
  },
  clearButtonTextDisabled: {
    color: colors.textMuted,
  },
  applyButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  applyButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.white,
  },
});
