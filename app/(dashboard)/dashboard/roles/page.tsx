"use client";
import { RoleCard } from "@/components/dashboard/roles/RoleCard";
import { RolesBreadcrumbWithTitle } from "@/components/dashboard/roles/RolesBreadcrumbWithTitle";
import { RolesFiltration } from "@/components/dashboard/roles/RolesFiltration";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import getAllRoles from "@/lib/actions/dashboard/roles/getAll";
import { IRoleWithUserRoles, RolesSortOption } from "@/types/types";
import { translateRole } from "@/utils/translateRoles";
import { Download, Plus, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function RolesPage() {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [roles, setRoles] = useState<IRoleWithUserRoles[]>([]);
  const [filtersActive, setFiltersActive] = useState<boolean>(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [filteredRoles, setFilteredRoles] = useState<IRoleWithUserRoles[]>([]);
  const [sortOption, setSortOption] = useState<RolesSortOption>("name-asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const rolesPerPage = 10;

  useEffect(() => {
    const setSticky = () => {
      if (window.scrollY >= 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", setSticky);
    return () => window.removeEventListener("scroll", setSticky);
  }, []);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const result = await getAllRoles(language);
        if (result.success) {
          setRoles(result.data as IRoleWithUserRoles[]);
          toast.success(
            language === "AR"
              ? "تم جلب الادوار بنجاح"
              : "Successfully Gotten Roles",
            {
              description:
                language === "AR"
                  ? "لقد تم جلب كل الادوار بنجاح"
                  : "All Roles has gotten successfully",
            }
          );
        } else {
          toast.error(
            language === "AR"
              ? "لم يتم جلب الادوار بنجاح"
              : "Error Gotten Roles",
            {
              description:
                language === "AR"
                  ? "لقد لم يتم جلب كل الادوار بنجاح"
                  : "All Roles has not gotten",
            }
          );
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchRoles();
    return () => {
      fetchRoles();
    };
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filtered = roles.filter((role) =>
      language === "AR"
        ? translateRole(role.name).toLowerCase().includes(term.toLowerCase())
        : role.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredRoles(filtered.length === 0 ? roles : filtered);
    setCurrentPage(1); // Reset to first page when filtering
  };
  const handleSortChange = (value: RolesSortOption) => {
    setSortOption(value);
  };

  useEffect(() => {
    let filtered = roles;
    if (searchTerm) {
      filtered = roles.filter((role) =>
        language === "AR"
          ? translateRole(role.name)
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          : role.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    // Sorting logic
    filtered = [...filtered].sort((a, b) => {
      switch (sortOption) {
        case "name-asc":
          return language === "AR"
            ? translateRole(a.name).localeCompare(translateRole(b.name))
            : a.name.localeCompare(b.name);
        case "name-desc":
          return language === "AR"
            ? translateRole(b.name).localeCompare(translateRole(a.name))
            : b.name.localeCompare(a.name);
        case "users-asc":
          return (a.users?.length || 0) - (b.users?.length || 0);
        case "users-desc":
          return (b.users?.length || 0) - (a.users?.length || 0);
        default:
          return 0;
      }
    });
    setFilteredRoles(filtered);
  }, [roles, searchTerm, sortOption, language]);

  // Toggle filter function
  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter((f) => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }

    if (!filtersActive && !activeFilters.includes(filter)) {
      setFiltersActive(true);
    }

    if (activeFilters.length === 1 && activeFilters[0] === filter) {
      setFiltersActive(false);
    }
  };

  // Calculate pagination
  const indexOfLastRole = currentPage * rolesPerPage;
  const indexOfFirstRole = indexOfLastRole - rolesPerPage;
  const currentRoles = filteredRoles.slice(indexOfFirstRole, indexOfLastRole);
  const totalPages = Math.ceil(filteredRoles.length / rolesPerPage);

  // Handle export data
  const handleExport = () => {
    toast(language === "AR" ? "تم تصدير البيانات" : "Data Exported", {
      description:
        language === "AR"
          ? "تم تصدير بيانات الأدوار بنجاح"
          : "Roles data has been exported successfully.",
    });
  };

  return (
    <div className="px-4 py-6 sm:px-6 flex flex-col min-h-full relative">
      {/* Breadcrumb and Page Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <RolesBreadcrumbWithTitle language={language} />
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={handleExport}
            variant="outline"
            className="bg-white dark:bg-gray-800"
          >
            <Download className="h-4 w-4" />
            {language === "AR" ? "تصدير" : "Export"}
          </Button>
        </div>
      </div>
      {/* Search and Filters */}
      <div
        className={`mb-6 ${
          isSticky
            ? "sticky top-0 z-[100] bg-white dark:bg-gray-900"
            : "relative"
        }`}
      >
        <RolesFiltration
          language={language}
          searchTerm={searchTerm}
          handleSearch={handleSearch}
          activeFilters={activeFilters}
          filtersActive={filtersActive}
          toggleFilter={toggleFilter}
          currentSort={sortOption}
          onSortChange={handleSortChange}
        />
      </div>

      {/* Role Cards */}
      <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5  gap-6 mb-5 flex-1">
        {currentRoles.length > 0 ? (
          currentRoles.map((current_role: IRoleWithUserRoles, index) => (
            <RoleCard role={current_role} language={language} key={index} />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
            <Users className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              {language === "AR" ? "لم يتم العثور على أدوار" : "No roles found"}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-sm mt-2">
              {language === "AR"
                ? "لم يتم العثور على أدوار مطابقة للمعايير التي حددتها."
                : "No roles match the criteria you have set."}
            </p>
          </div>
        )}
      </div>
      {/* Pagination */}
      {filteredRoles.length > 0 && (
        <div className="mt-1 mb-2">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  language={language}
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  className={
                    currentPage === 1 ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => {
                  // Show only current page, first, last, and one page before and after current
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <PaginationItem key={page}>
                        <PaginationLink
                          isActive={page === currentPage}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  } else if (
                    (page === currentPage - 2 && currentPage > 3) ||
                    (page === currentPage + 2 && currentPage < totalPages - 2)
                  ) {
                    return (
                      <PaginationItem key={page}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    );
                  }
                  return null;
                }
              )}

              <PaginationItem>
                <PaginationNext
                  language={language}
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
      {/* Add Role Button - Positioned fixed at bottom */}
      <div
        className={`absolute bottom-0 ${
          language === "AR" ? "left-6" : "right-6"
        } z-10`}
      >
        <Button
          size="lg"
          className="rounded-full shadow-lg bg-gradient-to-r from-blue-950 to-indigo-800 hover:from-blue-700 hover:to-indigo-800 transition-all"
        >
          <Plus className="md:mr-2 h-5 w-5" />
          <span className="hidden md:flex">
            {language === "AR" ? "إضافة دور جديد" : "Add New Role"}
          </span>
        </Button>
      </div>
    </div>
  );
}
