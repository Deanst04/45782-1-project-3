import { useEffect, useState } from "react";
import type Vacation from "../models/vacation";


export default function usePagination(vacations: Vacation[], vacPerPage: number) {
    
    const [page, setPage] = useState<number>(1)

    const startIndex = (page - 1) * vacPerPage
    const endIndex = startIndex + vacPerPage
    const vacationToShow = vacations.slice(startIndex, endIndex)
    const totalPages = Math.ceil(vacations.length / vacPerPage)

    useEffect(() => {
        if(page > totalPages && totalPages > 0) {
            setPage(totalPages)
        }
    }, [vacations.length, page, totalPages])

    
    return {
        page,
        setPage,
        vacationToShow,
        totalPages
    }
}