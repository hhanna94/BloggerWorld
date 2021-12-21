import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostForm from '../../components/posts/PostForm';
import PostService from '../../services/PostService';

const CreatePost = props => {
    const navigate = useNavigate();
    const {blog} = props
    const [errors, setErrors] = useState([])
    const postInfo = {title: "", content: "", parentBlog: blog}

    const createPost = post => {
        PostService.createPost(post)
            .then(res => navigate(`/blogs/${blog.id}/posts/${res.data.id}`))
            .catch(err => setErrors(err.response.data.messages))
    }

    return (
        <div>
            <PostForm errors={errors} postInfo={postInfo} onSubmitProp={createPost} mode="create" />
        </div>
    );
};


export default CreatePost;