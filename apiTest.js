function getRandomWord() {
    fetch("https://random-word-api.herokuapp.com/word?length=5")
    .then(res => res.json())
    .then(res => {
        console.log(res[0])
        checkWord(res[0])
    })
}

function checkWord(word) {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(res => res.json())
    .then(res => console.log(Array.isArray(res)))
}

getRandomWord()