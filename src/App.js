import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import firebase from './firebase';
import { v4 as uuidv4 } from "uuid";
import './app.css';
import Navbar from './components/navbar/Navbar';
import AdFilter from './components/address-book-list/AdFilter';
import AdForm from './components/address-book-entry/AdForm';
import Stats from './components/stats/Stats';
import AdList from './components/address-book-list/AdList';
import Footer from './components/footer/Footer';


function App() {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [oldest, setOldest] = useState(0);
  const [averageAge, setAverageAge] = useState(0);
  const [youngest, setYoungest] = useState(0);

  const currentUsers = isFiltered ? filteredUsers : users;

  const ref = firebase.firestore().collection("users");

  // read our users from Firebase(FB) Db.
  function getUsers() {
    // add a loading screen while fetching users
    setLoading(true);
    // use FB method to get a snapshot of our users data.
    // snapshots will refresh in real-time when a change is made client or server side
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      // map through items to create index item for each user
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setUsers(items);
      // remove loading screen once fetch is completed
      setLoading(false);
    })
  }

  // functional components don't use life cycles, 
  // so we add a useEffect to get users once app mounts
  useEffect(() => {
    getUsers();
    // eslint-disable-next-line
  }, []);

  // same as previous useEffect, but to grab stats component info
  useEffect(() => {
    getOldest();
    getYoungest();
    getAverage();
  });

  // callback to handle gender filter and Add/Edit button.
  // passed to filter and form as props
  const handleQueryChange = (e) => {
    if (e.target.value) {
      setIsFiltered(true);
    } else setIsFiltered(false);

    setQuery(e.target.value);
  };

  // resets our form fields once a user is added or editted
  const clearInput = () => {
    setIsEdit(false);
    setFirstName('');
    setLastName('');
    setAge('');
    setGender('');
    setCurrentUser({});
  };

  // populate user data when clicking edit button
  const handleEditClick = (e) => {
    const item = users.filter((user) => user.id === e.target.value);
    setIsEdit(true);
    setCurrentUser(item[0]);
    setFirstName(item[0].firstName);
    setLastName(item[0].lastName);
    setAge(item[0].age);
    setGender(item[0].gender);
  };

  // grabs the id of the user that is clicked to delete via an event, 
  // deletes document that matches id
  const handleDeleteClick = (e) => {
    const item = users.filter((user) => user.id === e.target.value);
    deleteUser(item[0]);
    alert(`Successfully deleted ${item[0].firstName} ${item[0].lastName}!`)
  };

  // used to add logic to our form submission for either add or edit
  const handleAddOrEditClick = () => {
    // when isEdit is true, we reuse the current user's id
    if (isEdit) {
      const newUser = {
        firstName,
        lastName,
        gender,
        age: +age,
        id: currentUser.id,
      };
      if (firstName === "") {
        alert("You must enter a first name.");
        return;
      }
      if (age === ""){
        alert("You must enter an age.");
        return;
      } 
      if (gender === "") {
        alert("You must enter a gender.");
        return;
      } else {
        editUser(newUser);
      }
    } else {
      // when isEdit is false, we generate a new user id with uuid
      const newUser = {
        firstName,
        lastName,
        gender,
        age: +age,
        id: uuidv4(),
      };
      if (firstName === "") {
        alert("You must enter a first name.");
        return;
      }
      if (age === ""){
        alert("You must enter an age.");
        return;
      } 
      if (gender === "") {
        alert("You must enter a gender.");
        return;
      } else {
        addUser(newUser);
        alert(`Added ${newUser.firstName} ${newUser.lastName} to Users!`)
      }
    }
    clearInput();
  };

  // FB Add User Function
  function addUser(newUser) {
    ref
      // create a new document in our FSDB using .doc() method
      .doc(newUser.id)
      .set(newUser)
      .catch((err) => {
        console.error(err);
      });
  }

  // FB Edit User Function
  function editUser(updatedUser) {
    setLoading();
    ref
      // using the update method rather than set
      .doc(updatedUser.id)
      .update(updatedUser)
      .catch((err) => {
        console.error(err);
      });
  }

  // FB Delete User Function
  function deleteUser(user) {
    ref
      // similar to addUser, we delete a user from our FSDB using the .doc() method
      .doc(user.id)
      .delete()
      .catch((err) => {
        console.error(err)
      });
  }

  // logic for stats component
  // add all user ages to an array and uses Math.max to return highest age
  function getOldest() {
    const usersAge = [];
    for (let i = 0; i < users.length; i++) {
      usersAge.push(users[i].age);
    }
    const maxAge = Math.max(...usersAge);
    setOldest(maxAge);
  }

  // uses a for loop to get sum of age, divide by number of ages, then round average
  function getAverage() {
    let totalAge = 0;
    for (let i = 0; i < users.length; i++) {
      totalAge = totalAge + users[i].age;
    }
    let average = Math.round(totalAge / users.length);
    setAverageAge(average);
  }

  // similar to getOldest, but using Math.min to find lowest
  function getYoungest() {
    const usersAge = [];
    for (let i = 0; i < users.length; i++) {
      usersAge.push(users[i].age);
    }
    const minAge = Math.min(...usersAge);
    setYoungest(minAge);
  }

  // useEffect to update list of users whenever components mount/refresh
  useEffect(() => {
    if (query) {
      const filteredUsers = users.filter(
        (user) => user.gender === query
      );
      setFilteredUsers(filteredUsers);
    } else setFilteredUsers([]);
  }, [users, query]);


  // loading page is displayed while fetching users
  if (loading) {
    return <h1 className="loading">Loading...</h1>
  }

  return (
    <Router>
      <div className="app">
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
            <div className="usersPage">
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
              <Stats 
                oldest={oldest}
                averageAge={averageAge}
                youngest={youngest}
              />
              <AdList 
                users={currentUsers}
                handleEditClick={handleEditClick}
                handleDeleteClick={handleDeleteClick}
              />
            </div>
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
