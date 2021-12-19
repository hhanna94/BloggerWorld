import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AccountNav = () => {
    const primaryTabs = [
        {url: "details", text: "Account Details"}, 
        {url: "createBlog", text: "Create Blog"}
    ]
    // Determine which tab we are on based on the URL, and automatically set the activeTab to be that tab
    const urlPath = window.location.pathname.split("/")
    const [activeTab, setActiveTab] = useState(urlPath[2])


    return (
        <div className='d-flex flex-column gap-3'>
            <h4>My Account</h4>

            {primaryTabs.map( (tab, i) => {
                return (
                    <Link key={i} 
                        to={tab.url}
                        onClick={e => {setActiveTab(primaryTabs[i].url)}}
                        className={activeTab === primaryTabs[i].url ? "fw-bold" : ""}>
                            {tab.text}
                    </Link>
                )
            })}

            <h6 className="mt-3">My Blogs</h6>

        </div>
    );
};


export default AccountNav;