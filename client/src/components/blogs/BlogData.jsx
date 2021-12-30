import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BlogService from '../../services/BlogService';
import PostService from '../../services/PostService';
import FilledHeartIcon from '../../static/images/heart-fill.svg';


const BlogData = props => {
    const {blog, loggedInUser, reload, toggleReload} = props;
    const [blogPosts, setBlogPosts] = useState([])
    const [hidden, setHidden] = useState(false)
    

    // On component load, call on the API to get all posts based on the blog's ID. This is then used to fill out the data below. Also check to see if the user has already favorited the blog -- if so, then hide the "favorite blog" button.
    useEffect( () => {
        PostService.getBlogPosts(blog.id)
            .then(res => setBlogPosts(res.data))
            .catch(err => console.log(err))
        if (blog.usersWhoFavorited.some(user => user.id == loggedInUser.id)) {
            setHidden(true)
        }
    }, [])

    // Call on the API to add a blog to a user's favorites.
    const favoriteBlog = () => {
        BlogService.favoriteBlog(blog.id, loggedInUser.id)
            .then(res => {
                setHidden(true)
                toggleReload(!reload)
            })
            .catch(err => console.log(err))
    }

    return (
        <div className={`text-${blog.theme}`}>
            <h3 className={`text-center header-${blog.theme}`}>{blog.title}</h3>
            <div className='d-flex justify-content-between px-5'>
                <p className='text-center'>Author: {blog.creator.firstName} {blog.creator.lastName}</p>
                <p><img src={FilledHeartIcon} alt="heart icon" className="me-1 mb-1"/> {blog.usersWhoFavorited.length} favorites</p>
            </div>
            <p style={{whiteSpace: "pre-line"}}>{blog.description}</p>

            {/* Check if the logged in user owns the blog. If they do, then show the New Post button. Otherwise, show nothing. */}
            { loggedInUser.id == blog.creator.id ? 
                <Link to={`posts/new`} className={`btn btn-${blog.theme} mb-3`}>Add Post</Link> : ""
            }
            {/* Check if the user is logged in, that they do not own the blog, and that the button shouldn't be hidden. If all is  */}
            {loggedInUser.id && loggedInUser.id != blog.creator.id && !hidden ? <button onClick={favoriteBlog} className={`btn btn-${blog.theme} mb-3`}>Add To Favorites</button> : ""}

            {/* Check if the user hasn't made any posts, add the below line if there are no posts. Otherwise, show nothing. */}
            {blogPosts.length == 0 ? <p className='mt-5'><em>{blog.creator.firstName} hasn't made any posts yet!</em></p> : ""}

            {/* Display all the blog's posts. */}
            {blogPosts.map( (post, i) => {
                return (
                    <div key={i} className={`mini-container mt-4 py-2 bg-${blog.theme} border-${blog.theme}`}>
                        <div className='d-flex justify-content-between'>
                            <Link to={`posts/${post.id}`} className={`fs-4 link-${blog.theme}`}>{post.title}</Link>
                            <div className="d-flex gap-3">
                                <p>{new Date(post.createdAt).toLocaleDateString('en-US')}</p>
                                <p>{post.usersWhoLiked.length} likes</p>
                            </div>
                        </div>
                        {/* If the post's content is longer than 500 characters, cut it off and add a ... to show that there is more to read. This is to make sure all post divs are the same height without overflowing. */}
                        <p className="ms-3">{post.content.slice(0, 500)}{post.content.length > 500? "..." : ""}</p>
                    </div>
                )
            })}
        </div>
    );
};


export default BlogData;