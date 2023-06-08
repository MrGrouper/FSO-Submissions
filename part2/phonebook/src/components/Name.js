const Name = (props) => {

    return (
      <>
      <p>{props.name} {props.phone}</p>
      <button onClick={props.deletePerson}>delete</button>
      </>
    )
  }
  
  export default Name