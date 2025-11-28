import type { ReactNode } from "react";
import useRole from "../../hooks/use-role";
import { Navigate } from "react-router-dom";


interface ProtectedRouteProps {
    children: ReactNode,
    allowedRoles: ("admin" | "user")[]
}

export default function ProtectedRoute({children, allowedRoles}: ProtectedRouteProps) {

    const role = useRole()

    if(role === null) return null

    if(!role) return <Navigate to="/login" />

    if(!allowedRoles.includes(role)) return <Navigate to="/not-allowed" replace />

    return children

}