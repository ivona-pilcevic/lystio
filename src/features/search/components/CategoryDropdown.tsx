import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { ICategory } from "../utils/types";
import { CATEGORIES } from "../utils/constants";
import { DownOutlined, CheckOutlined } from "@ant-design/icons";

export interface ICategoryDropdownProps {
  selectedCategories: number[];
  onToggleCategory: (categoryId: number) => void;
}

const CategoryDropdown = ({
  selectedCategories,
  onToggleCategory,
}: ICategoryDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedText =
    selectedCategories.length > 0
      ? `${CATEGORIES.find((c) => c.id === selectedCategories[0])?.name}${
          selectedCategories.length > 1
            ? ` +${selectedCategories.length - 1}`
            : ""
        }`
      : "Apartments";

  return (
    <Container ref={containerRef}>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        $isOpen={isOpen}
        aria-label="Select property category"
        aria-expanded={isOpen}
      >
        <span>{selectedText}</span>
        <ChevronIcon $isOpen={isOpen}>
          <DownOutlined />
        </ChevronIcon>
      </Button>

      {isOpen && (
        <Dropdown>
          {CATEGORIES.map((category) => (
            <DropdownItem
              key={category.id}
              onClick={() => onToggleCategory(category.id)}
              $selected={selectedCategories.includes(category.id)}
            >
              <Checkbox $checked={selectedCategories.includes(category.id)}>
                {selectedCategories.includes(category.id) && (
                  <CheckIcon>
                    <CheckOutlined />
                  </CheckIcon>
                )}
              </Checkbox>
              <ItemText>{category.name}</ItemText>
            </DropdownItem>
          ))}
        </Dropdown>
      )}
    </Container>
  );
};

export default CategoryDropdown;

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
  color: ${({ theme }) => theme.colors.text};
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
  min-width: 240px;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  padding: ${({ theme }) => theme.spacing.sm};
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

const DropdownItem = styled.button<{ $selected: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.sm}`};
  background: transparent;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};
  text-align: left;

  &:hover {
    background: ${({ theme }) => theme.colors.gray50};
  }
`;

const Checkbox = styled.div<{ $checked: boolean }>`
  width: 18px;
  height: 18px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  border: 2px solid
    ${({ theme, $checked }) =>
      $checked ? theme.colors.primary : theme.colors.gray300};
  background: ${({ theme, $checked }) =>
    $checked ? theme.colors.primary : "transparent"};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${({ theme }) => theme.transitions.fast};
  flex-shrink: 0;
`;

const ItemText = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.base};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.typography.weights.normal};
`;

const CheckIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
`;
