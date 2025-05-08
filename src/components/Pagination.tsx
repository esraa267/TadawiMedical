import { forwardRef, useEffect, useImperativeHandle } from "react";
import { MedicalData } from "../app/core/entities/MedicalData";

const Pagination = forwardRef(({ totalItems, pageSize, timeInterval, currentPage, onPageChange }: { totalItems: MedicalData, pageSize: number, timeInterval: number, currentPage: number, onPageChange: any }, ref) => {
    const totalPages = Math.ceil(totalItems.length / pageSize);
    const maxVisiblePages = 3;

    const currentGroup = Math.floor((currentPage - 1) / maxVisiblePages);
    const startPage = currentGroup * maxVisiblePages + 1;
    const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    useImperativeHandle(ref, () => ({
        getCurrentPage: () => currentPage,
    }));

    useEffect(() => {
        const interval = setInterval(() => {
            const nextPage = currentPage < totalPages ? currentPage + 1 : 1;
            onPageChange(nextPage);
        }, timeInterval);

        return () => clearInterval(interval);
    }, [currentPage, totalPages, timeInterval, onPageChange]);

    return (
        <div className="d-flex gap-2 justify-content-center mt-3">
            <button
                onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                className="px-3 py-1 border rounded"
                disabled={currentPage === 1}
            >
                Previous
            </button>

            {pageNumbers.map(p => (
                <button
                    key={p}
                    onClick={() => onPageChange(p)}
                    className={`px-3 py-1 border rounded ${p === currentPage ? "bg-primary text-white" : "bg-light"}`}
                >
                    {p}
                </button>
            ))}

            <button
                onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                className="px-3 py-1 border rounded"
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
});

export default Pagination;