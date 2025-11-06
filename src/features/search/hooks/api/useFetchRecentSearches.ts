import { axiosInt } from "@/utils/axios";
import { IRecentSearch } from "../../utils/types";
import { API_BASE_URL } from "@/utils/urls";
import { useQuery } from "@tanstack/react-query";

export const FETCH_RECENT_SEARCHES_KEY = ["search", "recent"];

export const fetchRecentSearches = async (): Promise<IRecentSearch[]> => {
  const response = await axiosInt.get<IRecentSearch[]>(
    `${API_BASE_URL}/geo/search/recent`
  );
  return response.data;
};

const useFetchRecentSearches = () => {
  const {
    data: recentSearches,
    isLoading: isLoadingRecentSearches,
    error: errorFetchingRecentSearches,
  } = useQuery({
    queryKey: FETCH_RECENT_SEARCHES_KEY,
    queryFn: () => fetchRecentSearches(),
  });

  return {
    recentSearches,
    isLoadingRecentSearches,
    errorFetchingRecentSearches,
  };
};

export default useFetchRecentSearches;
