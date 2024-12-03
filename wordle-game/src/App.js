import {useCallback, useEffect, useState} from 'react';

import WordDisplay from './components/wordDisplay/WordDisplay';
import ALPHABET from './util/alphabet.js'

import './App.css';

function App() {
  const [apiWord, setApiWord] = useState(null)
  const [currentWord, setCurrentWord] = useState(["", "", "", "", ""])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [prevWordsArr, setPrevWordsArr] =  useState([])
  const [gameIsOver, setGameIsOver] = useState(false)

  function resetWord() {

      setPrevWordsArr(prev => [...prev, <WordDisplay word={currentWord} colors={getColors(currentWord)}/>])
      setCurrentWord(["", "", "", "", ""])
      setCurrentIndex(0)

    if (currentWord.join("").toLowerCase() === apiWord) {
      setGameIsOver(true)
    }
  }

  function getColors(word) {
    const apiWordArr = apiWord.split("")

    const collorArr = currentWord.map((letter, i) =>(
      letter.toLowerCase() === apiWordArr[i] ? "green" :
      apiWordArr.includes(letter.toLowerCase()) ? "yellow" :
      "gray"
    ))

    return collorArr
  }

  function newGame() {
    setApiWord(null)
    setCurrentWord(["", "", "", "", ""])
    setCurrentIndex(0)
    setPrevWordsArr([])
    setGameIsOver(false)
    fetchData()
  }

  const fetchData = async () => {
    try {
      const response = await fetch('https://random-word-api.herokuapp.com/word?length=5');
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const result = await response.json()
      setApiWord(result[0])
    } catch (err) {
      console.log(err.message)
    }
  }
  
  const updateCurrentWord = useCallback((input) => {
    if (ALPHABET.includes(input)) {
      const newWord = currentWord.map((char, i) => (
        i === currentIndex ? input.toUpperCase() : char
      ));
      setCurrentWord(newWord);
      
      if (currentIndex < 5) {
        setCurrentIndex(prev => prev + 1);
      }
    }

    if (input === 'Backspace') {
      const newWord = currentWord.map((char, i) => (
        i === currentIndex ? ' ' : char
      ))

      setCurrentWord(newWord)

      if (currentIndex > 0) {
        setCurrentIndex(prev => prev -= 1)
      }
    }
  }, [currentIndex, currentWord]);

  useEffect(() => {

    const handleKeyDown = (event) => {
      if (ALPHABET.includes(event.key) || event.key === "Backspace") {
        updateCurrentWord(event.key)
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [updateCurrentWord])

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (currentIndex === 5) {
      resetWord();
    }
  }, [currentIndex, resetWord]);

  useEffect(() => {
    console.log(apiWord)
  }, [apiWord])

  return (
    <div className="App">
          {apiWord && prevWordsArr}
          {apiWord && !gameIsOver && <WordDisplay word={currentWord}/>}
          {gameIsOver && <button className="resetBtn" onClick={newGame}>RESET</button>}
    </div>
  )
}

export default App;
