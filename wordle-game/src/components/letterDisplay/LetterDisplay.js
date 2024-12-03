import './letterDisplay.css'

function LetterDisplay(props) {
    const {letter, color} = props

    return (
        <div className={`letterDisplay ${color ? color : "active"}`}>
            {letter}
        </div>
    )
}

export default LetterDisplay