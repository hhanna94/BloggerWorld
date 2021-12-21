import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PostForm from '../../components/posts/PostForm';
import PostService from '../../services/PostService';

const EditPost = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [postInfo, setPostInfo] = useState({})
    const [errors, setErrors] = useState([])
    const [loaded, setLoaded] = useState(false)

    useEffect( () => {
        PostService.getPost(params.id)
            .then(res => {
                setPostInfo(res.data)
                setLoaded(true)
            })
            .catch(err => console.log(err))
    }, [])

    const editPost = post => {
        PostService.editPost(post)
            .then(res => {
                console.log(res)
            })
            .catch(err => console.log(err))
    }
    const deletePost = () => {
        PostService.deletePost(postInfo.id)
            .then( () => {
                navigate(`/blogs/${postInfo.parentBlog.id}`)
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            {loaded && <PostForm postInfo={postInfo} errors={errors} onSubmitProp={editPost} mode={"edit"}/>}
            <button onClick={deletePost} className="btn btn-danger float-end">Delete</button>
        </div>
    );
};


export default EditPost;