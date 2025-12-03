import { recentJobs } from "@/data/jobs";
import { JobsQueryParams, JobsResponse } from "@/interfaces";

export const fetchJobs = async (
  params: JobsQueryParams = {}
): Promise<JobsResponse> => {
  const { page = 1, limit = 10, category, search } = params;

  try {
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay

    let filteredJobs = [...recentJobs];

    // Apply category filter
    if (category && category !== "All") {
      filteredJobs = filteredJobs.filter((job) => job.category === category);
    }

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filteredJobs = filteredJobs.filter(
        (job) =>
          job.title.toLowerCase().includes(searchLower) ||
          job.company.toLowerCase().includes(searchLower) ||
          job.location.toLowerCase().includes(searchLower)
      );
    }

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedJobs = filteredJobs.slice(startIndex, endIndex);

    const totalItems = filteredJobs.length;
    const totalPages = Math.ceil(totalItems / limit);
    const hasMore = page < totalPages;

    return {
      data: paginatedJobs,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
        hasMore,
      },
    };
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};

export const getJobCategories = (): string[] => {
  const categories = Array.from(new Set(recentJobs.map((job) => job.category)));
  return ["All", ...categories];
};
