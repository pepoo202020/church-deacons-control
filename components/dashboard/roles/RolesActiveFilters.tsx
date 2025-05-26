import { Badge } from "@/components/ui/badge";
import React from "react";

export const RolesActiveFilters = ({
  filtersActive,
  activeFilters,
  toggleFilter,
}: {
  filtersActive: boolean;
  activeFilters: string[];
  toggleFilter: (filter: string) => void;
}) => {
  return (
    <div>
      {filtersActive && (
        <div className="flex flex-wrap gap-2 mr-auto">
          {activeFilters.map((filter) => (
            <Badge
              key={filter}
              variant="outline"
              className="bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800/30 cursor-pointer"
              onClick={() => toggleFilter(filter)}
            >
              {filter}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};
