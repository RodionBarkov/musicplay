import { useEffect, useState } from "react";
import { API_BASE_URL, joinUrl } from '../api.tsx';


function TrackDetails(props) {

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


    return (
        <div className="desc">
                       {!selectedTrack && !selectedTrackId && <h3>Трек не выбран</h3>}
            {!selectedTrack && selectedTrackId && <h3>Загрузка</h3>}
            {selectedTrack && selectedTrackId && selectedTrack?.id !== selectedTrackId && <h3>Загрузка</h3>}

            {selectedTrack &&

                <div className="song-desc">
                    <h1>{selectedTrack.name}</h1>

                    <h4> {selectedTrack?.description} </h4>

                    <p>
                        {selectedTrack?.lyrics ?? 'У этой песни нет текста'}
                    </p>

                </div>
            }

        </div>
    )


}

export default TrackDetails