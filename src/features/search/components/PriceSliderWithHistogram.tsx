import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Switch, Checkbox } from "antd";
import { CheckOutlined, DownOutlined, SearchOutlined } from "@ant-design/icons";
import { useToggleVisibility } from "@/hooks/useToggleVisibility";
import { IHistogram } from "../utils/types";

export interface IPriceSliderWithHistogramProps {
  histogram?: IHistogram;
  priceRange: [number, number] | null;
  onPriceChange: (range: [number, number]) => void;
  isLoading?: boolean;
}

const PRICE_OPTIONS = [400, 500, 600, 700, 800, 900, 1000, 1100, 1200];
const PRICE_PER_M2_OPTIONS = [3, 4, 5, 6, 7, 8, 9, 10, 11];

const PriceSliderWithHistogram = ({
  priceRange,
  onPriceChange,
}: IPriceSliderWithHistogramProps) => {
  const { isVisible: isOpen, toggle, hide } = useToggleVisibility();
  const [isPricePerM2, setIsPricePerM2] = useState(false);
  const [showPriceOnRequest, setShowPriceOnRequest] = useState(true);
  const [minPrice, setMinPrice] = useState<number | null>(
    priceRange?.[0] ?? null
  );
  const [maxPrice, setMaxPrice] = useState<number | null>(
    priceRange?.[1] ?? null
  );
  const [focusedInput, setFocusedInput] = useState<"min" | "max" | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const minInputRef = useRef<HTMLInputElement>(null);
  const maxInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (priceRange) {
      setMinPrice(priceRange[0]);
      setMaxPrice(priceRange[1]);
    }
  }, [priceRange]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        hide();
        setFocusedInput(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [hide]);

  const handleMinPriceSelect = (price: number | null) => {
    setMinPrice(price);
    setFocusedInput(null);
    if (price !== null && maxPrice !== null) {
      onPriceChange([price, maxPrice]);
    }
  };

  const handleMaxPriceSelect = (price: number | null) => {
    setMaxPrice(price);
    setFocusedInput(null);
    if (minPrice !== null && price !== null) {
      onPriceChange([minPrice, price]);
    }
  };

  const handleSearch = () => {
    if (minPrice !== null && maxPrice !== null) {
      onPriceChange([minPrice, maxPrice]);
    }
    hide();
  };

  const priceOptions = isPricePerM2 ? PRICE_PER_M2_OPTIONS : PRICE_OPTIONS;
  const priceUnit = isPricePerM2 ? "€/m²" : "€";

  const displayText =
    minPrice !== null || maxPrice !== null
      ? `${minPrice ?? "No Minimum"} - ${maxPrice ?? "No Maximum"}`
      : "Select Price Range";

  return (
    <Container ref={containerRef}>
      <Button
        onClick={toggle}
        type="button"
        $isOpen={isOpen}
        aria-label="Select price range"
        aria-expanded={isOpen}
      >
        <span>{displayText}</span>
        <ChevronIcon $isOpen={isOpen}>
          <DownOutlined />
        </ChevronIcon>
      </Button>

      {isOpen && (
        <Dropdown>
          <Header>Price Range</Header>

          <ToggleRow>
            <ToggleLabel>Switch to price per m²</ToggleLabel>
            <StyledSwitch checked={isPricePerM2} onChange={setIsPricePerM2} />
          </ToggleRow>

          <RangeInputsRow>
            <RangeInputWrapper>
              <RangeLabel>Min</RangeLabel>
              <RangeInputContainer>
                <RangeInput
                  ref={minInputRef}
                  type="text"
                  value={minPrice ?? ""}
                  placeholder="No Minimum"
                  onFocus={() => setFocusedInput("min")}
                  readOnly
                  $isFocused={focusedInput === "min"}
                  $hasValue={minPrice !== null}
                />
                {focusedInput === "min" && minPrice !== null && (
                  <CheckIcon>
                    <CheckOutlined />
                  </CheckIcon>
                )}
              </RangeInputContainer>
            </RangeInputWrapper>

            <RangeInputWrapper>
              <RangeLabel>Max</RangeLabel>
              <RangeInputContainer>
                <RangeInput
                  ref={maxInputRef}
                  type="text"
                  value={maxPrice ?? ""}
                  placeholder="No Maximum"
                  onFocus={() => setFocusedInput("max")}
                  readOnly
                  $isFocused={focusedInput === "max"}
                  $hasValue={maxPrice !== null}
                />
                {focusedInput === "max" && maxPrice !== null && (
                  <CheckIcon>
                    <CheckOutlined />
                  </CheckIcon>
                )}
              </RangeInputContainer>
            </RangeInputWrapper>
          </RangeInputsRow>

          {focusedInput && (
            <OptionsDropdown>
              <OptionItem
                onClick={() => {
                  if (focusedInput === "min") {
                    handleMinPriceSelect(null);
                  } else {
                    handleMaxPriceSelect(null);
                  }
                }}
                $isSelected={
                  focusedInput === "min" ? minPrice === null : maxPrice === null
                }
              >
                {focusedInput === "min" ? "No Minimum" : "No Maximum"}
                {((focusedInput === "min" && minPrice === null) ||
                  (focusedInput === "max" && maxPrice === null)) && (
                  <CheckIcon>
                    <CheckOutlined />
                  </CheckIcon>
                )}
              </OptionItem>

              {priceOptions.map((price) => {
                const isDisabled =
                  focusedInput === "min"
                    ? maxPrice !== null && price >= maxPrice
                    : minPrice !== null && price <= minPrice;

                const isSelected =
                  focusedInput === "min"
                    ? minPrice === price
                    : maxPrice === price;

                return (
                  <OptionItem
                    key={price}
                    onClick={() => {
                      if (!isDisabled) {
                        if (focusedInput === "min") {
                          handleMinPriceSelect(price);
                        } else {
                          handleMaxPriceSelect(price);
                        }
                      }
                    }}
                    $isSelected={isSelected}
                    $isDisabled={isDisabled}
                  >
                    {price}
                    {priceUnit}
                    {isSelected && (
                      <CheckIcon>
                        <CheckOutlined />
                      </CheckIcon>
                    )}
                  </OptionItem>
                );
              })}
            </OptionsDropdown>
          )}

          <CheckboxWrapper>
            <Checkbox
              checked={showPriceOnRequest}
              onChange={(e) => setShowPriceOnRequest(e.target.checked)}
            >
              Show listings with "Price on Request"
            </Checkbox>
          </CheckboxWrapper>

          <SearchButton onClick={handleSearch} type="button">
            <SearchOutlined />
            Search
          </SearchButton>
        </Dropdown>
      )}
    </Container>
  );
};

