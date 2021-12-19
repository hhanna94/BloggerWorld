import React from 'react';

const AccountDetails = props => {
    const {loggedInUser} = props

    return (
        <div className='d-flex justify-content-between'>
            <div className='w-50'>
                <h4>Account Details</h4>
                <div className='d-flex'>
                    <p className='fw-bold col-2'>Name: </p>
                    <p>{loggedInUser.firstName} {loggedInUser.lastName} </p>
                </div>
                <div className='d-flex'>
                    <p className='fw-bold col-2'>Email: </p>
                    <p>{loggedInUser.username}</p>
                </div>
            </div>
            <div className="w-50">
                <h4>My Favorites</h4>
            </div>
        
        </div>
    );
};


export default AccountDetails;