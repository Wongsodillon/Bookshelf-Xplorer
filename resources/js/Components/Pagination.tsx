
type PaginationProps = {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    prevPage: () => void;
    nextPage: () => void;
}

const Pagination = ({ currentPage, itemsPerPage, totalItems, prevPage, nextPage }: PaginationProps) => {
    return (
        <div className="sm:mt-8 mt-4 flex flex-col-reverse gap-4 sm:flex-row items-center justify-between">
            <p className="text-lg">
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
            </p>
            <div className="flex justify-center gap-8">
                <button onClick={prevPage} className="px-8 h-12 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700">
                    Previous
                </button>
                <button onClick={nextPage} className="px-10 h-12 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700">
                    Next
                </button>
            </div>
        </div>
    );
}

export default Pagination;
