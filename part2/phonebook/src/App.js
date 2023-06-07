import { useState, useEffect } from 'react'
import axios from 'axios'
import Name from "./components/Name";

const Filter = (props) => {
  console.log(props);
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
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phone: "040-1234567" },
  ]);

  const [newName, setNewName] = useState("");

  const [newPhone, setNewPhone] = useState("");

  const [newSearch, setNewSearch] = useState("");

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => { 
        console.log('promise fulfilled')
        setPersons(response.data)
      })
}, [])
console.log('render', persons.length, 'persons')

  const addName = (event) => {
    const found = persons.find(
      (element) => JSON.stringify(element.name) === JSON.stringify(newName)
    );

    if (found) {
      alert(`${newName} is already added to phonebook`);
    } else {
      event.preventDefault();
      const personObj = {
        name: newName,
        phone: newPhone,
      };
      setNewName("");
      setNewPhone("");
      setPersons(persons.concat(personObj));
    }
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
            <Name key={person.name} name={person.name} phone={person.phone} />
        ))}
      
    </div>
  );
};

export default App;
