import { useState, useEffect } from "react";

interface IPagination<T> {
    items: T[];
    itemsPerPage: number;
}

const usePaginate = <T>({ itemsPerPage, items }: IPagination<T>) => {

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
        }
    }

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
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
        if (currentPage > maxPage) {
            setCurrentPage(1);
        } else {
            updateItemsToShow();
        }
    }, [currentPage, maxPage]);

    return { currentPage, maxPage, nextPage, prevPage, itemsToShow, itemsPerPage };
}

export default usePaginate;
