import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Login from './views/users/Login';
import Registration from './views/users/Registration';
import interceptors from "../src/Interceptors";
import { useEffect, useState } from 'react';
import UserService from './services/UserService';
import MyAccount from './views/users/MyAccount';

function App() {
  // Blog categories that will be passed to various children if needed, to easily add or remove categories at a later date
  const categories = ["food", "fashion", "travel", "lifestyle", "fitness"]
  const [loggedInUser, setLoggedInUser] = useState({})
  const [toggleUpdate, setToggleUpdate] = useState(false)

  // useEffect( () => {
  //   UserService.getLoggedInUser()
  //     .then(res => console.log(res.data))
  //     .catch(err => console.log(err))
  // }, [toggleUpdate])

  return (
    <BrowserRouter>
      <NavBar categories={categories} />
      <div id="main-container">
        <Routes>
          <Route path="/login" element={<Login toggleUpdate={toggleUpdate} setToggleUpdate={setToggleUpdate}/> } />
          <Route path="/register" element={<Registration />} />
          <Route path="/myaccount/*" element={<MyAccount categories={categories}/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
