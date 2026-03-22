import { API_BASE_URL, joinUrl } from '../api.tsx';
const FALLBACK_COVER = joinUrl(API_BASE_URL, "data/noimage.png")


function TrackItem(props) {


    return (
        <>

            <div key={props.track.id} onClick={props.handleClick} className={props.isSelected ? "song active" : "song"}>



                <h3 className="songtitle">{props.track.name}</h3>
                <img
                    className="cover"
                    src={props.track.cover_url ? joinUrl(API_BASE_URL, props.track.cover_url) : FALLBACK_COVER}
                    onError={(event) => {
                        event.currentTarget.onerror = null
                        event.currentTarget.src = FALLBACK_COVER
                    }}
                    alt={props.track.name}
                    width="100%"
                />
                <audio className="audio" src={joinUrl(API_BASE_URL, props.track.audio_url)} controls></audio>
            </div>

        </>
    )
}

export default TrackItem