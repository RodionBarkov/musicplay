import ResetButton from './ResetButton.tsx'


function Footer(props) {

    const handleClickReset = () => { props.onTrackSelect?.(props.trackID) }

    return (
        <div className='footer'>
            <p>Здесь будет подвал</p>


            <div>
                <ResetButton key={props.trackID}
                    handleClickReset={handleClickReset} />
            </div>
        </div>
    )


}

export default Footer