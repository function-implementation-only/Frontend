import { useState } from 'react'

function useModal() {
    const [isShowing, setIsShowing] = useState(false)

    function handleShowing() {
        setIsShowing(!isShowing)
    }

    return { isShowing, handleShowing, setIsShowing }
}

export default useModal
