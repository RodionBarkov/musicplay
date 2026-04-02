
function TrackItem(props) {


    


    return (
        <>

            <div key={props.track.id} onClick={props.handleClick} className={props.isSelected ? "song active" : "song"}>
                <img
                    className="cover"
                    src={props.track.cover_url ? props.joinUrl(props.API_BASE_URL, props.track.cover_url) : props.FALLBACK_COVER}
                    onError={(event) => {
                        event.currentTarget.onerror = null
                        event.currentTarget.src = props.FALLBACK_COVER
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