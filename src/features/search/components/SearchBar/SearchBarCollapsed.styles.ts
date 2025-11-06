import styled from "styled-components";
import { BREAKPOINTS } from "../../../../utils/constants";

export const CollapsedContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xs};
  background: transparent;
  gap: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.full};

  @media (max-width: ${BREAKPOINTS.TABLET_MAX}px) {
    gap: ${({ theme }) => theme.spacing.sm};
  }

  @media (max-width: ${BREAKPOINTS.MOBILE_MAX}px) {
    gap: ${({ theme }) => theme.spacing.xs};
  }
`;

export const TagsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};

  @media (max-width: ${BREAKPOINTS.MOBILE_MAX}px) {
    gap: ${({ theme }) => theme.spacing.xs};
  }
`;

export const Tag = styled.div`
  display: flex;
  align-items: center;
  min-height: 32px;
  padding: 8px 12px;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.base};

  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  color: ${({ theme }) => theme.colors.gray800};
  gap: 6px;

  &:hover {
    background: ${({ theme }) => theme.colors.gray50};
    border-radius: 100px;
  }

  @media (max-width: ${BREAKPOINTS.TABLET_MAX}px) {
    padding: 6px 10px;
    font-size: ${({ theme }) => theme.typography.sizes.xs};
  }

  @media (max-width: ${BREAKPOINTS.MOBILE_MAX}px) {
    padding: 5px 8px;
    font-size: ${({ theme }) => theme.typography.sizes.xs};
  }
`;

export const TagContent = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const TagCloseIcon = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  margin-left: 4px;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity ${({ theme }) => theme.transitions.fast};

  &:hover {
    opacity: 1;
  }

  &:focus {
    outline: none;
    opacity: 1;
  }
`;

export const SearchButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: ${({ theme }) => theme.colors.primary};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(168, 85, 247, 0.3);
  transition: ${({ theme }) => theme.transitions.base};

  &:hover {
    background: #9333ea;
    box-shadow: 0 6px 16px rgba(168, 85, 247, 0.4);
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  @media (max-width: ${BREAKPOINTS.TABLET_MAX}px) {
    width: 40px;
    height: 40px;
  }

  @media (max-width: ${BREAKPOINTS.MOBILE_MAX}px) {
    width: 36px;
    height: 36px;
  }
`;
