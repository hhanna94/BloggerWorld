import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Login from './views/users/Login';
import Registration from './views/users/Registration';
import interceptors from "../src/Interceptors";
import { useEffect, useState } from 'react';
import UserService from './services/UserService';
import MyAccount from './views/users/MyAccount';
import BlogParent from './views/blogs/BlogParent';
import Home from './views/posts/Home';
import BlogCategory from './views/blogs/BlogCategory';
import SearchResults from './views/posts/SearchResults';

function App() {
  // Blog categories that will be passed to various children if needed, to easily add or remove categories at a later date without having to change it in a bunch of places
  const categories = ["food", "fashion", "travel", "lifestyle", "fitness"]

  // useStates to set my logged in user upon login/logout and run the useEffect again as needed with an update toggle
  const [loggedInUser, setLoggedInUser] = useState({})
  const [toggleUpdate, setToggleUpdate] = useState(false)

  // useEffect to set logged in user useState whether or not the API call failed. If it succeeds, set it as the result of the API call, otherwise set it as an empty object.
  useEffect( () => {
    UserService.getLoggedInUser()
      .then(res => setLoggedInUser(res.data))
      .catch(err => setLoggedInUser({}))
  }, [toggleUpdate])

  return (
    <BrowserRouter>
      <NavBar categories={categories} toggleUpdate={toggleUpdate} setToggleUpdate={setToggleUpdate} />
      <div id="main-container">
        <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route path="/login" element={<Login toggleUpdate={toggleUpdate} setToggleUpdate={setToggleUpdate}/> } />
          <Route path="/register" element={<Registration />} />
          <Route path="/myaccount/*" element={<MyAccount categories={categories} loggedInUser={loggedInUser}/>} />
          <Route path="/blogs/:id/*" element={<BlogParent loggedInUser={loggedInUser} />} />
          <Route path="/blogs/category/:category" element={<BlogCategory />}/>
          <Route path="/search/:searchBy/:searchText" element={<SearchResults toggleUpdate={toggleUpdate} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
