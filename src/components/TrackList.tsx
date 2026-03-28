import { useEffect, useState } from "react";

import TrackItem from "./TrackItem.tsx";





function TrackList(props) {

    const [tracks, setTracks] = useState<Track[] | null>(null)

    useEffect(() => {
        fetch(props.joinUrl(props.API_BASE_URL, "tracks"), {
        }).then(res => res.json())
            .then(json => {setTracks(json); props.onTracks(json);}) 
    }, [])


    type Track = {
        id: number
        name: string
        description?: string | null
        cover_url?: string | null
        audio_url: string
        lyrics?: string | null
    }

    if (tracks === null) {
        return <h3>Загрузка...</h3>
    }

    if (tracks.length === 0) {
        return <h3>Нет доступных треков</h3>
    }

    return (
        <>
            <div className="tracks">

                {tracks.map((track) => {
                    
                    const handleClick = () => { props.onTrackSelect?.(track.id) }


                    return (
                        <TrackItem key={track.id}
                            track={track}
                            isSelected={track.id === props.selectedTrackId}
                            selectedTrackId={props.selectedTrackId}
                            handleClick={handleClick}
                            FALLBACK_COVER={props.FALLBACK_COVER}
                            API_BASE_URL={props.API_BASE_URL}
                            joinUrl={props.joinUrl}
                        />

                    )
                })}

            </div>

        </>
    )
}

export default TrackList