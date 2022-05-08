import './App.css';
import Word from './Word';
import Done from './Done';
import React, { useState } from 'react';
import Suggestions from './Suggestions';
import axios from "axios";

function App() {
  const [words, setWords] = useState(['ROATE', 'RAISE', 'RAILE', 'SOARE', 'ARISE']);
  const [guesses, setGuesses] = useState([]);

  const go = () => {
    if (words.length === 0) {
      alert('The solver found no solution :(')
      return
    }
    let word = ''
    let res = ''
    document.querySelectorAll('.letter').forEach(e => {
      word += e.value;
      if (e.classList.contains('gray')){
        res += '-'
      } else if (e.classList.contains('yellow')){
        res += 'Y'
      } else if (e.classList.contains('green')){
        res += 'G'
      } else {
        res = 'ALERT'
      }
    });
    if (res === 'ALERT'){
      alert('Please mark all letters')
      res = ''
    } else {
      let guess = word + ',' + res
      let g = guesses.join('^') + `${guesses.length ? '^' : ''}` + guess 
      if (guesses.indexOf(guess) !== -1){
        alert('Word already guessed')
      } else {
        setGuesses(guesses.concat(guess))
        axios.get(`/solve/${g}`)
        .then((res) => setWords(res.data.s))
        .catch((err) => console.log(err));
      }
    }
    document.querySelectorAll('.letter').forEach(i => {
      i.className = 'letter'
      i.value = ''
      document.getElementById(`b${i.id.slice(1)}`).className = 'lb'
    })
  }

  const reset = () =>{
    setGuesses([])
    setWords(['ROATE', 'RAISE', 'RAILE', 'SOARE', 'ARISE'])
    document.querySelectorAll('.letter').forEach(i => {
      i.className = 'letter'
      i.value = ''
      document.getElementById(`b${i.id.slice(1)}`).className = 'lb'
    })
  }

  return (
    <>
    <h1 className='title'>Wordle solver</h1>
    <div className='main'>
      <div className='left section'>
        <h2>Top suggestions:</h2>
        <Suggestions words={words}/>
      </div>
      <div className='right section'>
        <h2>Enter word</h2>
        <Word go={go}/>
        <Done guesses={guesses}/>
      </div>
    </div>
    <button className='reset' onClick={reset}>Reset</button>
    <a href="https://www.github.com/xaleel/wordle-solver" target="_blank" rel="noreferrer">Source code</a>
    </>

  );
}

export default App;
