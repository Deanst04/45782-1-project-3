import './Spinner.css'
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export default function Spinner() {
    return (
        <div className="Spinner">
            <Box className="spinner-box">
                <CircularProgress 
                    size={70} 
                    thickness={4}
                    sx={{
                        color: '#667eea',
                        '& .MuiCircularProgress-circle': {
                            strokeLinecap: 'round',
                        }
                    }}
                />
                <div className="loading-text">
                    Loading
                    <span className="dots">
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </span>
                </div>
            </Box>
        </div>
    );
}