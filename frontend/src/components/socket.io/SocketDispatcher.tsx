import { useEffect, useState, type PropsWithChildren } from "react";
import { io } from "socket.io-client";
import type Vacation from "../../models/vacation";
import { useAppDispatcher } from "../../redux/hooks";
import useUserId from "../../hooks/use-user-id";
import { v4 } from "uuid";
import SocketDispatcherContext from "./SocketDispatcherContext";
import SocketMessages from "socket-enums-deanst-vacations"
import { addVacation, likeVacation, unlikeVacation } from "../../redux/vacation-slice";
import { decreaseFollowersCount, increaseFollowersCount } from "../../redux/graph-slice";

export default function SocketDispatcher(props: PropsWithChildren) {

    const dispatch = useAppDispatcher()
    const userId = useUserId()

    const [clientId] = useState<string>(v4())

    useEffect(() => {
        const socket = io(`${import.meta.env.VITE_IO_SERVER_URL}`)
        socket.onAny((eventName: string, payload) => {

            console.log('io message', eventName, payload)

            if (payload.from === clientId) return;
            switch (eventName) {
                case SocketMessages.NewVacation:
                    if(payload.vacation as Vacation) {
                        dispatch(addVacation(payload.vacation as Vacation))
                    }
                    break;
                case SocketMessages.VacationLiked:
                    dispatch(likeVacation({ vacationId: payload.vacationId, isSelf: payload.userId === userId }))
                    dispatch(increaseFollowersCount(payload.vacationId))
                    break;
                case SocketMessages.VacationUnliked:
                    dispatch(unlikeVacation({ vacationId: payload.vacationId, isSelf: payload.userId === userId }))
                    dispatch(decreaseFollowersCount(payload.vacationId))
                    break;
            }
        })

        return () => { socket.disconnect() }
    }, [dispatch, userId])



    const { children } = props

    return (
        <SocketDispatcherContext.Provider value={{ clientId }}>
            {children}
        </SocketDispatcherContext.Provider>
    )
}