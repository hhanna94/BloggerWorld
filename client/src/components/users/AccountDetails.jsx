import React from 'react';
import { Link } from 'react-router-dom';

const AccountDetails = props => {
    // The logged in user passed down via props from MyAccount.
    const {loggedInUser} = props

    return (
        <div className=''>
            <h4>Account Details</h4>
            <div className='d-flex'>
                <p className='fw-bold col-2'>Name: </p>
                <p>{loggedInUser.firstName} {loggedInUser.lastName} </p>
            </div>
            <div className='d-flex'>
                <p className='fw-bold col-2'>Email: </p>
                <p>{loggedInUser.username}</p>
            </div>

            <h4 className='mt-5 pt-5'>My Favorites</h4>
            <div className="d-flex justify-content-between pt-2 text-danger">
                {/* Two features that had been added, but unfortunately I had a critical error I couldn't find and I had to revert back to my last git push. These features will be added again soon.*/}
                <div className="ms-5">
                    <h5>Favorite Blogs</h5>
                    <ul>
                        <li><Link to="/">Placeholder</Link></li>
                        <li><Link to="/">Placeholder</Link></li>
                        <li><Link to="/">Placeholder</Link></li>
                    </ul>
                </div>
                <div className='w-50'>
                    <h5>Liked Posts</h5>
                    <ul>
                        <li><Link to="/">Placeholder</Link></li>
                        <li><Link to="/">Placeholder</Link></li>
                        <li><Link to="/">Placeholder</Link></li>
                    </ul>
                </div>
            </div>
        
        </div>
    );
};


export default AccountDetails;