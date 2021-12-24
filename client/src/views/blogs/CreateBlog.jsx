import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import BlogForm from '../../components/blogs/BlogForm';
import BlogService from '../../services/BlogService';

const CreateBlog = props => {
    // Categories array and logged in user passed down from MyAccount, to be passed down again to the actual Blog Form.
    const {categories, loggedInUser} = props

    // Used to redirect the user
    const navigate = useNavigate();

    // Sets the default blog info that should be displayed on the blog form to be empty strings, but the theme should be the default theme and it also sets the creator of the blog to be the loggedInUser so there doesn't need to be any additional logic in the form component or on the backend.
    const blogInfo = {
        title: "",
        category: "",
        theme: "default",
        description: "",
        creator: loggedInUser
    }
    const [errors, setErrors] = useState([])

    // Upon submitting the blog form in create mode, call on the API to create the blog in the database. If successful, redirect the user to the created blog's page.
    const createBlog = blog => {
        BlogService.createBlog(blog)
                .then(res => navigate(`/blogs/${res.data.id}`))
                // If there are errors, then set the errors array that is passed into the form component to be those errors, so that the user will know what they need to fix.
                .catch(err => setErrors(err.response.data.messages))
    }

    return (
        <div>
            <BlogForm categories={categories} onSubmitProp={createBlog} errors={errors} blogInfo={blogInfo} mode={"create"}/>
        </div>
    );
};


export default CreateBlog;