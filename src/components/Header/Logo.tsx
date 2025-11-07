"use client";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

const Logo: React.FC = () => {
  return (
    <LogoLink href="/" aria-label="Lystio Home">
      <LogoImage src="/logo.png" alt="Lystio" width={80} height={37} priority />
    </LogoLink>
  );
};

export default Logo;

const LogoLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  transition: opacity ${({ theme }) => theme.transitions.fast};

  &:hover {
    opacity: 0.8;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 4px;
    border-radius: ${({ theme }) => theme.borderRadius.sm};
  }
`;

const LogoImage = styled(Image)`
  display: block;
  width: auto;
  height: 37px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    max-height: 28px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-height: 24px;
  }
`;
