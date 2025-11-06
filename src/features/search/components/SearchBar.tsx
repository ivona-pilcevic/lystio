"use client";

import { AddressAutofill } from "@mapbox/search-js-react";
import { RentType } from "../utils/types";
import { MAPBOX_CONFIG } from "../utils/constants";
import useSearchFilters from "../hooks/useSearchFilters";
import useFetchRecentSearches from "../hooks/api/useFetchRecentSearches";
import useFetchPopularBoundaries from "../hooks/api/useFetchPopularBoundaries";
import useFetchPriceHistogram from "../hooks/api/useFetchPriceHistogram";
import useFetchTenementCount from "../hooks/api/useFetchTenementCount";

const SearchBar = () => {
  const filters = useSearchFilters();
  const {
    recentSearches,
    isLoadingRecentSearches,
    errorFetchingRecentSearches,
  } = useFetchRecentSearches();
  const {
    popularBoundaries,
    isLoadingPopularBoundaries,
    errorFetchingPopularBoundaries,
  } = useFetchPopularBoundaries();
  const {
    priceHistogram,
    isLoadingPriceHistogram,
    errorFetchingPriceHistogram,
  } = useFetchPriceHistogram(filters.filterPayloadForHistogram);
  const { tenementCount, isLoadingTenementCount, errorFetchingTenementCount } =
    useFetchTenementCount(filters.filterPayload);

  return (
    <div>
      <h1>Lystio Search</h1>

      <div>
        <h2>Rent Type</h2>
        <p>Current: {filters.rentType}</p>
        <button onClick={filters.toggleRentType}>Toggle Rent/Buy</button>
        <button onClick={() => filters.setRentType(RentType.RENT)}>
          Set Rent
        </button>
        <button onClick={() => filters.setRentType(RentType.BUY)}>
          Set Buy
        </button>
      </div>

      <div>
        <h2>Mapbox Address Search</h2>
        <form>
          <AddressAutofill
            accessToken={MAPBOX_CONFIG.token}
            options={{
              language: MAPBOX_CONFIG.language,
              country: MAPBOX_CONFIG.country,
            }}
          >
            <input
              type="text"
              name="address"
              placeholder="Search for an address in Austria..."
              autoComplete="address-line1"
            />
          </AddressAutofill>
        </form>
      </div>

      <div>
        <h2>Recent Searches</h2>
        {isLoadingRecentSearches && <p>Loading...</p>}
        {errorFetchingRecentSearches && (
          <p style={{ color: "red" }}>Error loading recent searches</p>
        )}
        {recentSearches && <pre>{JSON.stringify(recentSearches, null, 2)}</pre>}
      </div>

      <div>
        <h2>Popular Boundaries</h2>
        {isLoadingPopularBoundaries && <p>Loading...</p>}
        {errorFetchingPopularBoundaries && (
          <p style={{ color: "red" }}>Error loading boundaries</p>
        )}
        {popularBoundaries && (
          <div>
            <p>Count: {popularBoundaries.length}</p>
            <ul>
              {popularBoundaries.slice(0, 5).map((b) => (
                <li key={b.id}>
                  {b.name} ({b.id})
                  <button onClick={() => filters.toggleBoundary(b.id)}>
                    {filters.selectedBoundaries.includes(b.id)
                      ? "Remove"
                      : "Add"}
                  </button>
                </li>
              ))}
            </ul>
            <p>Selected: {filters.selectedBoundaries.join(", ") || "None"}</p>
          </div>
        )}
      </div>

      <div>
        <h2>Price Range</h2>
        <input
          type="number"
          placeholder="Min"
          onChange={(e) => {
            const val = parseInt(e.target.value);
            filters.updatePriceRange([
              val || 0,
              filters.priceRange?.[1] || 2000,
            ]);
          }}
        />
        <input
          type="number"
          placeholder="Max"
          onChange={(e) => {
            const val = parseInt(e.target.value);
            filters.updatePriceRange([
              filters.priceRange?.[0] || 0,
              val || 2000,
            ]);
          }}
        />
        <p>
          Current:{" "}
          {filters.priceRange
            ? `${filters.priceRange[0]} - ${filters.priceRange[1]}`
            : "Not set"}
        </p>
      </div>

      <div>
        <h2>Price Histogram</h2>
        {isLoadingPriceHistogram && <p>Loading...</p>}
        {errorFetchingPriceHistogram && (
          <p style={{ color: "red" }}>Error loading histogram</p>
        )}
        {priceHistogram && (
          <div>
            <p>
              Range: {priceHistogram.range[0]} - {priceHistogram.range[1]}
            </p>
            <p>Buckets: {priceHistogram.histogram.length}</p>
            <pre>{JSON.stringify(priceHistogram.histogram, null, 2)}</pre>
          </div>
        )}
      </div>

      <div>
        <h2>Tenement Count</h2>
        {isLoadingTenementCount && <p>Loading...</p>}
        {errorFetchingTenementCount && (
          <p style={{ color: "red" }}>Error loading count</p>
        )}
        {tenementCount && (
          <div>
            <p style={{ fontSize: "24px", fontWeight: "bold" }}>
              {tenementCount.count} verified listings
            </p>
          </div>
        )}
      </div>

      <div>
        <h2>Filter Payload (sent to API)</h2>
        <pre>{JSON.stringify(filters.filterPayload, null, 2)}</pre>
      </div>

      <button
        onClick={filters.resetFilters}
        style={{ padding: "10px 20px", fontSize: "16px" }}
      >
        Reset All Filters
      </button>
    </div>
  );
};

export default SearchBar;
