import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import BlogService from '../../services/BlogService';

const BlogCategory = () => {
    const params = useParams();

    // Logic to capitalize the first letter of the category, since it's typically used without any capitalization.
    const category = params.category;
    const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);

    const [blogs, setBlogs] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [randomBlogId, setRandomBlogId] = useState({})

    // Upon loading this page, call on the API to get all blogs based on the category selected. Then, select a random blog based on the returned array and set that blog as what will display when you click "random blog" on the category pages.
    useEffect( () => {
        BlogService.getBlogsByCategory(category)
            .then(res => {
                let tempBlogs = res.data
                let randomId = Math.floor(Math.random() * tempBlogs.length)
                setBlogs(tempBlogs)
                setRandomBlogId(tempBlogs[randomId].id)
                setLoaded(true)
            })
            .then(err => console.log(err))
    }, [])

    return (
        <div className='sub-container overflow-auto'>
            <h3 className="text-center">{capitalizedCategory} Blogs</h3>
            {/* If loaded is false, then that means no blogs were found for that category. */}
            {!loaded ? <p>No {capitalizedCategory} blogs yet! Maybe you could be the first?</p> : ""}

            {/* Otherwise, once the blogs state has been set, load the below. */}
            {loaded && 
            <div className="mt-3">
                <Link to={`/blogs/${randomBlogId}`}>get random blog</Link>
                {blogs.map( (blog, i) => {
                    return (
                        <div key={i} className={`mini-container mt-3 py-2 text-${blog.theme}`}>
                            <div className="d-flex align-items-baseline">
                                <Link to={`/blogs/${blog.id}`} className={`fs-4 me-3 link-${blog.theme}`}>{blog.title}</Link>
                                <p className="mb-1">by {blog.creator.firstName} {blog.creator.lastName}</p>
                            </div>
                            {/* If the blog post is longer than 550 characters, cut it off with a ... . This is to create a more uniform appearance. */}
                            <p className="ms-3 mt-0">{blog.description.slice(0,550)}{blog.description.length > 550? "..." : ""}</p>
                        </div>
                    )
                })}
            </div>}
        </div>
    );
};


export default BlogCategory;