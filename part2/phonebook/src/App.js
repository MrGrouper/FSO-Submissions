import { useState, useEffect } from 'react'
import axios from 'axios'
import Name from "./components/Name"
import personService from './services/persons'

console.log(personService)

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



const App = (props) => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");

  const [newPhone, setNewPhone] = useState("");

  const [newSearch, setNewSearch] = useState("");

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons =>{
        setPersons(initialPersons)
      })
}, [])

console.log(persons)

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

  const handleDelete = (event) => {
    console.log('click');
  };


  const search = persons.filter((str) =>
    str.name.toLowerCase().includes(newSearch.toLowerCase())
  );

  const personsToShow = search ? search : persons;

  return (
    <div>
      <h2>Phonebook</h2>
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
            <Name key={person.name} name={person.name} phone={person.number} handleDelete={handleDelete} />
        ))}
      
    </div>
  );
};

export default App;
