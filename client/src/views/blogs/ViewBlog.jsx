import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import BlogData from '../../components/blogs/BlogData';
import BlogService from '../../services/BlogService';

const ViewBlog = props => {
    const {blog} = props

    return (
        <div>
            <BlogData blog={blog}/>
        </div>
    );
};


export default ViewBlog;