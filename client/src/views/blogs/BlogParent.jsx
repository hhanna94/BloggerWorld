import React, {useState, useEffect} from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import BlogService from '../../services/BlogService';
import CreatePost from '../posts/CreatePost';
import EditPost from '../posts/EditPost';
import ViewPost from '../posts/ViewPost';

import ViewBlog from './ViewBlog';

const BlogParent = () => {
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
        <div className='container sub-container'>
            { loaded && 
            <Routes>
                <Route exact path="/" element={<ViewBlog blog={blog}/>}/>
                <Route path="posts/new" element={<CreatePost blog={blog}/>} />
                <Route path="posts/:id" element={<ViewPost />} />
                <Route path="posts/:id/edit" element={<EditPost />} />
            </Routes> }
        </div>
    );
};


export default BlogParent;