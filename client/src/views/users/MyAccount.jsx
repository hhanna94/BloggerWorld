import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import BlogForm from '../../components/blogs/BlogForm';
import AccountDetails from '../../components/users/AccountDetails';
import AccountNav from '../../components/users/AccountNav';
import UserService from '../../services/UserService';
import CreateBlog from '../blogs/CreateBlog';
import EditBlog from '../blogs/EditBlog';

const MyAccount = props => {
    const navigate = useNavigate();
    const { categories } = props;
    const [loggedInUser, setLoggedInUser] = useState({})
    const [toggleReload, setToggleReload] = useState(false)
    const [loaded, setLoaded] = useState(false)

    
    useEffect(() => {
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