import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostForm from '../../components/posts/PostForm';
import PostService from '../../services/PostService';

const CreatePost = props => {
    const navigate = useNavigate();
    const {blog, loggedInUser} = props
    const [errors, setErrors] = useState([])
    // By default, set the post information to be empty strings except for the parent Blog, which was passed down from the BlogParent.
    const postInfo = {title: "", content: "", parentBlog: blog}

    // When the user clicks the submit button on the PostForm component, verify that the user that is logged in is the user who created the blog/post. If not, redirect them to the home page. If they are, then call on the API to create a post. if successful, redirect to the blog post. If not, then set the errors to be displayed on the form so the user knows what to fix.
    const createPost = post => {
        if (loggedInUser.id !== blog.creator.id) {
            navigate("/")
            return;
        }
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