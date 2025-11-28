import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "../../errors/not-found/NotFound";
import useRole from "../../../hooks/use-role";
import UserPage from "../../vacations/user-page/UserPage";
import AdminPage from "../../vacations/admin-page/AdminPage";
import Signup from "../../auth/signup/Signup";
import New from "../../vacations/new/New";
import Edit from "../../vacations/edit/Edit";
import Graph from "../../vacations/admin-page/graph/Graph";
import Login from "../../auth/login/Login";
import ProtectedRoute from "../../guard/ProtectedRoute";
import NotAllowed from "../../errors/not-allowed/NotAllowed";

export default function Main() {

    const role = useRole()

    return (
        <Routes>

            {/* redirection to admin or user page based on their role */}

                <Route path="" element={
                    <ProtectedRoute allowedRoles={['admin', 'user']}>
                    {role === "admin" ? 
                    <Navigate to="/admin" /> :
                    <Navigate to="/user" />}
                    </ProtectedRoute>
                } />

                {/* redirect to the user vacation page */}
                <Route path="/user" element={
                    <ProtectedRoute allowedRoles={['user']}>
                        <UserPage />
                    </ProtectedRoute>
                } />

                {/* redirect to the admin vacation page */}
                <Route path="/admin" element={
                    <ProtectedRoute allowedRoles={['admin']}>
                        <AdminPage />
                    </ProtectedRoute>
                } />

                {/* redirect to the add vacation page */}
                <Route path="/admin/add-vacation" element={
                    <ProtectedRoute allowedRoles={['admin']}>
                        <New />
                    </ProtectedRoute>
                } />

                {/* redirect to the edit vacation page */}
                <Route path="/admin/edit/:id" element={
                    <ProtectedRoute allowedRoles={['admin']}>
                        <Edit />
                    </ProtectedRoute>
                } />

                {/* redirect to the graph page */}
                <Route path="/admin/graph" element={
                    <ProtectedRoute allowedRoles={['admin']}>
                        <Graph />
                    </ProtectedRoute>
                } />

                {/* redirect to login page */}
                <Route path="/login" element={<Login />} />

                {/* redirect to signup page */}
                <Route path="/signup" element={<Signup />} />

                {/* not allowed */}
                <Route path="/not-allowed" element={<NotAllowed />} />

                {/* 404 */}
                <Route path="*" element={<NotFound />} />

        </Routes>
    )

}
