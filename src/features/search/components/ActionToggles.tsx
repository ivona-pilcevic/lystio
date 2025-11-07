import { RentType } from "../utils/types";
import styled from "styled-components";

export interface IActionTogglesProps {
  activeRentType: RentType;
  onRentTypeChange: (type: RentType) => void;
}

const ActionToggles = ({
  activeRentType,
  onRentTypeChange,
}: IActionTogglesProps) => {
  return (
    <Container>
      <Toggle
        $active={activeRentType === RentType.RENT}
        onClick={() => onRentTypeChange(RentType.RENT)}
        type="button"
        aria-label="Switch to rent listings"
      >
        Rent
      </Toggle>
      <Toggle
        $active={activeRentType === RentType.BUY}
        onClick={() => onRentTypeChange(RentType.BUY)}
        type="button"
        aria-label="Switch to buy listings"
      >
        Buy
      </Toggle>
      <AIToggle type="button" aria-label="Activate Lystio AI">
        Lystio <span>AI</span>
      </AIToggle>
    </Container>
  );
};

export default ActionToggles;

const Container = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
  align-items: center;
  background: ${({ theme }) => theme.colors.backgroundLight};
  padding: ${({ theme }) => theme.spacing.xs};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const Toggle = styled.button<{ $active: boolean }>`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  font-size: ${({ theme }) => theme.typography.sizes.base};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.white : "transparent"};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  line-height: ${({ theme }) => theme.typography.lineHeights.normal};
  white-space: nowrap;
  box-shadow: ${({ theme, $active }) => ($active ? theme.shadows.sm : "none")};

  &:hover {
    background: ${({ theme, $active }) =>
      $active ? theme.colors.white : theme.colors.gray50};
  }

  &:active {
    transform: scale(0.98);
  }
`;

const AIToggle = styled.button`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  font-size: ${({ theme }) => theme.typography.sizes.base};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  color: ${({ theme }) => theme.colors.primary};
  background: transparent;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  line-height: ${({ theme }) => theme.typography.lineHeights.normal};
  white-space: nowrap;

  span {
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.colors.primary} 0%,
      ${({ theme }) => theme.colors.primaryHover} 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.gray50};
  }

  &:active {
    transform: scale(0.98);
  }
`;
