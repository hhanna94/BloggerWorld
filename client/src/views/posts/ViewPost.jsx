import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CommentService from '../../services/CommentService';
import PostService from '../../services/PostService';

const ViewPost = props => {
    const {loggedInUser} = props
    const navigate = useNavigate();
    const params = useParams();

    // useStates for the comment form to use.
    const [postData, setPostData] = useState({})
    const [errors, setErrors] = useState([])
    
    // Sets the default state of the comment form to have the loggedInUser as the user who created the comment by default.
    const [commentData, setCommentData] = useState({
        commentText: "",
        post: "",
        user: loggedInUser
    })
    const [comments, setComments] = useState([])
    
    const [loaded, setLoaded] = useState(false)
    const [toggleReload, setToggleReload] = useState(false)

    // Upon loading the component, use the post ID passed in through the URL and gather post details, and a list of all comments made on that post. This will also set the default post to be the current post.
    useEffect( () => {
        PostService.getPost(params.id)
            .then(res => {
                let post = res.data
                setPostData(post)
                setCommentData({...commentData, post: post})
                setLoaded(true);
                if (loggedInUser.id && post.usersWhoLiked.length > 0 && post.usersWhoLiked.some(user => user.id == loggedInUser.id)) {
                    setHidden(true);
                }
            })
            .catch(err => console.log(err))
        CommentService.getPostComments(params.id)
            .then(res => {
                setComments(res.data)
            })
            .catch(err => console.log(err))
    }, [toggleReload])

    const handleChange = e => {
        setCommentData({...commentData, [e.target.name]: e.target.value})
    }

    // Logic for when a user submits a comment.
    const submit = e => {
        e.preventDefault();
        // Make sure there is a user logged in when creating a comment, if there isn't redirect them to the home page.. This is also checked below.
        if (!loggedInUser.id) {
            navigate("/")
            return;
        }
        // Otherwise, call the API to create the comment. If it succeeds, reset the comment form to default blank text to make it easier to make a new comment if the user wanted to, then trigger a reload of the useEffect to show the updated post with the new comment.
        CommentService.createComment(commentData)
            .then( () => {
                setCommentData({...commentData, commentText: ""})
                setToggleReload(!toggleReload)
            })
            // If it fails, set the errors to be displayed so that the user knows what to fix.
            .catch(err => setErrors(err.response.data.messages))
    }

    // Call on the API to add a post to a user's favorites.
    const [hidden, setHidden] = useState(false)
    const likePost = () => {
        PostService.likePost(postData.id, loggedInUser.id)
            .then(res => {
                setHidden(true)
                setToggleReload(!toggleReload)
            })
            .catch(err => console.log(err))
    }
    
    return (
        <div>
            {loaded && 
            <div className={`text-${postData.parentBlog.theme}`}>
                <h3 className={`text-center header-${postData.parentBlog.theme}`}>{postData.title}</h3>
                <div className='d-flex justify-content-between mb-0'>
                    <p>Written by: {postData.parentBlog.creator.firstName} {postData.parentBlog.creator.lastName}</p>
                    <div className="d-flex gap-3">
                        <p>{postData.usersWhoLiked.length} likes</p>
                        {/* Check if the logged in user is the author of the blog/post -- if they are, then show a link to edit the post. */}
                        {loggedInUser.id == postData.parentBlog.creator.id ? <Link to="edit" className={`link-${postData.parentBlog.theme}`}>edit</Link> : ""}
                    </div>
                </div>
                <hr className="mt-0"/>
                <div>
                    <p style={{whiteSpace: "pre-line"}}>{postData.content}</p>
                    <hr />
                    <div className='d-flex justify-content-between align-items-center mb-3'>
                        {loggedInUser.id && !hidden ? <button onClick={likePost} className={`btn btn-${postData.parentBlog.theme} py-0 px-2`}>like post</button> : <p></p>}
                        <Link to={`/blogs/${postData.parentBlog.id}`} className={`link-${postData.parentBlog.theme}`}>back to blog</Link>
                    </div>
                    {/* Make sure that the user is logged in. If they are, then show them the add comment form. If not, then hide it. */}
                    { loggedInUser.id? 
                    <form onSubmit={submit}>
                        <h5>Add a Comment</h5>
                        {errors.map((error, i) => {
                            return (
                                <p key={i} className='text-danger'>*{error}</p>
                            )
                        })}
                            <textarea name="commentText" id="commentText" className="form-control w-50" style={{height: "75px"}} onChange={handleChange} value={commentData.commentText}></textarea>
                            <input type="submit" value="add comment" className={`btn btn-${postData.parentBlog.theme} mt-2 py-1 px-2`}/>
                    </form> : ""}
                    <h4 className="mt-3">Comments</h4>
                    {/* Display all of the comments on the post. */}
                    {comments.map( (comment, i) => {
                        return (
                            <div key={i}>
                                <p className='mb-0'>On {new Date(comment.createdAt).toLocaleDateString('en-US')} at {new Date(comment.createdAt).toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'})}, {comment.user.firstName} said:</p>
                                <p className='mt-0 mb-3 ms-4'>{comment.commentText}</p>
                                <hr />
                            </div>
                        )
                    })}
                </div>
            </div>
            }
        </div>
    );
};


export default ViewPost;