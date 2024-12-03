import LetterDisplay from "../letterDisplay/LetterDisplay"

import './wordDisplay.css'

function WordDisplay(props) {
    const {word, colors} = props

    const letterEls = word.map((letter, i) => (
        <LetterDisplay 
            letter={letter}
            {...(colors ? {color: colors[i]} : {})}
        />
        
    ))

    return(
        <div className="wordDisplay"> 
            {letterEls}
        </div>
    )
}

export default WordDisplay