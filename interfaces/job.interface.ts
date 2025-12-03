export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  logo: any;
  category: string;
  description?: string;
  type?: string;
  level?: string;
  industry?: string;
  postedAt?: string;
}

export interface JobsResponse {
  data: Job[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    hasMore: boolean;
  };
}

export interface JobsQueryParams {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
}
