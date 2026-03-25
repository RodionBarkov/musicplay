import { API_BASE_URL, joinUrl } from '../api.tsx';
const FALLBACK_COVER = joinUrl(API_BASE_URL, "data/noimage.png")


function TrackItem(props) {


    return (
        <>

            <div key={props.track.id} onClick={props.handleClick} className={props.isSelected ? "song active" : "song"}>
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
                <div className="songtitle">
                    <h4>Сны и кофе</h4>
                    <h3>{props.track.name}</h3>
                </div>


                
            </div>

        </>
    )
}

export default TrackItem