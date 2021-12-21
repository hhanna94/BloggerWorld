import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchIcon from '../static/images/search.svg';

const NavBar = props => {
    const { categories } = props;
    const [toggleReload, setToggleReload] = useState(false)

    const logout = () => {
        localStorage.clear();
        setToggleReload(true);
    }

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center px-5 pt-3">
                <h1 className="header">BloggerWorld</h1>
                <div className="d-flex align-items-center gap-1">
                    <select name="searchBy" id="searchBy" className="form-select w-75">
                        <option value="author">Author Name</option>
                        <option value="blogName">Blog Title</option>
                        <option value="postName">Post Title</option>
                        <option value="postText">Post Text</option>
                    </select>
                    <input type="text" name="search" id="search" placeholder="search" className="form-control" />
                    <img src={SearchIcon} id="search-icon" alt="search icon" className="ms-1" />
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
                            <a className="mx-2" href={`/${category}`}>{category}</a>

                        </li>

                    )
                })}

            </ul>
        </div>
    );
};


export default NavBar;