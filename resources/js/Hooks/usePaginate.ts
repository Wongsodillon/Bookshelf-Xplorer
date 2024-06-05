import { useState, useEffect } from "react";

interface IPagination<T> {
    items: T[];
    itemsPerPage: number;
    scrollToTop?: number;
    restartPage?: boolean;
}

const usePaginate = <T>({ itemsPerPage, items, scrollToTop = window.scrollY, restartPage = true }: IPagination<T>) => {

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [maxPage, setMaxPage] = useState<number>(Math.ceil(items.length / itemsPerPage));
    const [itemsToShow, setItemsToShow] = useState<T[]>([]);

    const updateItemsToShow = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, items.length);
        setItemsToShow(items.slice(startIndex, endIndex));
    };

    const nextPage = () => {
        if (currentPage < maxPage) {
            setCurrentPage(currentPage + 1);
            window.scrollTo(0, scrollToTop)
        }
    }

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            window.scrollTo(0, scrollToTop)
        }
    }

    useEffect(() => {
        setMaxPage(Math.ceil(items.length / itemsPerPage));
        updateItemsToShow();
    }, []);

    useEffect(() => {
        updateItemsToShow();
    }, [currentPage, items]);

    useEffect(() => {
        setCurrentPage(restartPage ? 1 : currentPage);
    }, [items])

    useEffect(() => {
        if (currentPage > maxPage) {
            setCurrentPage(1);
        } else {
            updateItemsToShow();
        }
    }, [currentPage, maxPage]);

    return { currentPage, maxPage, nextPage, prevPage, itemsToShow, itemsPerPage };
}

export default usePaginate;
