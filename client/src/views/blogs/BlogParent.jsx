import React, {useState, useEffect} from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import BlogService from '../../services/BlogService';
import CreatePost from '../posts/CreatePost';
import EditPost from '../posts/EditPost';
import ViewPost from '../posts/ViewPost';

import ViewBlog from './ViewBlog';

const BlogParent = props => {
    const {loggedInUser} = props
    let params = useParams();
    const [blog, setBlog] = useState({})
    const [loaded, setLoaded] = useState(false)

    // Use the blog ID passed in through the URL to set the current blog for all the child components.
    useEffect( () => {
        BlogService.getBlog(params.id)
            .then(res => {
                setBlog(res.data)
                setLoaded(true)
            })
            .catch(err  => console.log(err))
    }, [])
    return (
        <div className='sub-container'>
            { loaded && 
            <Routes>
                <Route exact path="/" element={<ViewBlog blog={blog} loggedInUser={loggedInUser}/>}/>
                <Route path="posts/new" element={<CreatePost blog={blog} loggedInUser={loggedInUser}/>} />
                <Route path="posts/:id" element={<ViewPost loggedInUser={loggedInUser} />} />
                <Route path="posts/:id/edit" element={<EditPost loggedInUser={loggedInUser} />} />
            </Routes> }
        </div>
    );
};


export default BlogParent;