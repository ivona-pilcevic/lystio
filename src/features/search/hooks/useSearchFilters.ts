import { useState, useCallback, useMemo } from "react";
import { IFilterPayload, RentType } from "../utils/types";

const useSearchFilters = () => {
  const [rentType, setRentType] = useState<RentType>(RentType.RENT);
  const [selectedBoundaries, setSelectedBoundaries] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);

  const toggleRentType = useCallback(() => {
    setRentType((prev) =>
      prev === RentType.RENT ? RentType.BUY : RentType.RENT
    );
  }, []);

  const toggleBoundary = useCallback((boundaryId: string) => {
    setSelectedBoundaries((prev) =>
      prev.includes(boundaryId)
        ? prev.filter((id) => id !== boundaryId)
        : [...prev, boundaryId]
    );
  }, []);

  const toggleCategory = useCallback((categoryId: number) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  }, []);

  const updatePriceRange = useCallback((range: [number, number] | null) => {
    setPriceRange(range);
  }, []);

  const resetFilters = useCallback(() => {
    setSelectedBoundaries([]);
    setSelectedCategories([]);
    setPriceRange(null);
  }, []);

  const filterPayload = useMemo<IFilterPayload>(() => {
    const payload: IFilterPayload = {
      rentType: [rentType],
    };

    if (selectedBoundaries.length > 0) {
      payload.withinId = selectedBoundaries;
    }

    if (selectedCategories.length > 0) {
      payload.type = selectedCategories;
    }

    if (priceRange && priceRange[0] !== null && priceRange[1] !== null) {
      payload.rent = priceRange;
    }

    return payload;
  }, [rentType, selectedBoundaries, selectedCategories, priceRange]);

  const filterPayloadForHistogram = useMemo<IFilterPayload>(() => {
    const payload: IFilterPayload = {
      rentType: [rentType],
    };

    if (selectedBoundaries.length > 0) {
      payload.withinId = selectedBoundaries;
    }

    if (selectedCategories.length > 0) {
      payload.type = selectedCategories;
    }

    return payload;
  }, [rentType, selectedBoundaries, selectedCategories]);

  return {
    rentType,
    selectedBoundaries,
    selectedCategories,
    priceRange,
    setRentType,
    toggleRentType,
    toggleBoundary,
    toggleCategory,
    updatePriceRange,
    resetFilters,
    filterPayload,
    filterPayloadForHistogram,
  };
};

export default useSearchFilters;
