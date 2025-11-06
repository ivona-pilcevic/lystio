import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
import {
  CollapsedContainer,
  TagsWrapper,
  Tag,
  TagContent,
  TagCloseIcon,
  SearchButton,
} from "./SearchBarCollapsed.styles";
import { styledTheme } from "@/theme/styled-theme";

export interface IProps {
  selectedLocation: string;
  selectedCategory: string;
  selectedPrice: string;
  onLocationClick: () => void;
  onCategoryClick: () => void;
  onPriceClick: () => void;
  onLocationRemove: () => void;
  onCategoryRemove?: () => void;
  onSearchClick: () => void;
  isExpanded: boolean;
}

const SearchBarCollapsed: React.FC<IProps> = ({
  selectedLocation,
  selectedCategory,
  selectedPrice,
  onLocationClick,
  onCategoryClick,
  onPriceClick,
  onLocationRemove,
  onCategoryRemove,
  onSearchClick,
  isExpanded,
}) => {
  if (isExpanded) {
    return null;
  }

  const locationText = selectedLocation || "Map Area";
  const categoryText = selectedCategory || "Apartments";
  const priceText = selectedPrice || "Any Price";
  const isCategorySelected =
    selectedCategory && selectedCategory !== "Apartments";

  return (
    <CollapsedContainer>
      <TagsWrapper>
        <Tag onClick={onLocationClick}>
          <TagContent>{locationText}</TagContent>
          <TagCloseIcon
            onClick={(e) => {
              e.stopPropagation();
              onLocationRemove();
            }}
            aria-label="Remove location filter"
          >
            <CloseOutlined
              style={{ fontSize: styledTheme.typography.sizes.xs }}
            />
          </TagCloseIcon>
        </Tag>

        <Tag onClick={onCategoryClick}>
          <TagContent>{categoryText}</TagContent>
          {isCategorySelected && onCategoryRemove && (
            <TagCloseIcon
              onClick={(e) => {
                e.stopPropagation();
                onCategoryRemove();
              }}
              aria-label="Remove category filter"
            >
              <CloseOutlined
                style={{ fontSize: styledTheme.typography.sizes.xs }}
              />
            </TagCloseIcon>
          )}
        </Tag>

        <Tag onClick={onPriceClick}>
          <TagContent>{priceText}</TagContent>
        </Tag>
      </TagsWrapper>

      <SearchButton onClick={onSearchClick} aria-label="Search">
        <SearchOutlined
          style={{
            fontSize: styledTheme.typography.sizes.lg,
            color: styledTheme.colors.background,
          }}
        />
      </SearchButton>
    </CollapsedContainer>
  );
};

export default SearchBarCollapsed;
