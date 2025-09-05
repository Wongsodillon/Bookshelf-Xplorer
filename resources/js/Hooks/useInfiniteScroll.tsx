import { useEffect, useRef, useState, createRef } from "react";

const useInfiniteScroll = () => {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const [fetch, setFetch] = useState(true);
    const endRef = createRef<HTMLDivElement>();

    useEffect(() => {
        const observer = new IntersectionObserver(entry => {
            setIsIntersecting(entry[0].isIntersecting)
        })

        if (endRef.current) {
            observer.observe(endRef.current)
        }

        return () => {
            if (endRef.current) {
                observer.unobserve(endRef.current)
            }
        }
    }, [])

    return { isIntersecting, fetch, setFetch, endRef }
}

export default useInfiniteScroll;
