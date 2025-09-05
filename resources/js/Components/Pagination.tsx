import SecondaryButton from "./UI/SecondaryButton";

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
            <div className="flex justify-center gap-6">
                <SecondaryButton onClick={prevPage} className="px-8 h-12 text-white font-medium rounded-lg">
                    Previous
                </SecondaryButton>
                <SecondaryButton onClick={nextPage} className="px-10 h-12 text-white font-medium rounded-lg">
                    Next
                </SecondaryButton>
            </div>
        </div>
    );
}

export default Pagination;
