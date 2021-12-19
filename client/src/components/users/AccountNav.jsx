import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BlogService from '../../services/BlogService';

const AccountNav = props => {
    const {user_id} = props
    const primaryTabs = [
        {url: "details", text: "Account Details"}, 
        {url: "createBlog", text: "Create Blog"}
    ]
    const [blogTabs, setBlogTabs] = useState([])

    // Determine which tab we are on based on the URL, and automatically set the activeTab to be that tab
    const urlPath = window.location.pathname.split("/")
    let url
    if (urlPath[1] == "myaccount") {
        url = urlPath[2]
    } else if (urlPath[1] == "blogs") {
        url = urlPath[3]
    }
    const [activeTab, setActiveTab] = useState(url)

    useEffect( () => {
        BlogService.getUserBlogs(user_id)
        .then(res => {
            setBlogTabs(res.data)
        })
        .catch(err => console.log(err))
    }, [])

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
            {blogTabs.map( (tab, i) => {
                return (
                    <Link className="ms-4" key={i} to={`/blogs/${tab.id}`}>{tab.title}</Link>
                )
            })}

        </div>
    );
};


export default AccountNav;