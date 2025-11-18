import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "../not-found/NotFound";
import useRole from "../../../hooks/use-role";
import UserPage from "../../vacations/user-page/UserPage";
import AdminPage from "../../vacations/admin-page/AdminPage";
import Signup from "../../auth/signup/Signup";

export default function Main() {

    const role = useRole()

    return (
        <Routes>

            {/* redirection to admin or user page based on their role */}

                <Route path="/" element={
                    role === "admin" ? 
                    <Navigate to="/admin" /> :
                    <Navigate to="/user" />
                } />

                {/* redirect to the user vacation page */}
                <Route path="/user" element={<UserPage />} />

                {/* redirect to the admin vacation page */}
                <Route path="/admin" element={<AdminPage />} />

                {/* redirect to signup page */}
                <Route path="/signup" element={<Signup />} />

                {/* 404 */}
                <Route path="*" element={<NotFound />} />     

        </Routes>
    )

}
