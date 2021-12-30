import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AccountDetails from '../../components/users/AccountDetails';
import AccountNav from '../../components/users/AccountNav';
import CreateBlog from '../blogs/CreateBlog';
import EditBlog from '../blogs/EditBlog';

const MyAccount = props => {
    // Prop passed down from the App.jsx to set the category list that will be passed onto the create and edit blog pages. Also passing down the logged in user and props to trigger a reload of necessary components.
    const { categories, loggedInUser, toggleUpdate, setToggleUpdate } = props;

    return (
        <div className='d-flex gap-5 mx-5 h-100'>
            <div className='w-25 sub-container '>
                
                <AccountNav user_id={loggedInUser.id} toggleUpdate={toggleUpdate}/>
            </div>
            <div className="w-75 sub-container ms-5 h-100">
                <Routes>
                    <Route path="details" element={<AccountDetails loggedInUser={loggedInUser} />} />
                    <Route path="createBlog" element={<CreateBlog categories={categories} loggedInUser={loggedInUser} />} />
                    <Route path="blogs/:id/edit" element={<EditBlog categories={categories} loggedInUser={loggedInUser} toggleUpdate={toggleUpdate} setToggleUpdate={setToggleUpdate} />} />
                </Routes>
            </div>
        </div>
    );
};


export default MyAccount;