import { useEffect, useState } from "react";
import { API_BASE_URL, joinUrl } from '../api.tsx';
import ReactPlayer from 'react-player';

const FALLBACK_COVER = joinUrl(API_BASE_URL, "data/noimage.png")


function Player(props) {


    const [selectedTrack, setSelectedTrack] = useState<Track | null>(null)

    const selectedTrackId = props.trackId;









    useEffect(() => {
        if (!selectedTrackId) {
            setSelectedTrack(null)
            return;
        }
        fetch(joinUrl(API_BASE_URL, "tracks", selectedTrackId), {
            // headers: {
            //   'api-key': 'f505adfb-198d-4a0b-9393-d8b33245ba6f'
            // }
        }).then(res => res.json())
            .then(json => setSelectedTrack(json))
    }, [selectedTrackId])


    const [playing, setPlaying] = useState(true);
    const [played, setPlayed] = useState(0);


    const handlePlay = () => setPlaying(true);
    const handlePause = () => setPlaying(false);
    const handleProgress = (state) => setPlayed(state.played);

    return (
        <div className="player">

            {!selectedTrack && !selectedTrackId &&

                <h3> Трек не выбран</h3>

            }
            {!selectedTrack && selectedTrackId && <h3>Загрузка</h3>}
            {selectedTrack && selectedTrackId && selectedTrack?.id !== selectedTrackId && <h3>Загрузка</h3>}
            {selectedTrack &&

                <div className="player-div">
                    <img src={API_BASE_URL + '/' + selectedTrack.cover_url} onError={(event) => {
                        event.currentTarget.onerror = null
                        event.currentTarget.src = FALLBACK_COVER
                    }}
                        alt={selectedTrack.name} />
                    <div className="player-play">

                        <div style={{ marginTop: '10px' }}>
                            Прогресс: {Math.round(played * 100)}%
                        </div>

                        <button className="buttons-play">
                            <img src="./src/assets/playicons/undo.png" alt="" />
                        </button>
                        <button className="buttons-play" onClick={() => { setPlaying(!playing) }}>
                            {playing ? <img src="./src/assets/playicons/pause.png" alt="" /> : <img src="./src/assets/playicons/play.png" alt="" />}
                        </button>
                        <button className="buttons-play">
                            <img src="./src/assets/playicons/next.png" alt="" />
                        </button>


                    </div>
                    <ReactPlayer className="audio"
                        src={API_BASE_URL + '/' + selectedTrack.audio_url}
                        controls={true}
                        playing={playing}
                        width="300px"
                        height="40px"
                        onPlay={handlePlay}
                        onPause={handlePause}
                        onProgress={handleProgress}
                    />

                </div>

            }
        </div>
    )
}

export default Player