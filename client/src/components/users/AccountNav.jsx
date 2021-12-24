import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BlogService from '../../services/BlogService';

const AccountNav = props => {
    // User ID passed down from MyAccount that is used in the useEffect below.
    const {user_id} = props

    // A list of tabs that display above the "My Blogs" section on the side nav of My Account. The URL is relative.
    const primaryTabs = [
        {url: "details", text: "Account Details"}, 
        {url: "createBlog", text: "Create Blog"}
    ]

    // A currently empty list of tabs that will be filled after the useEffect runs.
    const [blogTabs, setBlogTabs] = useState([])

    // Determines which tab the user is on based on the URL, and automatically sets that to be the activeTab.
    const urlPath = window.location.pathname.split("/")
    let url
    if (urlPath[2] == "blogs") {
        url = urlPath[3]
    } else {
        url = urlPath[2]
    }
    const [activeTab, setActiveTab] = useState(url)

    // useEffect to get a list of the blogs the user has created. If successful, it well set the blogTabs to be the result of that API call.
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
            {/* Map the primary tabs array use the url and text given in each object. When a user clicks on the tab, it sets that to be the active tab (makes it bold and the rest regular font) */}
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
            {/* Map the blog tabs array use the id and title given in each blog object. When a user clicks on the tab, it sets that to be the active tab (makes it bold and the rest regular font) */}
            {blogTabs.map( (tab, i) => {
                return (
                    <div key={i} className='d-flex justify-content-between align-items-center'>
                        <Link to={`/blogs/${tab.id}`} className={activeTab === blogTabs[i].id ? "fw-bold ms-4" : "ms-4"}>{tab.title}</Link>
                        <Link className='btn btn-secondary py-0' to={`/myaccount/blogs/${tab.id}/edit`} onClick={e => {setActiveTab(blogTabs[i].id)}}>edit</Link>
                    </div>
                )
            })}

        </div>
    );
};


export default AccountNav;