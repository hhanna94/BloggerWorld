import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PostService from '../../services/PostService';

const Home = () => {
    const [randomPosts, setRandomPosts] = useState([])
    const [loaded, setLoaded] = useState(false)

    useEffect( () => {
        PostService.getAllPosts()
            .then(res => {
                if (res.data.length < 3) {
                    setRandomPosts(res.data)
                    setLoaded(true)
                    return
                }
                let randomNums = []
                let tempPostArr = []
                while (tempPostArr.length < 3) {
                    let r = Math.floor(Math.random() * res.data.length)
                    if (randomNums.indexOf(r) === -1) {
                        randomNums.push(r)
                        tempPostArr.push(res.data[r])
                    }
                }
                setRandomPosts(tempPostArr)
                setLoaded(true)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div>
            { loaded && 
            <div className='d-flex justify-content-between'>
                {randomPosts.map( (post, i) => {
                    return (
                        <div key={i} className={`sub-container w-25 text-center text-${post.parentBlog.theme}`}>
                            <h4 className={`header-${post.parentBlog.theme}`}>{post.title}</h4>
                            <p>by {post.parentBlog.creator.firstName} {post.parentBlog.creator.lastName} </p>
                            <p>{post.content.slice(0, 400)}{post.content.length > 400? "..." : ""}</p>
                            <Link to={`/blogs/${post.parentBlog.id}/posts/${post.id}`} className={`link-${post.parentBlog.theme}`}>read more...</Link>
                        </div>
                    )
                })}
            </div> }
        </div>
    );
};


export default Home;