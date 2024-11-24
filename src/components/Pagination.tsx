import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

interface Props {
  pagesCount: number;
}

const BottomPagination: React.FC<Props> = ({ pagesCount }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const currentPage = searchParams.get("PageNumber");

  const updateSearchQuery = (
    query: ReadonlyURLSearchParams,
    newPage: number
  ) => {
    const params = new URLSearchParams(searchParams);
    Object.keys(query).forEach((key: string) => {
      if (query.get(key)) {
        params.set(key, query.get(key) ?? "");
      } else {
        params.delete(key);
      }
    });
    params.set("PageNumber", `${newPage}`);
    const queryString = params.toString();
    const updatedPath = queryString ? `${pathname}?${queryString}` : pathname;
    router.push(updatedPath);
  };

  const prevPage = () => {
    const pageNumber = searchParams.get("PageNumber");
    if (!pageNumber || +pageNumber <= 1) return;

    updateSearchQuery(searchParams, +pageNumber - 1);
  };

  const nextPage = () => {
    const pageNumber = searchParams.get("PageNumber");
    if (!pageNumber || +pageNumber >= 10) return;

    updateSearchQuery(searchParams, +pageNumber + 1);
  };

  return (
    <div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={prevPage} className="cursor-pointer" />
          </PaginationItem>
          <p>
            Page {currentPage} of {pagesCount}
          </p>
          <PaginationItem>
            <PaginationNext onClick={nextPage} className="cursor-pointer" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default BottomPagination;
