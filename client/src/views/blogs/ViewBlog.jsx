import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import BlogData from '../../components/blogs/BlogData';
import BlogService from '../../services/BlogService';

const ViewBlog = props => {
    const {blog, loggedInUser} = props

    return (
        <div>
            <BlogData blog={blog} loggedInUser={loggedInUser}/>
        </div>
    );
};


export default ViewBlog;