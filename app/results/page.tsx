"use client";

import Header from "@/components/Header";
import ListingListComponent from "@/components/ListingListComponent";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react"

export default function () {

    const [data, setData] = useState([]);
    const router = useRouter();
    const searchParams = useSearchParams();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Adjust as needed

    useEffect(() => {
        const searchQuery = searchParams.get("query");

        if (!searchQuery) {
            router.push("/")
            return
        }

        const storedResult = sessionStorage.getItem("searchResults");
        if (storedResult) {
            setData(JSON.parse(storedResult))
        } else {
            router.push("/")
        }

    }, [searchParams])

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    return (
        <div>
            <Header />
            <h5 className="flex justify-center text-2xl font-bold mt-5 underline"> Showing search results</h5 >
            <ListingListComponent listing={paginatedData} />

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center space-x-4 mt-4">
                    {/* Previous Button */}
                    {currentPage > 1 && (
                        <button
                            onClick={() => setCurrentPage((prev) => prev - 1)}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                        >
                            Previous
                        </button>
                    )}

                    {/* Page Indicator */}
                    <span className="px-4 py-2 border rounded">{`Page ${currentPage} of ${totalPages}`}</span>

                    {/* Next Button */}
                    {currentPage < totalPages && (
                        <button
                            onClick={() => setCurrentPage((prev) => prev + 1)}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                        >
                            Next
                        </button>
                    )}
                </div>
            )}

        </div>



    )
}