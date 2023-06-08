import { useState, useEffect } from 'react'
import Name from "./components/Name"
import personService from './services/persons'


const Filter = (props) => {
  return (
    <div>
      filter shown with:
      <input value={props.newSearch} onChange={props.handleSearch} />
    </div>
  );
};

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addName}>
      <div>
        name:
        <input value={props.newName} onChange={props.handleNameChange} />
      </div>
      <div>
        number:
        <input value={props.newPhone} onChange={props.handlePhoneChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='notification'>
      {message}
    </div>
  )
}



const App = (props) => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [notificationMessage, setNotificationMessage] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons =>{
        setPersons(initialPersons)
      })
}, [])

 const deletePerson = id =>{
  if(window.confirm("Are you sure you want to do that?")){
  const person = persons.find(n => n.id === id)
  const deletedPerson = persons.filter(n => n.id !== id)

  personService
  .deletePerson(id, deletedPerson)
  .then(      
    setPersons(deletedPerson)  
  )
  .catch(error => { 
    alert(  
      `${person.name} was already deleted from server` 
    )
    setPersons(persons.filter(n => n.id !== id))
  })
}
 }

  const addName = (event) => {

    // logic for 2.9
    const found = persons.find(
      (element) => JSON.stringify(element.name) === JSON.stringify(newName)
    );

    if (found) {
      alert(`${newName} is already added to phonebook`);
      return
    } 

      event.preventDefault();
      const personObj = {
        name: newName,
        number: newPhone,
      };

      personService
      .create(personObj)
      .then(returnedPerson =>{
        setPersons(persons.concat(returnedPerson))
        setNewName("");
        setNewPhone("");
        setNotificationMessage(          
          `'${personObj.name}' was successfully added`        
          )        
          setTimeout(() => {          
            setNotificationMessage(null)        
          }, 5000)
      })
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };
  const handlePhoneChange = (event) => {
    console.log(event.target.value);
    setNewPhone(event.target.value);
  };
  const handleSearch = (event) => {
    console.log(event.target.value);
    setNewSearch(event.target.value);
  };



  const search = persons.filter((str) => {
    return str.name.toLowerCase().includes(newSearch.toLowerCase())
  }
  );

  const personsToShow = search ? search : persons;

  return (
    <div>
      <h2>Phonebook</h2>
            <Notification message={notificationMessage} />
      <Filter newSearch={newSearch} handleSearch={handleSearch} />

      <h3>add a new</h3>

      <PersonForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newPhone={newPhone}
        handlePhoneChange={handlePhoneChange}
      />

      <h3>Numbers</h3>
      
        {personsToShow.map((person) => (
            <Name key={person.name} name={person.name} phone={person.number} deletePerson={()=>deletePerson(person.id)}/>
        ))}
      
    </div>
  );
};

export default App;
