import { useContext, useMemo } from "react"
import AuthContext from "../components/auth/auth/AuthContext"
import { jwtDecode } from "jwt-decode"

export default function useRole() {
    
    const authContext = useContext(AuthContext)

    const role = useMemo(() => {

        if(!authContext?.jwt) return null

        const { role } = jwtDecode<{ role: "user" | "admin" }>(authContext!.jwt)
        return role
    }, [authContext])

    console.log(role)

    return role

}