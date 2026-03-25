
function ResetButton(props) {



    return (
        <>
           
                <button className="button-reset" onClick={props.handleClickReset}>
                    Сбросить активный трек
                </button>

        </>
    )
}

export default ResetButton