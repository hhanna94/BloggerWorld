import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PostService from '../../services/PostService';

const Home = () => {
    // UseStates used in the useEffect to set the randomPosts array and set that the randomPosts array has been filled, so we can load the content
    const [randomPosts, setRandomPosts] = useState([])
    const [loaded, setLoaded] = useState(false)

    // UseEffect to perform the API call to get all posts
    useEffect( () => {
        PostService.getAllPosts()
            .then(res => {
                // Logic to check if the API call returns an array that is smaller than 3 posts -- if so, this would cause the while loop to turn into an infinite loop so we need to skip the below logic.
                if (res.data.length < 3) {
                    setRandomPosts(res.data)
                    setLoaded(true)
                    return
                }
                // Logic to go through the list of posts returned from the API call and generate a list of 3 posts randomly to display on the home page. The logic requires the posts to be unique, so there will not be any duplicate posts displayed.
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
                {/* Map the random posts generated earlier in the useEffect to 3 divs that use their parent blog's theme. Cuts the post content off at 400 characters so as to prevent the div from overflowing. */}
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