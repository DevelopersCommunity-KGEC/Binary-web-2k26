import React, { useEffect, useState } from 'react'

export const useMediaQuery = (query: string) => {
    const [matches, setMatches] = useState(false)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const media = window.matchMedia(query)
            const updateMatch = () => setMatches(media.matches)

            // Set initial value
            updateMatch()

            // Listen for changes
            media.addEventListener('change', updateMatch)

            // Clean up
            return () => {
                media.removeEventListener('change', updateMatch)
            }
        }

        return undefined
    }, [query])

    return matches
}