import { useEffect, useState } from "react"
import { API_BASE_URL, joinUrl } from '../api.tsx';


function TrackEdit(props) {


    const [seeWindow, setSeeWindow] = useState(false)
    const [track, setTrack] = useState(props.selectedTrack)

    const handleClickEdit = () => {
        setSeeWindow(!seeWindow);
    }

    useEffect(() => {
        setTrack(props.selectedTrack);
    })

    const trackId = (props.trackId)



    // Удаление трека

    const [deletedTrack, setDeletedTrack] = useState (false)

    const deleteTrack = async (trackId) => {
        try {
            const urlDelete = `${API_BASE_URL}/tracks/${trackId}`
            const response = await fetch(urlDelete, {
                method: 'DELETE',
                headers: {
                    'accept': 'application/json',
                }
            });

            if (response.ok) {
                props.onDeletedTrack(trackId);
                const isDeleted = () => {
                    setDeletedTrack(!deletedTrack)
                }
            }
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };





    return (
        <div className="editDiv">


            <div className={!seeWindow ? 'editWindow' : 'editWindowActive'}>


                {(trackId === undefined) || (track === null) ? <h3>Трек не выбран</h3> :

                    <div>
                        <div className="editPart" >
                            <input className="editInput" type="text" value={track.name || ''} />
                        </div>
                        <div className="editPart">
                            <input className="editInput" type="text" value={track.description} />
                        </div>
                        <div className="editPart">
                            <textarea className="editInput" name="" id="" value={track.lyrics}></textarea>
                        </div>
                        <div className="editPart">
                            <p>Обложка трека</p>
                            <input className="editInput" type="file" />
                        </div>
                        <div className="editPart"><p>Трек mp3</p>
                            <input className="editInput" type="file" />
                        </div>

                        <div className="editPart editPartButton">
                            <button className="button-reset">Изменить</button>
                            <button className="button-reset" onClick={() => deleteTrack(trackId)}>Удалить</button>
                        </div>

                    </div>
                }

            </div>


            <div className="editButton">
                <button className="button-reset" onClick={handleClickEdit}>
                    Редактировать трек
                </button>
            </div>







        </div>
    )

}

export default TrackEdit