import { useEffect, useState } from "react"
import { API_BASE_URL, joinUrl } from '../api.tsx';




function TrackDelete(props) {

    const [seeWindow, setSeeWindow] = useState(false)

    const handleClickDelete = () => {
        setSeeWindow(!seeWindow);
    }

    // Удаление трека

    const [deletedTrack, setDeletedTrack] = useState(false)

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
                handleClickDelete()
            }
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };

    const trackId = (props.trackId)

    return (
        <>
            <div className={!seeWindow ? 'editWindow' : 'editWindowActive'}>

                <h3>Удалить трек?</h3>

                <div className="editPart">
                    <button id="buttonDelete" className="button-reset" onClick={() => deleteTrack(trackId)}>Удалить</button>

                    <button className="button-reset" onClick={handleClickDelete}>Отмена</button>
                </div>

            </div>


            <button id="buttonDelete" className="button-reset" onClick={handleClickDelete}>Удалить</button>

        </>
    )
}

export default TrackDelete