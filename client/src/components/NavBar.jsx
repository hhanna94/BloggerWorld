import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchIcon from '../static/images/search.svg';

const NavBar = props => {
    const navigate = useNavigate();
    const { categories, toggleUpdate, setToggleUpdate } = props;
    const [searchCriteria, setSearchCriteria] = useState({searchBy: "author", searchText: ""})

    const logout = () => {
        localStorage.clear();
        setToggleUpdate(!toggleUpdate);
        navigate("/")
    }

    const handleChange = e => {
        setSearchCriteria({...searchCriteria, [e.target.name]: e.target.value})
    }

    const search = () => {
        setToggleUpdate(!toggleUpdate)
        navigate(`/search/${searchCriteria.searchBy}/${searchCriteria.searchText}`)
    }

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center px-5 pt-3">
                <Link to="/">
                    <h1 className="header">BloggerWorld</h1>
                </Link>
                <div className="d-flex align-items-center gap-1">
                    <select name="searchBy" id="searchBy" onChange={handleChange} className="form-select">
                        <option value="author">Author Last Name</option>
                        <option value="postTitle">Post Title</option>
                        <option value="postText">Post Text</option>
                    </select>
                    <input type="text" name="searchText" id="searchText" placeholder="search for posts" className="form-control" onChange={handleChange} />
                    <img onClick={search} src={SearchIcon} id="search-icon" alt="search icon" className="ms-1" />
                </div>
                {localStorage.getItem("auth") ?
                    <div>
                        <Link to="/myaccount/details">My Account</Link>
                        <button className="btn btn-dark text-white fw-bold ms-5 py-1" onClick={logout}>Logout</button>
                    </div> :
                    <Link className="btn btn-dark text-white fw-bold ms-5 py-1" to="/login">Login</Link>
                }
            </div>
            <hr />
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