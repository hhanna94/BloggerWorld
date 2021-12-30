import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import BlogData from '../../components/blogs/BlogData';
import BlogService from '../../services/BlogService';

const ViewBlog = props => {
    const {blog, loggedInUser, reload, toggleReload} = props

    return (
        <div>
            <BlogData blog={blog} loggedInUser={loggedInUser} reload={reload} toggleReload={toggleReload}/>
        </div>
    );
};


export default ViewBlog;