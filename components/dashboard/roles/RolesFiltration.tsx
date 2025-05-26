import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LanguageType, RolesSortOption } from "@/types/types";
import { Search, X } from "lucide-react";
import React from "react";
import { RolesActiveFilters } from "./RolesActiveFilters";
import { RolesSortFilter } from "./RolesSortFilter";

export const RolesFiltration = ({
  language,
  searchTerm,
  handleSearch,
  filtersActive,
  activeFilters,
  toggleFilter,
  currentSort,
  onSortChange,
}: {
  language: LanguageType;
  searchTerm: string;
  handleSearch: (term: string) => void;
  filtersActive: boolean;
  activeFilters: string[];
  toggleFilter: (filter: string) => void;
  currentSort: RolesSortOption;
  onSortChange: (value: RolesSortOption) => void;
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
      <div className="md:col-span-4 lg:col-span-3">
        <div className="relative">
          <Search className="absolute start-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder={
              language === "AR" ? "البحث عن دور..." : "Search roles..."
            }
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className={`${language === "AR" ? "pr-10" : "pl-10"}`}
          />
          {searchTerm && (
            <Button
              variant="link"
              onClick={() => handleSearch("")}
              className="absolute end-1 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
      </div>
      <div className="md:col-span-8 lg:col-span-9">
        <div className="flex flex-wrap items-center justify-end gap-2">
          <RolesActiveFilters
            activeFilters={activeFilters}
            filtersActive={filtersActive}
            toggleFilter={toggleFilter}
          />
          <RolesSortFilter
            language={language}
            currentSort={currentSort}
            onSortChange={onSortChange}
          />
        </div>
      </div>
    </div>
  );
};
