import { useContext } from "react"
import AuthContext from "../components/auth/auth/AuthContext"
import type AuthAware from "../services/auth-aware/AuthAware"
// import SocketDispatcherContext from "../components/socket.io/SocketDispatcherContext"

// dont forget to return the clientId: string into the service

export default function useService<T extends AuthAware>(Service: { new(jwt: string): T }): T {
    const authContext = useContext(AuthContext)
    // const socketDispatcherContext = useContext(SocketDispatcherContext)

    // dont forget to return the , socketDispatcherContext!.clientId into the new service

    const service = new Service(authContext!.jwt)

    return service
}