import { StarFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

export interface IProps {
  count?: number;
  isLoading?: boolean;
}

const VerifiedCount = ({ count = 0, isLoading }: IProps) => {
  const [prevCount, setPrevCount] = useState(count);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (count !== prevCount && !isLoading) {
      setShouldAnimate(true);
      const timer = setTimeout(() => {
        setPrevCount(count);
        setShouldAnimate(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [count, prevCount, isLoading]);

  return (
    <Container>
      <VerifiedBadge>
        <StyledStarIcon />
        <BadgeText>Verified</BadgeText>
      </VerifiedBadge>
      <CountText $animate={shouldAnimate}>
        {isLoading ? "Loading..." : `${count} Listing in Vienna`}
      </CountText>
    </Container>
  );
};

export default VerifiedCount;

const fadeSlide = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-4px);
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm};
`;

const VerifiedBadge = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  background: ${({ theme }) => theme.colors.purple50};
  border-radius: ${({ theme }) => theme.borderRadius.full};
`;

const StyledStarIcon = styled(StarFilled)`
  color: ${({ theme }) => theme.colors.primary};
`;

const BadgeText = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.typography.fontFamily};
`;

const CountText = styled.div<{ $animate: boolean }>`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  animation: ${({ $animate }) => ($animate ? fadeSlide : "none")} 300ms ease-out;
`;
