import {useCallback, useEffect, useState} from 'react';

import WordDisplay from './components/wordDisplay/WordDisplay';
import ALPHABET from './util/alphabet.js'

import './App.css';

function App() {

  const [currentWord, setCurrentWord] = useState(["", "", "", "", ""])
  const [currentIndex, setCurrentIndex] = useState(0)

  const updateCurrentWord = useCallback((input) => {
    if (ALPHABET.includes(input)) {
      const newWord = currentWord.map((char, i) => (
        i === currentIndex ? input.toUpperCase() : char
      ));
      setCurrentWord(newWord);
      
      if (currentIndex < 4) {
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

  return (
    <div className="App">
      <WordDisplay word={currentWord} />
    </div>
  );
}

export default App;
