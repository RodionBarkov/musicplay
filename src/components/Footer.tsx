import ResetButton from './ResetButton.tsx'



function Footer(props) {

    const handleClickReset = () => { props.onTrackSelect?.(props.trackID) }

    return (
        <div className='footer'>
            <p className='footerPart'>Здесь будет подвал</p>


            <div className='footerPart'>
                <ResetButton key={props.trackID}
                    handleClickReset={handleClickReset}
                    trackId={props.trackId}
                    selectedTrack={props.selectedTrack} />
            </div>

            <div className='footerPart'>
            
            </div>

        </div>
    )


}

export default Footer