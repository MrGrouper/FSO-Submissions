import { useState } from 'react'

const Statisticsline = (props) => {
  return( 

    <tr>
      <td>{props.text} {props.value}</td>
    </tr>


  )
}

const Statistics = (props) =>{
  const total = props.good + props.neutral +props.bad
  const avg = (props.good-props.bad)/total || 0
  const pos = (props.good/total)*100 || 0

  if(total === 0) return <tr><td>No feedback given</td></tr>
  
  return(
<>
    <Statisticsline text='good' value={props.good}/>
    <Statisticsline text='neutral' value={props.neutral}/>
    <Statisticsline text='bad' value={props.bad}/>
    <Statisticsline text='all' value={total}/>
    <Statisticsline text='average' value={avg}/>
    <Statisticsline text='positive' value={pos}/>
</>

    )

}



const Button = (props)=>{
  return(
    <>
    <button onClick={props.fun}>{props.name}
    </button>
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
      <Button fun={handleGoodClick} name='good'/>
      <Button fun={handleNeutralClick} name='neutral'/>
      <Button fun={handleBadClick} name='bad'/>
      <h1>statistics</h1>
      <table>
        <tbody>
          <Statistics good = {good} neutral={neutral} bad={bad} />
          </tbody>
      </table>
      
    </div>
  )
}

export default App
