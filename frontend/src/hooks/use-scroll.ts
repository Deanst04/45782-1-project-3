import { useEffect, useRef } from 'react'

export default function useScroll() {

    const topRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (topRef.current) {
            topRef.current.scrollIntoView({ behavior: "instant", block: "start" })
        }
    }, [])

    return topRef

}