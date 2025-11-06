import { axiosInt } from "@/utils/axios";
import { IFilterPayload, ITenementCount } from "../../utils/types";
import { API_BASE_URL } from "@/utils/urls";
import { useQuery } from "@tanstack/react-query";

export const FETCH_TENEMENT_COUNT_KEY = (filters: IFilterPayload) => [
  "search",
  "count",
  filters,
];

export const fetchTenementCountApi = async (
  filters: IFilterPayload
): Promise<ITenementCount> => {
  const response = await axiosInt.post<ITenementCount>(
    `${API_BASE_URL}/tenement/search/count`,
    filters
  );
  return response.data;
};

const useFetchTenementCount = (filters: IFilterPayload) => {
  const {
    data: tenementCount,
    isLoading: isLoadingTenementCount,
    error: errorFetchingTenementCount,
  } = useQuery({
    queryKey: FETCH_TENEMENT_COUNT_KEY(filters),
    queryFn: () => fetchTenementCountApi(filters),
    placeholderData: (prev) => prev,
  });

  return {
    tenementCount,
    isLoadingTenementCount,
    errorFetchingTenementCount,
  };
};

export default useFetchTenementCount;
