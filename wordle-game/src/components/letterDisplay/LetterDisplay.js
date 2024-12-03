import './letterDisplay.css'

function LetterDisplay(props) {
    const {letter} = props

    return (
        <div className="letterDisplay">
            {letter}
        </div>
    )
}

export default LetterDisplay