export default PriceSliderWithHistogram;

const Container = styled.div`
  position: relative;
`;

const Button = styled.button<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: 0;
  font-size: ${({ theme }) => theme.typography.sizes.base};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-weight: ${({ theme }) => theme.typography.weights.normal};
  color: ${({ theme, $isOpen }) =>
    $isOpen ? theme.colors.text : theme.colors.textTertiary};
  background: transparent;
  border: none;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};
  white-space: nowrap;

  &:hover {
    opacity: 0.7;
  }
`;

const ChevronIcon = styled.div<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: transform ${({ theme }) => theme.transitions.base};
  transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "rotate(0)")};
`;

const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + ${({ theme }) => theme.spacing.sm});
  left: 0;
  width: 540px;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  padding: ${({ theme }) => theme.spacing.lg};
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

const Header = styled.div`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const ToggleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  background: ${({ theme }) => theme.colors.backgroundLight};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const ToggleLabel = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.base};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  color: ${({ theme }) => theme.colors.text};
`;

const RangeInputsRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const RangeInputWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const RangeLabel = styled.label`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
`;

const RangeInputContainer = styled.div`
  position: relative;
`;

const RangeInput = styled.input<{ $isFocused: boolean; $hasValue: boolean }>`
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.md}`};
  padding-right: ${({ theme, $hasValue }) =>
    $hasValue ? theme.spacing.xl : theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.sizes.base};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  color: ${({ theme, $hasValue }) =>
    $hasValue ? theme.colors.text : theme.colors.textTertiary};
  background: ${({ theme }) => theme.colors.white};
  border: 2px solid
    ${({ theme, $isFocused }) =>
      $isFocused ? theme.colors.primary : theme.colors.inputBorder};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  outline: none;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textTertiary};
  }

  &:hover {
    border-color: ${({ theme, $isFocused }) =>
      $isFocused ? theme.colors.primary : theme.colors.gray300};
  }
`;

const CheckIcon = styled.div`
  position: absolute;
  right: ${({ theme }) => theme.spacing.sm};
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.sizes.md};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const OptionsDropdown = styled.div`
  max-height: 240px;
  overflow-y: auto;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.inputBorder};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  margin-bottom: ${({ theme }) => theme.spacing.md};

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.gray50};
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.gray300};
    border-radius: 3px;

    &:hover {
      background: ${({ theme }) => theme.colors.gray400};
    }
  }
`;

const OptionItem = styled.div<{
  $isSelected?: boolean;
  $isDisabled?: boolean;
}>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.md}`};
  font-size: ${({ theme }) => theme.typography.sizes.base};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  color: ${({ theme, $isDisabled }) =>
    $isDisabled ? theme.colors.gray300 : theme.colors.text};
  background: ${({ theme, $isSelected }) =>
    $isSelected ? theme.colors.backgroundLight : theme.colors.white};
  cursor: ${({ $isDisabled }) => ($isDisabled ? "not-allowed" : "pointer")};
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme, $isDisabled }) =>
      $isDisabled ? theme.colors.white : theme.colors.backgroundLight};
  }

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
  }
`;

const CheckboxWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  .ant-checkbox-wrapper {
    font-size: ${({ theme }) => theme.typography.sizes.base};
    font-family: ${({ theme }) => theme.typography.fontFamily};
    color: ${({ theme }) => theme.colors.text};
  }

  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
  }

  .ant-checkbox:hover .ant-checkbox-inner {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const SearchButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  font-size: ${({ theme }) => theme.typography.sizes.md};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.white};
  background: ${({ theme }) => theme.colors.primary};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }

  &:active {
    transform: scale(0.98);
  }
`;

const StyledSwitch = styled(Switch)`
  &.ant-switch-checked {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;
