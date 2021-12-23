import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PostService from '../../services/PostService';

const SearchResults = props => {
    const {toggleUpdate} = props
    const {searchBy, searchText} = useParams();
    const [loaded, setLoaded] = useState(false)
    const [posts, setPosts] = useState([])

    useEffect(() => {
        setLoaded(false)
        if (searchBy === "postTitle") {
            PostService.getPostsByTitle(searchText)
                .then(res => {
                    setPosts(res.data)
                    setLoaded(true)
                })
                .catch(err => console.log(err))
        }
        else if (searchBy === "author") {
            PostService.getPostsByAuthor(searchText)
                .then(res => {
                    setPosts(res.data)
                    setLoaded(true)
                })
                .catch(err => console.log(err))
        }
        else if (searchBy === "postText") {
            PostService.getPostsByContent(searchText)
                .then(res => {
                    setPosts(res.data)
                    setLoaded(true)
                })
                .catch(err => console.log(err))

        }
    }, [toggleUpdate])

    return (
        <div className='sub-container overflow-auto'>
            <h3 className="text-center">Post Results</h3>
            {!loaded ? <p>No blogs found!</p> : 
            
            <div className="mt-3">
                {posts.map( (post, i) => {
                    return (
                        <div key={i} className={`mini-container mt-3 py-2 text-${post.parentBlog.theme}`}>
                            <div className="d-flex align-items-baseline">
                                <Link to={`/blogs/${post.parentBlog.id}/posts/${post.id}`} className={`fs-4 me-3 link-${post.parentBlog.theme}`}>{post.title}</Link>
                                <p className="mb-1">by {post.parentBlog.creator.firstName} {post.parentBlog.creator.lastName}</p>
                            </div>
                            <p className="ms-3 mt-0">{post.content.slice(0,500)}{post.content.length > 500? "..." : ""}</p>
                        </div>
                    )
                })}
            </div>}
        </div>
    );
};


export default SearchResults;