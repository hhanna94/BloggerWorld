import React from 'react';
import { Link } from 'react-router-dom';


const BlogData = props => {
    const {blog} = props;

    return (
        <div>
            <h2 className='text-center'>{blog.title}</h2>
            <p className='text-center'><em>by {blog.creator.firstName} {blog.creator.lastName}</em></p>
            <p style={{whiteSpace: "pre-line"}}>{blog.description}</p>
            <Link to={`posts/new`} className='btn btn-secondary'>Add Post</Link>
        </div>
    );
};


export default BlogData;