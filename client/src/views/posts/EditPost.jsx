import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PostForm from '../../components/posts/PostForm';
import PostService from '../../services/PostService';
import CommentService from '../../services/CommentService'

const EditPost = props => {
    const {loggedInUser} = props
    const params = useParams();
    const navigate = useNavigate();
    const [postInfo, setPostInfo] = useState({})
    const [errors, setErrors] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [comments, setComments] = useState([])

    useEffect( () => {
        PostService.getPost(params.id)
            .then(res => {
                setPostInfo(res.data)
                setLoaded(true)
            })
            .catch(err => console.log(err))
        CommentService.getPostComments(params.id)
            .then(res => {
                setComments(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    const editPost = post => {
        if (loggedInUser.id !== postInfo.parentBlog.creator.id) {
            navigate("/")
            return;
        }
        PostService.editPost(post)
            .then(res => {
                navigate(`/blogs/${postInfo.parentBlog.id}/posts/${res.data.id}`)
            })
            .catch(err => setErrors(err.response.data.messages))
    }
    const deletePost = () => {
        if (loggedInUser.id !== postInfo.parentBlog.creator.id) {
            navigate("/")
            return;
        }
        PostService.deletePost(postInfo.id)
            .then( () => {
                navigate(`/blogs/${postInfo.parentBlog.id}`)
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            {loaded && <PostForm postInfo={postInfo} errors={errors} onSubmitProp={editPost} mode={"edit"} comments={comments}/>}
            <button onClick={deletePost} className="btn btn-danger float-end">Delete</button>
        </div>
    );
};


export default EditPost;