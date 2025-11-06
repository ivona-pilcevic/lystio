import { axiosInt } from "@/utils/axios";
import { IFilterPayload, IHistogram } from "../../utils/types";
import { API_BASE_URL } from "@/utils/urls";
import { useQuery } from "@tanstack/react-query";

export const FETCH_PRICE_HISTOGRAM_KEY = (filters: IFilterPayload) => [
  "search",
  "histogram",
  filters,
];

export const fetchPriceHistogramApi = async (
  filters: IFilterPayload
): Promise<IHistogram> => {
  const response = await axiosInt.post<IHistogram>(
    `${API_BASE_URL}/tenement/search/histogram`,
    filters
  );
  return response.data;
};

const useFetchPriceHistogram = (filters: IFilterPayload) => {
  const {
    data: priceHistogram,
    isLoading: isLoadingPriceHistogram,
    error: errorFetchingPriceHistogram,
  } = useQuery({
    queryKey: FETCH_PRICE_HISTOGRAM_KEY(filters),
    queryFn: () => fetchPriceHistogramApi(filters),
    placeholderData: (prev) => prev,
  });

  return {
    priceHistogram,
    isLoadingPriceHistogram,
    errorFetchingPriceHistogram,
  };
};

export default useFetchPriceHistogram;
