import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PostForm from '../../components/posts/PostForm';
import PostService from '../../services/PostService';
import CommentService from '../../services/CommentService'

const EditPost = props => {
    const {loggedInUser} = props
    const params = useParams();
    const navigate = useNavigate();

    // useState for the form, to pass down the default post information (which will be set during the useEffect) and any form errors to the Form component
    const [postInfo, setPostInfo] = useState({})
    const [errors, setErrors] = useState([])
    const [comments, setComments] = useState([])

    // useState to set whether the useEffect has been completed and the component is actually ready to load.
    const [loaded, setLoaded] = useState(false)

    // useEffect that calls on the API to get post details and posts' comments. Because of the way the back-end is set up, comments are not available from the post JSON and have to be fetched separately or they will be lost upon editing a post.
    useEffect( () => {
        PostService.getPost(params.id)
            .then(res => {
                setPostInfo(res.data)
            })
            .catch(err => console.log(err))
            CommentService.getPostComments(params.id)
            .then(res => {
                setComments(res.data)
                setLoaded(true)
            })
            .catch(err => console.log(err))
    }, [])

    // Logic for what the submit button should do on the form. First, verifies whether or not the logged in user own's the blog post. If they do not, redirect them to the home page. If they are allowed to make then edit, then call on the API to edit the post, then redirect them back to the blog post. If there was anything wrong with the form submission, send the errors to the form to be displayed so the user knows what they did wrong.
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

    // Logic for deleting a post. Similar to edit, it first checks whether the logged in user is allowed to delete the post (if they are the one who created the blog). Then, it calls on the API to delete the post and redirects back to the parent blog.
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