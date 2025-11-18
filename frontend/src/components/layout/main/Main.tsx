import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "../not-found/NotFound";
import Signup from "../../auth/signup/Signup";

export default function Main() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/Profile" />} />
            <Route path="/signup" element={<Signup />} />
            {/* <Route path="/profile/edit/:id" element={<EditPost />} />
            <Route path="/feed" element={<Feed />} /> */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}
