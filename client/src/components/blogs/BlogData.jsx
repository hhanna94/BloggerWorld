import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PostService from '../../services/PostService';


const BlogData = props => {
    const {blog, loggedInUser} = props;
    const [blogPosts, setBlogPosts] = useState([])

    useEffect( () => {
        PostService.getBlogPosts(blog.id)
            .then(res => setBlogPosts(res.data))
            .catch(err => console.log(err))
    }, [])


    return (
        <div className={`text-${blog.theme}`}>
            <h3 className={`text-center header-${blog.theme}`}>{blog.title}</h3>
            <p className='text-center'><em>by {blog.creator.firstName} {blog.creator.lastName}</em></p>
            <p style={{whiteSpace: "pre-line"}}>{blog.description}</p>
            { loggedInUser.id == blog.creator.id ? <Link to={`posts/new`} className={`btn btn-${blog.theme} mb-3`}>Add Post</Link> : ""}
            {blogPosts.length == 0 ? <p><em>{blog.creator.firstName} hasn't made any posts yet!</em></p> : ""}
            {blogPosts.map( (post, i) => {
                return (
                    <div key={i} className={`mini-container mt-4 py-2 bg-${blog.theme} border-${blog.theme}`}>
                        <div className='d-flex justify-content-between'>
                            <Link to={`posts/${post.id}`} className={`fs-4 link-${blog.theme}`}>{post.title}</Link>
                            <div className="d-flex gap-3">
                                <p>{new Date(post.createdAt).toLocaleDateString('en-US')}</p>
                                <p className="text-danger">xxx likes</p>
                            </div>
                        </div>
                        <p className="ms-3">{post.content.slice(0, 400)}{post.content.length > 400? "..." : ""}</p>
                    </div>
                )
            })}
        </div>
    );
};


export default BlogData;