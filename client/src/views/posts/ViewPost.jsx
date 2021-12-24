import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CommentService from '../../services/CommentService';
import PostService from '../../services/PostService';

const ViewPost = props => {
    const {loggedInUser} = props
    const navigate = useNavigate();
    const params = useParams();
    const [postData, setPostData] = useState({})
    const [loaded, setLoaded] = useState(false)
    const [errors, setErrors] = useState([])
    const [commentData, setCommentData] = useState({
        commentText: "",
        post: "",
        user: loggedInUser
    })
    const [comments, setComments] = useState([])
    const [toggleReload, setToggleReload] = useState(false)

    useEffect( () => {
        PostService.getPost(params.id)
            .then(res => {
                setPostData(res.data)
                setCommentData({...commentData, post: res.data})
                setLoaded(true);
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

    const submit = e => {
        e.preventDefault();
        if (!loggedInUser.id) {
            navigate("/")
            return;
        }
        CommentService.createComment(commentData)
            .then( () => {
                setCommentData({...commentData, commentText: ""})
                setToggleReload(!toggleReload)
            })
            .catch(err => setErrors(err.response.data.messages))
    }
    
    return (
        <div>
            {loaded && 
            <div className={`text-${postData.parentBlog.theme}`}>
                <h3 className={`text-center header-${postData.parentBlog.theme}`}>{postData.title}</h3>
                <div className='d-flex justify-content-between mb-0'>
                    <p>Written by: {postData.parentBlog.creator.firstName} {postData.parentBlog.creator.lastName}</p>
                    <div className="d-flex gap-3">
                        <p className="text-danger">xxx likes</p>
                        {loggedInUser.id == postData.parentBlog.creator.id ? <Link to="edit" className={`link-${postData.parentBlog.theme}`}>edit</Link> : ""}
                    </div>
                </div>
                <hr className="mt-0"/>
                <div>
                    <p style={{whiteSpace: "pre-line"}}>{postData.content}</p>
                    <hr />
                    <Link to={`/blogs/${postData.parentBlog.id}`} className={`float-end link-${postData.parentBlog.theme}`}>back to blog</Link>
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