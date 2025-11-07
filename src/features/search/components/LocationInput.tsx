import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { IRecentSearch, IPopularBoundary } from "../utils/types";
import { MAPBOX_CONFIG } from "../utils/constants";
import { ClockCircleOutlined, EnvironmentOutlined } from "@ant-design/icons";

const AddressAutofill = dynamic(
  () => import("@mapbox/search-js-react").then((mod) => mod.AddressAutofill),
  { ssr: false }
);

export interface ILocationInputProps {
  value?: string;
  onChange?: (value: string) => void;
  onSelect?: (location: {
    id: string;
    name: string;
    coordinates: [number, number];
  }) => void;
  recentSearches?: IRecentSearch[];
  popularBoundaries?: IPopularBoundary[];
  isLoadingRecent?: boolean;
  isLoadingPopular?: boolean;
}

const LocationInput = ({
  value,
  onChange,
  onSelect,
  recentSearches = [],
  popularBoundaries = [],
  isLoadingPopular,
}: ILocationInputProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value && inputRef.current) {
      inputRef.current.value = value;
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const handleRecentClick = (search: IRecentSearch) => {
    if (inputRef.current) {
      inputRef.current.value = search.name;
    }
    onSelect?.({
      id: search.mapboxId,
      name: search.name,
      coordinates: search.pt,
    });
    setIsOpen(false);
  };

  const handleBoundaryClick = (boundary: IPopularBoundary) => {
    if (inputRef.current) {
      inputRef.current.value = boundary.name;
    }
    onSelect?.({
      id: boundary.id,
      name: boundary.name,
      coordinates: [0, 0],
    });
    setIsOpen(false);
  };

  const handleRetrieve = (result: any) => {
    if (result?.features?.[0]) {
      const feature = result.features[0];
      const coordinates = feature.geometry?.coordinates ||
        feature.center || [0, 0];
      const name =
        feature.properties?.name || feature.text || feature.place_name || "";

      if (inputRef.current) {
        inputRef.current.value = name;
      }
      onSelect?.({
        id: feature.properties?.mapbox_id || feature.id,
        name: name,
        coordinates: coordinates as [number, number],
      });
      setIsOpen(false);
    }
  };

  return (
    <Container ref={containerRef}>
      <AddressAutofill
        accessToken={MAPBOX_CONFIG.token}
        options={{
          language: MAPBOX_CONFIG.language,
          country: MAPBOX_CONFIG.country,
        }}
        onRetrieve={handleRetrieve}
      >
        <Input
          ref={inputRef}
          type="text"
          name="address"
          defaultValue={value}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          placeholder="Search for address"
          aria-label="Search location"
          autoComplete="address-line1"
        />
      </AddressAutofill>

      {isOpen && !inputRef.current?.value && (
        <Dropdown>
          {recentSearches && recentSearches.length > 0 && (
            <Section>
              <SectionTitle>Recent searches</SectionTitle>
              {recentSearches.slice(0, 3).map((search, idx) => (
                <DropdownItem
                  key={`recent-${search.mapboxId}-${idx}`}
                  onClick={() => handleRecentClick(search)}
                >
                  <ItemIcon>
                    <ClockCircleOutlined />
                  </ItemIcon>
                  <ItemText>{search.name}</ItemText>
                </DropdownItem>
              ))}
            </Section>
          )}

          {popularBoundaries && (
            <>
              <Section>
                <SectionTitle>States</SectionTitle>
                {isLoadingPopular ? (
                  <LoadingText>Loading...</LoadingText>
                ) : (
                  popularBoundaries
                    .filter((b) => b.postal_code === "state")
                    .slice(0, 3)
                    .map((boundary, idx) => (
                      <DropdownItem
                        key={`state-${boundary.id}-${idx}`}
                        onClick={() => handleBoundaryClick(boundary)}
                      >
                        <ItemIcon>
                          <EnvironmentOutlined />
                        </ItemIcon>
                        <ItemText>{boundary.name}</ItemText>
                        <ItemSubtext>State</ItemSubtext>
                      </DropdownItem>
                    ))
                )}
              </Section>

              <Section>
                <SectionTitle>Cities</SectionTitle>
                {isLoadingPopular ? (
                  <LoadingText>Loading...</LoadingText>
                ) : (
                  popularBoundaries
                    .filter((b) => b.postal_code === "city")
                    .slice(0, 4)
                    .map((boundary, idx) => (
                      <DropdownItem
                        key={`city-${boundary.id}-${idx}`}
                        onClick={() => handleBoundaryClick(boundary)}
                      >
                        <ItemIcon>
                          <EnvironmentOutlined />
                        </ItemIcon>
                        <ItemText>{boundary.name}</ItemText>
                        <ItemSubtext>City</ItemSubtext>
                      </DropdownItem>
                    ))
                )}
              </Section>

              <Section>
                <SectionTitle>District</SectionTitle>
                {isLoadingPopular ? (
                  <LoadingText>Loading...</LoadingText>
                ) : (
                  popularBoundaries
                    .filter((b) => b.postal_code === "district")
                    .slice(0, 5)
                    .map((boundary, idx) => (
                      <DropdownItem
                        key={`district-${boundary.id}-${idx}`}
                        onClick={() => handleBoundaryClick(boundary)}
                      >
                        <ItemIcon>
                          <EnvironmentOutlined />
                        </ItemIcon>
                        <ItemText>{boundary.name}</ItemText>
                        <ItemSubtext>Municipality</ItemSubtext>
                      </DropdownItem>
                    ))
                )}
              </Section>
            </>
          )}
        </Dropdown>
      )}
    </Container>
  );
};

export default LocationInput;

const Container = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 0;
  font-size: ${({ theme }) => theme.typography.sizes.base};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  color: ${({ theme }) => theme.colors.text};
  background: transparent;
  border: none;
  outline: none;
  transition: ${({ theme }) => theme.transitions.fast};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textTertiary};
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + ${({ theme }) => theme.spacing.sm});
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  max-height: 60vh;
  overflow-y: auto;
  z-index: ${({ theme }) => theme.zIndex.dropdown};
  animation: slideDown ${({ theme }) => theme.transitions.base};

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Section = styled.div`
  padding: ${({ theme }) => `${theme.spacing.md} 0`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};

  &:last-child {
    border-bottom: none;
  }
`;

const SectionTitle = styled.div`
  padding: ${({ theme }) => `0 ${theme.spacing.md} ${theme.spacing.sm}`};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const DropdownItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  background: transparent;
  border: none;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};
  text-align: left;

  &:hover {
    background: ${({ theme }) => theme.colors.gray50};
  }
`;

const ItemIcon = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
  flex-shrink: 0;
`;

const ItemText = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.base};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  flex: 1;
`;

const ItemSubtext = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const LoadingText = styled.div`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;
