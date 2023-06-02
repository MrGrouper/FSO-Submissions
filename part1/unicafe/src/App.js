import { useState } from 'react'

// const Display = props => <p>{props.name} {props.value}</p>

// const Statistics = (props) =>{
//   const total = props.good + props.neutral +props.bad
//   const avg = (props.good-props.bad)/total || 0
//   const pos = (props.good/total)*100 || 0
//   return(
//   <>
//     <p>all {total}</p>
//     <p>average {avg}</p>
//     <p>positive {pos}%</p>
//   </>
//   )
// }

const History = (props) =>{
  const total = props.good + props.neutral +props.bad
  const avg = (props.good-props.bad)/total || 0
  const pos = (props.good/total)*100 || 0

  if(total === 0){
    return(
      <div>No feedback given</div>
    )
  }
  return(
    <>
      <p>good {props.good}</p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p>
      <p>all {total}</p>
      <p>average {avg}</p>
      <p>positive {pos}%</p>
    </>
    )

}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const handleGoodClick = () => {
    const updatedGood = good+1
    setGood(updatedGood)



  }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral+1
    setNeutral(updatedNeutral)

  }

  const handleBadClick = () => {
    const updatedBad = bad+1
    setBad(updatedBad)

  }



  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleGoodClick}>Good</button>
      <button onClick={handleNeutralClick}>Neutral</button>
      <button onClick={handleBadClick}>Bad</button>
      <h1>statistics</h1>
      <History good = {good} neutral={neutral} bad={bad} />
      
    </div>
  )
}

export default App
