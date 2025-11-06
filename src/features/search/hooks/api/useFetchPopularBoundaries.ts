import { axiosInt } from "@/utils/axios";
import { IPopularBoundary } from "../../utils/types";
import { API_BASE_URL } from "@/utils/urls";
import { useQuery } from "@tanstack/react-query";

export const FETCH_POPULAR_BOUNDARIES_KEY = ["search", "boundaries", "popular"];

export const fetchPopularBoundaries = async () => {
  const response = await axiosInt.get<IPopularBoundary[]>(
    `${API_BASE_URL}/geo/boundary/popular`
  );
  return response.data;
};

const useFetchPopularBoundaries = () => {
  const {
    data: popularBoundaries,
    isLoading: isLoadingPopularBoundaries,
    error: errorFetchingPopularBoundaries,
  } = useQuery({
    queryKey: FETCH_POPULAR_BOUNDARIES_KEY,
    queryFn: () => fetchPopularBoundaries(),
  });

  return {
    popularBoundaries,
    isLoadingPopularBoundaries,
    errorFetchingPopularBoundaries,
  };
};

export default useFetchPopularBoundaries;
