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
      // Reset the Word component
      document.querySelectorAll('.letter').forEach(i => {
        i.className = 'letter'
        i.value = ''
        document.getElementById(`b${i.id.slice(1)}`).className = 'lb'
      })
    } 
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

  const dismiss = event => {
    document.getElementById('tip').className = 'no-dsp'
  }

  const insert = word => {
    document.getElementById('l1').value = word.slice(0, 1)
    document.getElementById('l2').value = word.slice(1, 2)
    document.getElementById('l3').value = word.slice(2, 3)
    document.getElementById('l4').value = word.slice(3, 4)
    document.getElementById('l5').value = word.slice(4, 5)
    document.getElementById('l1').focus()
  }

  return (
    <>
    <h1 className='title'>Wordle solv3r</h1>
    <div className='main'>
      <div className='left section'>
        <h2>Top suggestions:</h2>
        <Suggestions words={words} insert={insert}/>
      </div>
      <div className='right section'>
        <h2>Enter word</h2>
        <Word go={go}/>
        <div className='tip' onClick={dismiss} id='tip'>
          <p>Click the buttons to change the color or use the arrow keys while typing</p>
          <p>(click to dismiss)</p>
        </div>
        <Done guesses={guesses}/>
      </div>
    </div>
    <button className='reset' onClick={reset}>Reset</button>
    <a href="https://www.github.com/xaleel/wordle-solver" target="_blank" rel="noreferrer">Source code</a>
    </>

  );
}

export default App;
