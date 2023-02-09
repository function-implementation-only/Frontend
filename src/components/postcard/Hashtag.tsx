import React from 'react'

interface HashtagProps {
    place: string
    duration: string
}

function Hashtag({ place, duration }: HashtagProps) {
    return <div>{`#${place} #${duration}`}</div>
}

export default Hashtag
