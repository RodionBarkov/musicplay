import { useEffect, useState } from "react";
import { API_BASE_URL, joinUrl } from '../api.tsx';
import TrackDelete from './TrackDelete.tsx';
import TrackEdit from './TrackEdit.tsx'


function TrackDetails(props) {

    const [selectedTrack, setSelectedTrack] = useState<Track | null>(null)
    const selectedTrackId = props.trackId;

    useEffect(() => {
        if (!selectedTrackId) {
            setSelectedTrack(null)
            return;
        }
        fetch(joinUrl(API_BASE_URL, "tracks", selectedTrackId), {
        }).then(res => res.json())
            .then(json => { setSelectedTrack(json); props.onSelectedTrack(json); })
    }, [selectedTrackId])

    return (
        <div className="desc">
            {!selectedTrack && !selectedTrackId && <h3>Трек не выбран</h3>}
            {!selectedTrack && selectedTrackId && <h3>Загрузка</h3>}
            {selectedTrack && selectedTrackId && selectedTrack?.id !== selectedTrackId && <h3>Загрузка</h3>}

            {selectedTrack &&
                <div className="descDiv">
                    <div className="song-desc">
                        <h1>{selectedTrack.name}</h1>

                        <h4> {selectedTrack?.description} </h4>

                        <p>
                            {selectedTrack?.lyrics ?? 'У этой песни нет текста'}
                        </p>

                        <p>
                            Я разрешаю сегодня себе раскиснуть,<br />
                            Снег почернел за окном и украден закат.<br />
                            С леди – бессонницей снова придётся зависнуть,<br />
                            С ней воскрешая моменты крутить циферблат...<br />
                            <br />
                            У каждой жизни свой узор дорог,<br />
                            Плетётся то в ковёр, то в полотенце,<br />
                            Любым по яркости он может быть, но вот итог:<br />
                            В сухом остатке, лишь рубцы на сердце...<br />
                            <br />
                            Шум новостей я давно уже вынес за скобки,<br />
                            Всё очевидно…, и ясно как божий день...<br />
                            Завтра опять тот же кадр: дороги и пробки,<br />
                            Завтра опять та же миссия: тень на плетень...<br />
                            <br />
                            У каждой жизни свой узор дорог,<br />
                            Плетётся то в ковёр, то в полотенце,<br />
                            Любым по яркости он может быть, но вот итог:<br />
                            В сухом остатке, лишь рубцы на сердце...<br />
                            <br />
                            Вот опять почувствовал я тонкий аромат,<br />
                            Привкус прошлой жизни… дежавю...<br />
                            Как бальзам на сердце, как незримый шоколад,<br />
                            На мгновенье подсластил судьбу...<br />
                            <br />
                            У каждой жизни свой узор дорог,<br />
                            Плетётся то в ковёр, то в полотенце,<br />
                            Любым по яркости он может быть, но вот итог:<br />
                            В сухом остатке, лишь рубцы на сердце...<br />
                        </p>

                    </div>

                    <div className="buttonsDiv">
                        <TrackEdit
                            key={props.trackID}
                            selectedTrack={props.selectedTrack}
                            trackId={props.trackId}
                            onDeletedTrack={props.onDeletedTrack}
                        />


                        <TrackDelete
                            trackId={props.trackId}
                            selectedTrack={props.selectedTrack}
                            onDeletedTrack={props.onDeletedTrack}
                        />



                    </div>

                </div>
            }

        </div>
    )


}

export default TrackDetails