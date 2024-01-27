const Overlay = props => {
    const {component, setDisplay} = props

    return(
        <div className="flex place-content-center items-center z-20 fixed top-0 left-0">
            {component}
            <div 
            className="bg-black opacity-50 w-screen h-screen hover:cursor-pointer"
            onClick={() => {
                    try {
                        setDisplay(false)
                    } catch (error) {
                        setDisplay()
                    }
                }}
            >
            </div>
        </div>
    )
}

export default Overlay