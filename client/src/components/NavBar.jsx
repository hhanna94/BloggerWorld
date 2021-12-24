import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchIcon from '../static/images/search.svg';

const NavBar = props => {
    // Props passed down from the App.jsx to set the category list part of the header, and to cause the useEffect to run upon logout to update the logged in user.
    const { categories, toggleUpdate, setToggleUpdate } = props;
    
    // Allows me to redirect the user on successful logout
    const navigate = useNavigate();

    // useState for the search bar functionality
    const [searchCriteria, setSearchCriteria] = useState({searchBy: "author", searchText: ""})

    // Upon clicking the logout button, clear the JWT (JSON Web Token) from local storage, force the useEffect on App.jsx to run again and reset the logged in user to an empty object, then navigate to the home page.
    const logout = () => {
        localStorage.clear();
        setToggleUpdate(!toggleUpdate);
        navigate("/")
    }

    // Updates the search useState as you change the search criteria fields
    const handleChange = e => {
        setSearchCriteria({...searchCriteria, [e.target.name]: e.target.value})
    }

    // Upon clicking the search icon, set the update toggle to be the opposite of what it was, this is actually for the search page to be updated, we don't necessarily need the useEffect on App.jsx to trigger again, but we do need it on the SearchResults.jsx page. Then, navigate to the Search Results page.
    const search = () => {
        setToggleUpdate(!toggleUpdate)
        navigate(`/search/${searchCriteria.searchBy}/${searchCriteria.searchText}`)
    }

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center px-5 pt-3">
                <Link to="/"><h1 className="header">BloggerWorld</h1></Link>
                <div className="d-flex align-items-center gap-1">
                    <select name="searchBy" id="searchBy" onChange={handleChange} className="form-select">
                        <option value="author">Author Last Name</option>
                        <option value="postTitle">Post Title</option>
                        <option value="postText">Post Text</option>
                    </select>
                    <input type="text" name="searchText" id="searchText" placeholder="search for posts" className="form-control" onChange={handleChange} />
                    <img onClick={search} src={SearchIcon} id="search-icon" alt="search icon" className="ms-1" />
                </div>

                {/* If there is a JWT in local storage, then show the My Account link and Logout button, otherwise only show the Login button. */}
                {localStorage.getItem("auth") ?
                    <div>
                        <Link to="/myaccount/details">My Account</Link>
                        <button className="btn btn-dark text-white fw-bold ms-5 py-1" onClick={logout}>Logout</button>
                    </div> :
                    <Link className="btn btn-dark text-white fw-bold ms-5 py-1" to="/login">Login</Link>
                }

            </div>
            <hr />

            {/* Map the categories array into an unordered list that will be used as links to the various category display pages. */}
            <ul className="d-flex justify-content-center list-unstyled">
                {categories.map((category, i) => {
                    return (
                        <li key={i}>
                            <a className="mx-2" href={`/blogs/category/${category}`}>{category}</a>

                        </li>

                    )
                })}

            </ul>
        </div>
    );
};


export default NavBar;