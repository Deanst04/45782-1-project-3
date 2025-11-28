import Pagination from '@mui/material/Pagination'
import './VacationsPagination.css'

interface PaginationProps {
    page: number,
    setPage: (page: number) => void
    totalPages: number
    setAnimState: (anim: "fade-in" | "fade-out") => void
}

export default function VacationsPagination(props: PaginationProps) {

    const {
        page,
        setPage,
        totalPages,
        setAnimState
    } = props


    return (
        <div className='VacationsPagination'>
                <Pagination 
                    count={totalPages}
                    page={page}
                    onChange={(_, value) => {
                        setAnimState("fade-out")

                        setTimeout(() => {
                            setPage(value);
                            setAnimState("fade-in");
                        }, 200);  // 200ms fade-out then update
                    }}
                    color="primary"
                    size="large"
                    variant="outlined"
                    shape="rounded"
                />
        </div>
    )
}