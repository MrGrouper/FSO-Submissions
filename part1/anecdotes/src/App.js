import { useState } from 'react'

const Button = (props)=>{
  return(
    <>
    <button onClick={props.fun}>{props.name}
    </button>
    </>
  )
}


const App = () => {


  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const len = anecdotes.length

   
  const [selected, setSelected] = useState(0)
  const [allClicks, setAll] = useState(Array(len).fill(0))


  const handleNext = () =>{
    const updatedAnecdote= Math.floor(Math.random()*(len))
    setSelected(updatedAnecdote);
  }
  


  const handleVote = () =>{
    const copy = [...allClicks]
    copy[selected] +=1
    setAll(copy)
  }

  const mostIndex = allClicks.indexOf(Math.max(...allClicks))


  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}<br></br>
      <p>has {allClicks[selected]} votes</p> 
      <Button fun={handleVote} name="vote"/>
      <Button fun={handleNext} name="next anecdote"/>
      <br></br>
      <h1>Anecdote with most votes</h1>
      {anecdotes[mostIndex]}
    </div>
  )
}

export default App