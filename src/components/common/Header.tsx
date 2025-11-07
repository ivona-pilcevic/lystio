"use client";
import SearchBar from "@/features/search/components/SearchBar";

export interface IProps {}

const Header: React.FC<IProps> = () => {
  return (
    <div>
      <SearchBar />
    </div>
  );
};

export default Header;
