import { range } from 'express/lib/request'
import React from 'react'

export default function Suggestions(props){
  let suggestedWords = []
  for (let i = 0; i < props.words.length; i++){
    suggestedWords.push(
      <li id={`s${i + 1}`}>
        {props.words[i]} 
        <button className='insert' onClick={() => props.insert(props.words[i].toUpperCase())}>&gt;</button>
      </li>
    )
  }
  return (
      <ol>
        {suggestedWords}
      </ol>
  )
}
