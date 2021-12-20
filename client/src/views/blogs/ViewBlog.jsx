import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import BlogData from '../../components/blogs/BlogData';
import BlogService from '../../services/BlogService';

const ViewBlog = () => {
    let params = useParams();
    const [blog, setBlog] = useState({})
    const [loaded, setLoaded] = useState(false)

    useEffect( () => {
        BlogService.getBlog(params.id)
            .then(res => {
                setBlog(res.data)
                setLoaded(true)
            })
            .catch(err  => console.log(err))
    }, [])

    return (
        <div>
            {loaded && <BlogData blog={blog}/>}
        </div>
    );
};


export default ViewBlog;