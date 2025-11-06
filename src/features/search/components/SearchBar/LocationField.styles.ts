import styled from "styled-components";
import { BREAKPOINTS } from "@/utils/constants";

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${({ theme }) => theme.colors.gray50};
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 12px 16px;
  height: 44px;

  @media (max-width: ${BREAKPOINTS.MOBILE_MAX}px) {
    height: 40px;
  }
`;

export const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 4px;
  display: block;
`;

export const Input = styled.input`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  border: none;
  background: transparent;
  outline: none;
  width: 100%;
  color: ${({ theme }) => theme.colors.text};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray400};
  }

  @media (max-width: ${BREAKPOINTS.MOBILE_MAX}px) {
    font-size: 13px;
  }
`;
