import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AccountDetails from '../../components/users/AccountDetails';
import AccountNav from '../../components/users/AccountNav';
import UserService from '../../services/UserService';
import CreateBlog from '../blogs/CreateBlog';
import EditBlog from '../blogs/EditBlog';

const MyAccount = props => {
    // Prop passed down from the App.jsx to set the category list that will be passed onto the create and edit blog pages.
    const { categories } = props;

    // Essentially the same code as App.jsx to get and set the logged in user. I set up the app originally to only get the user on this parent page, then later realized I needed it mostly everywhere. Unfortunately it's not as simple as passing the logged in user from App.jsx here and then going about my business, there's some debugging required to get rid of this and the useEffect code that will be done at a later date.
    const [loggedInUser, setLoggedInUser] = useState({})
    const [toggleReload, setToggleReload] = useState(false)
    const [loaded, setLoaded] = useState(false)

    
    useEffect(() => {
        // The below line will unmount the AccountNav component that needs to be reloaded when a blog has been deleted since there is no redirect. It will then get remounted after the API call is successful.
        setLoaded(false)
        UserService.getLoggedInUser()
            .then(res => {
                setLoggedInUser(res.data)
                setLoaded(true)
            })
            .catch(err => console.log(err))
    }, [toggleReload])

    return (
        <div className='d-flex gap-5 mx-5 h-100'>
            <div className='w-25 sub-container '>
                {loaded && <AccountNav user_id={loggedInUser.id} />}
            </div>
            <div className="w-75 sub-container ms-5 h-100">
                {loaded && <Routes>
                    <Route path="details" element={<AccountDetails loggedInUser={loggedInUser} />} />
                    <Route path="createBlog" element={<CreateBlog categories={categories} loggedInUser={loggedInUser} />} />
                    <Route path="blogs/:id/edit" element={<EditBlog categories={categories} loggedInUser={loggedInUser} toggleReload={toggleReload} setToggleReload={setToggleReload} />} />
                </Routes>}
            </div>
        </div>
    );
};


export default MyAccount;