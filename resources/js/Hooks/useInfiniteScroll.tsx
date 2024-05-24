import { useEffect, useRef, useState } from "react";

const useInfiniteScroll = () => {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const [fetch, setFetch] = useState(true);
    const endRef = useRef<HTMLDivElement>(null);

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

    if (isIntersecting) {
        console.log('Intersecting')
    }
    else {
        console.log('fNot intersecting')
    }

    return { isIntersecting, fetch, setFetch, endRef }

}

export default useInfiniteScroll;
