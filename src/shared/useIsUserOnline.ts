import { useState, useEffect } from "react"

export const useIsUserOnline = (): boolean => {
    const [isOnline, setIsOnline] = useState(true);

    useEffect(()=> {
        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);
        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        }
    },[])

    function handleOnline() {
        setIsOnline(true)
    }

    function handleOffline() {
        setIsOnline(false)
    }

    

    return isOnline
}