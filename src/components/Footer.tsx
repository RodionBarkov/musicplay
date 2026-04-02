import ResetButton from './ResetButton.tsx'
import TrackEdit from './TrackEdit.tsx'


function Footer(props) {

    const handleClickReset = () => { props.onTrackSelect?.(props.trackID) }

    return (
        <div className='footer'>
            <p className='footerPart'>Здесь будет подвал</p>


            <div className='footerPart'>
                <ResetButton key={props.trackID}
                    handleClickReset={handleClickReset} />
            </div>

            <div className='footerPart'>
                <TrackEdit
                    key={props.trackID}
                    selectedTrack={props.selectedTrack}
                    trackId={props.trackId}
                    onDeletedTrack={props.onDeletedTrack}
                />
            </div>

        </div>
    )


}

export default Footer