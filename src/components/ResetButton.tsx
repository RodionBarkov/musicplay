
function ResetButton(props) {


    const handleClickReset = () => { props.onTrackSelect?.(null) }

    return (
        <>
           
                <button className="button-reset" onClick={handleClickReset}>
                    Сбросить активный трек
                </button>

        </>
    )
}

export default ResetButton