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
    let currentHeight = 0;

    children.forEach((child, index) => {
      const childHeight = (child as HTMLElement).offsetHeight;
      const element = content[index];

      // Check if the next content will overflow the current page
      if (currentHeight + childHeight > pageHeight) {
        // Add the current page content to the page array
        pagesArray.push(currentPageContent);
        currentPageContent = [element];
        currentHeight = childHeight;
      } else {
        currentPageContent.push(element);
        currentHeight += childHeight;
      }
    });

    // Push the last set of content to the pages
    if (currentPageContent.length > 0) {
      pagesArray.push(currentPageContent);
    }

    setPages(pagesArray);
    setTotalPages(pagesArray.length);
    setCurrentPage(1); // Always start from page 1 when content is updated
  }, [content, pageHeight]);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
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
