import styled from "styled-components";
import { FilterOutlined } from "@ant-design/icons";
import { RentType } from "../utils/types";

export interface IFiltersSummaryBarProps {
  rentType: RentType;
  location?: string;
  categoryCount: number;
  priceRange: [number, number] | null;
  onOpenFilters: () => void;
}

const FiltersSummaryBar = ({
  rentType,
  location,
  categoryCount,
  priceRange,
  onOpenFilters,
}: IFiltersSummaryBarProps) => {
  const activeFiltersCount = [location, categoryCount > 0, priceRange].filter(
    Boolean
  ).length;

  return (
    <Container>
      <Summary>
        <SummaryText>
          {rentType === RentType.RENT ? "Rent" : "Buy"}
          {location && ` in ${location}`}
          {categoryCount > 0 && ` • ${categoryCount} categories`}
          {priceRange && ` • ${priceRange[0]}€ - ${priceRange[1]}€`}
        </SummaryText>
      </Summary>
      <FiltersButton
        onClick={onOpenFilters}
        type="button"
        aria-label="Open filters"
      >
        <FilterIcon>
          <FilterOutlined />
        </FilterIcon>
        Filters
        {activeFiltersCount > 0 && <Badge>{activeFiltersCount}</Badge>}
      </FiltersButton>
    </Container>
  );
};

export default FiltersSummaryBar;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: none;
  }
`;

const Summary = styled.div`
  flex: 1;
  overflow: hidden;
`;

const SummaryText = styled.div`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const FiltersButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.inputBorder};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};
  white-space: nowrap;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:active {
    transform: scale(0.98);
  }
`;

const FilterIcon = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Badge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 ${({ theme }) => theme.spacing.xs};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  border-radius: ${({ theme }) => theme.borderRadius.full};
`;
