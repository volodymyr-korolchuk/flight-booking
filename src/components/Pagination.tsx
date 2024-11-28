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
    if (!pageNumber || +pageNumber >= pagesCount) return;

    updateSearchQuery(searchParams, +pageNumber + 1);
  };

  const firstPage = () => {
    updateSearchQuery(searchParams, 1);
  };

  const lastPage = () => {
    updateSearchQuery(searchParams, pagesCount);
  };

  return (
    <div>
      <Pagination>
        <PaginationContent className="flex gap-6 items-center justify-center">
          {currentPage && +currentPage > 1 && (
            <PaginationItem
              onClick={firstPage}
              className="bg-darkSeaGreen/40 transition-colors hover:bg-darkSeaGreen/90 px-4 py-2 rounded-md cursor-pointer flex items-center"
            >
              First
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationPrevious
              onClick={prevPage}
              className="cursor-pointer flex items-center"
            />
          </PaginationItem>
          <p className="font-semibold">
            Page {currentPage} of {pagesCount}
          </p>
          <PaginationItem>
            <PaginationNext
              onClick={nextPage}
              className="cursor-pointer flex items-center"
            />
          </PaginationItem>
          {currentPage && +currentPage !== pagesCount && (
            <PaginationItem
              onClick={lastPage}
              className="bg-darkSeaGreen/40 transition-colors hover:bg-darkSeaGreen/90 px-4 py-2 rounded-md cursor-pointer flex items-center"
            >
              Last
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default BottomPagination;
