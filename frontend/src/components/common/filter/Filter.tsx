import './Filter.css'
import { FormControl, InputLabel, Select, MenuItem, type SelectChangeEvent } from '@mui/material';

export type FilterType = "all" | "followed" | "upcoming" | "active"

interface FilterProps {
    value: FilterType,
    onChange: (filter: FilterType) => void
}

export default function Filter({ value, onChange }: FilterProps) {

    const handleChange = (event: SelectChangeEvent) => {
        onChange(event.target.value as FilterType)
    }

    return (
        <div className='Filter'>
            <FormControl fullWidth variant="filled" size="small">
                <InputLabel>Filter</InputLabel>

                <Select
                    value={value}
                    onChange={handleChange}
                >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="followed">Followed</MenuItem>
                <MenuItem value="upcoming">Upcoming</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                </Select>
            </FormControl>
        </div>
    )

}