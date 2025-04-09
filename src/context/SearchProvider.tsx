import { createContext, useState, ReactNode } from "react";

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortQuery: string;
  setSortQuery: (query: string) => void;
}

export const SearchContext = createContext<SearchContextType>({
  searchQuery: "",
  setSearchQuery: () => {}, 
  sortQuery: "",
  setSortQuery: () => {}, 
});


type SearchContextProps = {
  children: ReactNode;
};

const SearchProvider = ({ children }: SearchContextProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortQuery, setSortQuery] = useState("");

  const value = {
    searchQuery,
    setSearchQuery,
    sortQuery,
    setSortQuery,
  };

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
};

export default SearchProvider;