import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import CreateBlog from '../../components/blogs/CreateBlog';
import AccountDetails from '../../components/users/AccountDetails';
import AccountNav from '../../components/users/AccountNav';
import UserService from '../../services/UserService';

const MyAccount = props => {
    const {categories} = props;
    const [loggedInUser, setLoggedInUser] = useState({})
    const [loaded, setLoaded] = useState(false)

    useEffect( () => {
        UserService.getLoggedInUser()
            .then(res => {
                setLoggedInUser(res.data)
                setLoaded(true)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div className='d-flex gap-5 mx-5'>
            <div className='w-25 sub-container '>
                {loaded && <AccountNav />}
            </div>
            <div className="w-75 sub-container ms-5">
                { loaded && <Routes>
                    <Route path="details" element={<AccountDetails loggedInUser={loggedInUser} />}/>
                    <Route path="createBlog" element={<CreateBlog categories={categories} loggedInUser={loggedInUser}/>} />
                </Routes>}
            </div>
        </div>
    );
};


export default MyAccount;