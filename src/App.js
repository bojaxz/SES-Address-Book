import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import firebase from './firebase';
import './App.css';
import Navbar from './components/navbar/Navbar';
import AdFilter from './components/address-book-list/AdFilter';
import AdForm from './components/address-book-entry/AdForm';
import AdList from './components/address-book-list/AdList';
import Footer from './components/footer/Footer';


function App() {
  const initialState = [
    {
      firstName: 'Dennis',
      lastName: 'Renloyds',
      gender: 'male',
      age: 31,
      id: '1',
    },
    {
      firstName: 'Gloria',
      lastName: 'Prichett',
      gender: 'female',
      age: 38,
      id: '2',
    },
    {
      firstName: 'Phil',
      lastName: 'Dunphy',
      gender: 'male',
      age: 45,
      id: '3',
    },
    {
      firstName: 'Jess',
      lastName: 'Christopher',
      gender: 'female',
      age: 27,
      id: '4',
    },
    {
      firstName: 'Winston "Schmiddy"',
      lastName: 'Schmidt',
      gender: 'male',
      age: 30,
      id: '5',
    },
    {
      firstName: 'Amy',
      lastName: 'Ferhafowler',
      gender: 'female',
      age: 28,
      id: '6',
    },
  ];

  const [query, setQuery] = useState('');
  // const [users, setUsers] = useState(initialState);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [currentUser, setCurrentUser] = useState({});
  const currentUsers = isFiltered ? filteredUsers : users;
  const [loading, setLoading] = useState(false);

  const ref = firebase.firestore().collection("users");

  function getUsers() {
    setLoading(true);
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setUsers(items);
      setLoading(false);
    })
  }

  const handleQueryChange = (e) => {
    if (e.target.value) {
      setIsFiltered(true);
    } else setIsFiltered(false);

    setQuery(e.target.value);
    // filter(e.target.value);
  };

  const handleEditClick = (e) => {
    const item = users.filter((user) => user.id === e.target.value);
    setIsEdit(true);
    setCurrentUser(item[0]);
    setFirstName(item[0].firstName);
    setLastName(item[0].lastName);
    setAge(item[0].age);
    setGender(item[0].gender);
  };

  const handleDeleteClick = (e) => {
    const newUsers = users.filter(
      (user) => user.id !== e.target.value
    );
    setUsers(newUsers);
  };

  const clearInput = () => {
    setIsEdit(false);
    setFirstName('');
    setLastName('');
    setAge('');
    setGender('');
    setCurrentUser({});
  };

  const handleAddOrEditClick = () => {
    if (isEdit) {
      const newUser = {
        firstName,
        lastName,
        gender,
        age: +age,
        id: currentUser.id,
      };
      editCurrentUser(newUser);
    } else {
      const newUser = {
        firstName,
        lastName,
        gender,
        age: +age,
        id: Math.floor(Math.random() * 5237).toLocaleString(),
      };
      addUser(newUser);
    }
    clearInput();
  };

  const editCurrentUser = (newUser) => {
    setUsers(
      users.map((user) =>
        user.id === currentUser.id ? newUser : user
      )
    );
  };

  const addUser = (newUser) => {
    setUsers([newUser, ...users]);
  };

  // const filter = (query) => {
  //   if (query) {
  //     const filteredusers = users.filter(
  //       (user) => user.gender === query
  //     );
  //     setFilteredUsers(filteredUsers);
  //   } else setFilteredUsers([]);
  // };

  // useEffect(() => {
  //   if (query) {
  //     const filteredUsers = users.filter(
  //       (user) => user.gender === query
  //     );
  //     setFilteredUsers(filteredUsers);
  //   } else setFilteredUsers([]);
  // }, [users, query]);

  useEffect(() => {
    getUsers();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>
  }

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/">
            <AdForm
              query={query}
              handleQueryChange={handleQueryChange}
              isEdit={isEdit}
              firstName={firstName}
              setFirstName={setFirstName}
              lastName={lastName}
              setLastName={setLastName}
              age={age}
              setAge={setAge}
              gender={gender}
              setGender={setGender}
              clearInput={clearInput}
              handleAddOrEditClick={handleAddOrEditClick}
            />
          </Route>
          <Route path="/users">
            {!isEdit && (
              <AdFilter query={query} handleQueryChange={handleQueryChange} />
            )}
            
            {isEdit && (
              <AdForm 
                query={query}
                handleQueryChange={handleQueryChange}
                isEdit={isEdit}
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                age={age}
                setAge={setAge}
                gender={gender}
                setGender={setGender}
                clearInput={clearInput}
                handleAddOrEditClick={handleAddOrEditClick}
              />
            )}
            <AdList 
              users={currentUsers}
              handleEditClick={handleEditClick}
              handleDeleteClick={handleDeleteClick}
            />
          </Route>
        </Switch>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
