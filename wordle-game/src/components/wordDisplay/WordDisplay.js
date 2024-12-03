import LetterDisplay from "../letterDisplay/LetterDisplay"

import './wordDisplay.css'

function WordDisplay(props) {
    const {word} = props

    const letterEls = word.map(letter => (
        <LetterDisplay letter={letter} />
    ))

    return(
        <div className="wordDisplay"> 
            {letterEls}
        </div>
    )
}

export default WordDisplay