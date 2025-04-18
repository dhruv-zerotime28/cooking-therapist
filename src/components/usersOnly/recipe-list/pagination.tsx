'use client';

import React, { useEffect, useState } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationLink,
} from '@/components/ui/pagination';

interface IPageProps {
  totalCount: number;
  setPageNum: (num: number) => void;
  currentPage: number;
}
export const RecipePagination = ({
  totalCount,
  setPageNum,
  currentPage,
}: IPageProps) => {
  const [totalPages, setTotalPages] = useState<number>();

  useEffect(() => {
    const calcPages = Math.ceil(totalCount / 15);
    setTotalPages(calcPages);
  },[totalCount]);
  
  if(!totalCount) return ;

  return (
    <div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setPageNum(currentPage - 1)}
              aria-disabled={currentPage <= 1}
              tabIndex={currentPage <= 1 ? -1 : undefined}
              className={
                currentPage <= 1 ? 'pointer-events-none opacity-50' : undefined
              }
            />
          </PaginationItem>
          {currentPage && (
            <PaginationItem>
              <PaginationLink isActive={true}>{currentPage}</PaginationLink>
            </PaginationItem>
          )}
          {totalPages && currentPage && totalPages >= currentPage + 1 && (
            <PaginationItem>
              <PaginationLink onClick={() => setPageNum(currentPage + 1)}>
                {currentPage + 1}
              </PaginationLink>
            </PaginationItem>
          )}
          {totalPages && currentPage && totalPages >= currentPage + 2 && (
            <PaginationItem>
              <PaginationLink onClick={() => setPageNum(currentPage + 2)}>
                {currentPage + 2}
              </PaginationLink>
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={() => setPageNum(currentPage + 1)}
              aria-disabled={currentPage === totalPages}
              tabIndex={currentPage <= 1 ? -1 : undefined}
              className={
                currentPage === totalPages ? 'pointer-events-none opacity-50' : undefined
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
