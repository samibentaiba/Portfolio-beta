import { useState, useRef, useEffect } from "react";
import type { ReactElement } from "react";

interface UsePaginationProps {
  content: ReactElement[];
  pageHeight: number;
}

export function useResumePagination({ content, pageHeight }: UsePaginationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState<ReactElement[][]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!measureRef.current) return;

    const children = Array.from(measureRef.current.children);
    const pagesArray: ReactElement[][] = [];
    let currentPageContent: ReactElement[] = [];

    let pageTop = 0;
    let pageBottom = pageHeight;

    children.forEach((child, index) => {
      const rect = (child as HTMLElement).getBoundingClientRect();
      const elementTop = rect.top;
      const elementHeight = rect.height;

      const relativeTop = elementTop - (measureRef.current as HTMLDivElement).getBoundingClientRect().top;

      if (relativeTop + elementHeight > pageBottom) {
        // Content overflows the page
        pagesArray.push(currentPageContent);
        currentPageContent = [content[index]];
        pageTop = relativeTop;
        pageBottom = pageTop + pageHeight;
      } else {
        currentPageContent.push(content[index]);
      }
    });

    if (currentPageContent.length > 0) {
      pagesArray.push(currentPageContent);
    }

    setPages(pagesArray);
    setTotalPages(pagesArray.length);
    setCurrentPage(1);
  }, [content, pageHeight]);

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return {
    containerRef,
    measureRef,
    currentPage,
    setCurrentPage,
    totalPages,
    currentPageContent: pages[currentPage - 1] || [],
    goToNextPage,
    goToPrevPage,
  };
}
