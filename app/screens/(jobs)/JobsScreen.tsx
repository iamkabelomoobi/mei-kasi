import { colors } from "@/app/theme";
import { JobCard } from "@/components/ui/JobCard";
import {
  ActiveFilters,
  FilterOptions,
  JobFilterModal,
} from "@/components/ui/JobFilterModal";
import { Job } from "@/interfaces";
import { fetchJobs, getJobCategories } from "@/services";
import { Ionicons } from "@expo/vector-icons";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  RefreshControl,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const useDebouncedValue = <T,>(value: T, delay = 400) => {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
};

const JobsScreen = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({});

  const debouncedSearchQuery = useDebouncedValue(searchQuery, 400);
  const categories = useMemo(() => getJobCategories(), []);

  const filterOptions: FilterOptions = useMemo(
    () => ({
      categories: categories.filter((c) => c !== "All"),
      locations: [
        "Remote",
        "Hybrid",
        "Johannesburg",
        "Pretoria",
        "Cape Town",
        "Durban",
        "Soweto",
        "Midrand",
      ],
      salaryRanges: [
        "R30k - R40k",
        "R40k - R50k",
        "R50k - R60k",
        "R60k - R70k",
        "R70k+",
      ],
      jobTypes: [
        "Full-Time",
        "Part-Time",
        "Contract",
        "Internship",
        "Freelance",
      ],
      companies: [
        "BBD Software",
        "BCX",
        "Delivery Ka Speed",
        "Deloitte",
        "FNB",
        "Vodacom",
      ],
      experienceLevels: [
        "Entry Level",
        "Junior",
        "Mid-Level",
        "Senior",
        "Lead",
        "Manager",
      ],
    }),
    [categories]
  );

  const { data, isLoading, isFetching, isRefetching, isError, error, refetch } =
    useQuery({
      queryKey: ["jobs", page, selectedCategory, debouncedSearchQuery],
      queryFn: () =>
        fetchJobs({
          page,
          limit: 10,
          category: selectedCategory,
          search: debouncedSearchQuery,
        }),
      staleTime: 5 * 60 * 1000,
      placeholderData: keepPreviousData,
    });

  useEffect(() => {
    if (data?.data) {
      if (page === 1) {
        setAllJobs(data.data);
      } else {
        setAllJobs((prev) => [...prev, ...data.data]);
      }
    }
  }, [data, page]);

  useEffect(() => {
    setPage(1);
    setAllJobs([]);
  }, [selectedCategory, debouncedSearchQuery]);

  const handleCategoryPress = (category: string) => {
    setSelectedCategory(category);
  };

  const handleJobPress = (jobId: string) => {
    router.push({
      pathname: "/screens/(jobs)/JobDetailScreen",
      params: { jobId },
    });
  };

  const handleLoadMore = () => {
    if (!isFetching && data?.pagination?.hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  const handleRefresh = useCallback(() => {
    setPage(1);
    setAllJobs([]);
    refetch();
  }, [refetch]);

  const handleClearFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
    setActiveFilters({});
  };

  const handleOpenFilter = () => {
    setIsFilterModalVisible(true);
  };

  const handleCloseFilter = () => {
    setIsFilterModalVisible(false);
  };

  const handleApplyFilters = (filters: ActiveFilters) => {
    setActiveFilters(filters);
    if (filters.category) {
      setSelectedCategory(filters.category);
    } else {
      setSelectedCategory("All");
    }
  };

  const hasActiveAdvancedFilters = Object.keys(activeFilters).length > 0;

  const renderJobItem = ({ item }: { item: Job }) => (
    <JobCard job={item} onPress={() => handleJobPress(item.id)} />
  );

  const getCategoryIcon = (
    category: string
  ): keyof typeof Ionicons.glyphMap => {
    const iconMap: { [key: string]: keyof typeof Ionicons.glyphMap } = {
      All: "apps-outline",
      "Web Developer": "code-slash-outline",
      "UI/UX Designer": "color-palette-outline",
      "Product Manager": "briefcase-outline",
      "Game Developer": "game-controller-outline",
      Technology: "laptop-outline",
      Design: "color-palette-outline",
      Marketing: "megaphone-outline",
      Sales: "trending-up-outline",
      Finance: "cash-outline",
      Healthcare: "medkit-outline",
      Education: "school-outline",
      Engineering: "construct-outline",
      "Customer Service": "headset-outline",
    };
    return iconMap[category] ?? "briefcase-outline";
  };

  const renderCategoryItem = ({ item }: { item: string }) => {
    const isSelected = item === selectedCategory;
    return (
      <TouchableOpacity
        style={[styles.categoryCard, isSelected && styles.categoryCardSelected]}
        onPress={() => handleCategoryPress(item)}
        activeOpacity={0.7}
      >
        <View
          style={[
            styles.categoryIconContainer,
            isSelected && styles.categoryIconContainerSelected,
          ]}
        >
          <Ionicons
            name={getCategoryIcon(item)}
            size={24}
            color={isSelected ? colors.white : colors.text}
          />
        </View>
        <Text
          style={[
            styles.categoryCardText,
            isSelected && styles.categoryCardTextSelected,
          ]}
        >
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderListHeader = () => (
    <>
      <View style={styles.categoriesSection}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
          style={styles.categoriesList}
          keyboardShouldPersistTaps="handled"
        />
      </View>

      {/* Results + Clear filters */}
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsText}>
          {isLoading ? (
            "Loading jobs..."
          ) : isError ? (
            "Something went wrong. Please try again."
          ) : (
            <>
              <Text style={styles.resultsCount}>
                {data?.pagination.totalItems || 0}
              </Text>{" "}
              {data?.pagination.totalItems === 1 ? "job" : "jobs"} found
            </>
          )}
        </Text>

        {(selectedCategory !== "All" ||
          !!searchQuery ||
          hasActiveAdvancedFilters) && (
          <TouchableOpacity
            onPress={handleClearFilters}
            style={styles.clearFiltersButton}
          >
            <Ionicons name="refresh-outline" size={16} color={colors.primary} />
            <Text style={styles.clearFiltersText}>Reset</Text>
          </TouchableOpacity>
        )}
      </View>
    </>
  );

  const renderListFooter = () => {
    if (!isFetching || page === 1) return null;
    return (
      <View style={styles.loadingFooter}>
        <ActivityIndicator size="small" color={colors.primary} />
      </View>
    );
  };

  const renderEmptyComponent = () => {
    if (isLoading) {
      return (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      );
    }

    if (isError) {
      return (
        <View style={styles.emptyContainer}>
          <Ionicons
            name="cloud-offline-outline"
            size={64}
            color={colors.textMuted}
          />
          <Text style={styles.emptyTitle}>Couldn’t load jobs</Text>
          <Text style={styles.emptyText}>
            {String((error as Error)?.message || "Please check your network.")}
          </Text>
          <TouchableOpacity onPress={handleRefresh} style={styles.retryButton}>
            <Text style={styles.retryButtonText}>Try again</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="briefcase-outline" size={64} color={colors.textMuted} />
        <Text style={styles.emptyTitle}>No Jobs Found</Text>
        <Text style={styles.emptyText}>
          {searchQuery
            ? `No results for "${searchQuery}"`
            : "Try adjusting your filters"}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Browser Jobs</Text>
        <View style={styles.searchRow}>
          <View style={styles.searchContainer}>
            <Ionicons
              name="search-outline"
              size={18}
              color={colors.textMuted}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search jobs, companies..."
              placeholderTextColor={colors.textPlaceholder}
              value={searchQuery}
              onChangeText={setSearchQuery}
              returnKeyType="search"
              onSubmitEditing={Keyboard.dismiss}
            />
            {isFetching && !isRefetching && (
              <ActivityIndicator size="small" color={colors.primary} />
            )}
            {searchQuery.length > 0 && (
              <TouchableOpacity
                onPress={() => setSearchQuery("")}
                style={styles.clearButton}
              >
                <Ionicons
                  name="close-circle"
                  size={18}
                  color={colors.textMuted}
                />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={handleOpenFilter}
          >
            <Ionicons name="options-outline" size={22} color={colors.text} />
            {hasActiveAdvancedFilters && (
              <View style={styles.filterBadge}>
                <Text style={styles.filterBadgeText}>
                  {Object.keys(activeFilters).length}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={allJobs}
        renderItem={renderJobItem}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        ListHeaderComponent={renderListHeader}
        ListFooterComponent={renderListFooter}
        ListEmptyComponent={renderEmptyComponent}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={handleRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
        onScrollBeginDrag={Keyboard.dismiss}
      />

      <JobFilterModal
        visible={isFilterModalVisible}
        onClose={handleCloseFilter}
        onApply={handleApplyFilters}
        currentFilters={activeFilters}
        filterOptions={filterOptions}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
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
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.text,
    textAlign: "center",
    marginBottom: 16,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.backgroundLight,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 8,
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.buttonPrimary,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  filterBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: colors.error,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: colors.white,
  },
  filterBadgeText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: "700",
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
  },
  clearButton: {
    padding: 4,
  },
  categoriesSection: {
    paddingTop: 8,
    paddingBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  categoriesList: {
    flexGrow: 0,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  categoryCard: {
    alignItems: "center",
    justifyContent: "center",
    width: 90,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryCardSelected: {
    backgroundColor: colors.text,
    borderColor: colors.text,
    shadowOpacity: 0.15,
    elevation: 4,
  },
  categoryIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.backgroundLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  categoryIconContainerSelected: {
    backgroundColor: colors.primary,
  },
  categoryCardText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.text,
    textAlign: "center",
  },
  categoryCardTextSelected: {
    color: colors.white,
  },
  resultsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  resultsText: {
    fontSize: 14,
    color: colors.textLight,
  },
  resultsCount: {
    fontWeight: "700",
    color: colors.text,
  },
  clearFiltersButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
    gap: 4,
  },
  clearFiltersText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: "600",
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 70,
  },
  loadingFooter: {
    paddingVertical: 20,
    alignItems: "center",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
    paddingBottom: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: "center",
    paddingHorizontal: 24,
  },
  retryButton: {
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: colors.primary,
  },
  retryButtonText: {
    color: colors.white,
    fontWeight: "600",
    fontSize: 14,
  },
});

export default JobsScreen;
