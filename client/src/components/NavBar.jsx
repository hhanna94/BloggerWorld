import React from 'react';
import SearchIcon from '../static/images/search.svg';

const NavBar = props => {
    const {categories} = props;

    const logout = () => {
        localStorage.clear();
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
                    <input type="text" name="search" id="search" placeholder="search" className="form-control"/>
                    <img src={SearchIcon} id="search-icon" alt="search icon" className="ms-1"/>
                </div>
                <div>
                    <a href="/account">My Account</a>
                    <button onClick={logout}>Logout</button>
                    <a className="btn btn-dark text-white fw-bold ms-5 py-1" href="/login">Login</a>
                </div>
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