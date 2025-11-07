"use client";
import { useState } from "react";
import styled from "styled-components";
import useSearchFilters from "../hooks/useSearchFilters";
import useFetchRecentSearches from "../hooks/api/useFetchRecentSearches";
import useFetchPopularBoundaries from "../hooks/api/useFetchPopularBoundaries";
import useFetchPriceHistogram from "../hooks/api/useFetchPriceHistogram";
import useFetchTenementCount from "../hooks/api/useFetchTenementCount";
import ActionToggles from "./ActionToggles";
import LocationInput from "./LocationInput";
import CategoryDropdown from "./CategoryDropdown";
import PriceSliderWithHistogram from "./PriceSliderWithHistogram";
import VerifiedCount from "./VerifiedCount";
import FiltersSummaryBar from "./FiltersSummaryBar";
import Logo from "@/components/Header/Logo";
import { Button } from "antd";
import { HeartOutlined, HomeOutlined } from "@ant-design/icons";

const SearchBar = () => {
  const filters = useSearchFilters();
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const { recentSearches, isLoadingRecentSearches } = useFetchRecentSearches();
  const { popularBoundaries, isLoadingPopularBoundaries } =
    useFetchPopularBoundaries();
  const { priceHistogram, isLoadingPriceHistogram } = useFetchPriceHistogram(
    filters.filterPayloadForHistogram
  );
  const { tenementCount, isLoadingTenementCount } = useFetchTenementCount(
    filters.filterPayload
  );

  const handleLocationSelect = (location: {
    id: string;
    name: string;
    coordinates: [number, number];
  }) => {
    setSelectedLocation(location.name);
    filters.toggleBoundary(location.id);
  };

  return (
    <>
      <FiltersSummaryBar
        rentType={filters.rentType}
        location={selectedLocation}
        categoryCount={filters.selectedCategories.length}
        priceRange={filters.priceRange}
        onOpenFilters={() => setIsFiltersOpen(true)}
      />

      <Container>
        <Header>
          <Logo />
          <ActionToggles
            activeRentType={filters.rentType}
            onRentTypeChange={filters.setRentType}
          />

          <Actions>
            <StyledButton type="link" icon={<HomeOutlined />}>
              Create Listing
            </StyledButton>
            <IconButton aria-label="Favorites">
              <StyledHeartIcon />
              <NotificationBadge>15</NotificationBadge>
            </IconButton>
            <Avatar>
              <AvatarText>JK</AvatarText>
            </Avatar>
          </Actions>
        </Header>

        <SearchSection>
          <SearchControls>
            <ControlGroup>
              <Label>Where</Label>
              <LocationInput
                onChange={setSelectedLocation}
                onSelect={handleLocationSelect}
                recentSearches={recentSearches}
                popularBoundaries={popularBoundaries}
                isLoadingRecent={isLoadingRecentSearches}
                isLoadingPopular={isLoadingPopularBoundaries}
              />
            </ControlGroup>

            <Divider />

            <ControlGroup>
              <Label>What</Label>
              <CategoryDropdown
                selectedCategories={filters.selectedCategories}
                onToggleCategory={filters.toggleCategory}
              />
            </ControlGroup>

            <Divider />

            <ControlGroup>
              <Label>Price</Label>
              <PriceSliderWithHistogram
                histogram={priceHistogram}
                priceRange={filters.priceRange}
                onPriceChange={filters.updatePriceRange}
                isLoading={isLoadingPriceHistogram}
              />
            </ControlGroup>

            <SearchButton type="button" aria-label="Search">
              Search
            </SearchButton>
          </SearchControls>

          <VerifiedCount
            count={tenementCount?.count}
            isLoading={isLoadingTenementCount}
          />
        </SearchSection>
      </Container>
    </>
  );
};

export default SearchBar;

const Container = styled.div`
  background: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadows.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: none;
  }
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  color: ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.primaryLight};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.base};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.purple100};
  }

  &:active {
    transform: scale(0.98);
  }
`;

const PlusIcon = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
`;

const IconButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ theme }) => theme.spacing["2xl"]};
  height: ${({ theme }) => theme.spacing["2xl"]};
  color: ${({ theme }) => theme.colors.text};
  background: transparent;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.base};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.gray50};
  }
`;

const NotificationBadge = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing.xs};
  right: ${({ theme }) => theme.spacing.xs};
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: ${({ theme }) => theme.spacing.md};
  height: ${({ theme }) => theme.spacing.md};
  padding: 0 ${({ theme }) => theme.spacing.xs};
  background: ${({ theme }) => theme.colors.error};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  border-radius: ${({ theme }) => theme.borderRadius.full};
`;

const Avatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ theme }) => theme.spacing["2xl"]};
  height: ${({ theme }) => theme.spacing["2xl"]};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }
`;

const AvatarText = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  font-family: ${({ theme }) => theme.typography.fontFamily};
`;

const SearchSection = styled.div`
  padding: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing.xl}`};
`;

const SearchControls = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  background: ${({ theme }) => theme.colors.backgroundLight};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const ControlGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  flex: 1;
  min-width: 0;
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.typography.fontFamily};
`;

const Divider = styled.div`
  width: 1px;
  height: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.gray200};
`;

const SearchButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing["2xl"]}`};
  font-size: ${({ theme }) => theme.typography.sizes.md};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  color: ${({ theme }) => theme.colors.white};
  background: ${({ theme }) => theme.colors.primary};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};
  white-space: nowrap;
  min-width: 120px;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }

  &:active {
    transform: scale(0.98);
  }
`;

const StyledButton = styled(Button)`
  &.ant-btn-link {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const StyledHeartIcon = styled(HeartOutlined)`
  font-size: ${({ theme }) => theme.typography.sizes["2xl"]};
`;
