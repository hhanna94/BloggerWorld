import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import BlogService from '../../services/BlogService';
import PostService from '../../services/PostService';

const AccountDetails = props => {
    // The logged in user passed down via props from MyAccount.
    const {loggedInUser} = props

    // Upon loading the component, get a list of the blogs that the logged in user has favorited which will be displayed in the Favorites section. Also get a list of all the posts that a user has liked to be displayed.
    const [favoriteBlogs, setFavoriteBlogs] = useState([])
    const [likedPosts, setLikedPosts] = useState([])
    useEffect( () => {
        BlogService.getUserFavorites(loggedInUser.id)
            .then(res => setFavoriteBlogs(res.data))
            .catch(err => console.log(err))
        PostService.getLikedPosts(loggedInUser.id)
            .then(res => setLikedPosts(res.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <div>
            <h4>Account Details</h4>
            <div className='d-flex'>
                <p className='fw-bold col-1'>Name: </p>
                <p>{loggedInUser.firstName} {loggedInUser.lastName} </p>
            </div>
            <div className='d-flex'>
                <p className='fw-bold col-1'>Email: </p>
                <p>{loggedInUser.username}</p>
            </div>

            <h4 className='mt-5 mb-3 pt-5'>My Favorites</h4>
            <div className="d-flex justify-content-between pt-2">
                {/* Two features that had been added, but unfortunately I had a critical error I couldn't find and I had to revert back to my last git push. These features will be added again soon.*/}
                <div className="ms-5">
                    <h5>Favorite Blogs</h5>
                    <ul>
                        {favoriteBlogs.map( (blog, i) => {
                            return (
                                <li key={i}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link> by {blog.creator.firstName} {blog.creator.lastName}</li>
                            )
                        })}
                    </ul>
                </div>
                <div className='w-50'>
                    <h5>Liked Posts</h5>
                    <ul>
                        {likedPosts.map( (post, i) => {
                            return (
                                <li key={i}><Link to={`/blogs/${post.parentBlog.id}/posts/${post.id}`}>{post.title}</Link></li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        
        </div>
    );
};


export default AccountDetails;