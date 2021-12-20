import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import BlogForm from '../../components/blogs/BlogForm';
import BlogService from '../../services/BlogService';

const CreateBlog = props => {
    const {categories, loggedInUser, toggleReload, setToggleReload} = props
    const navigate = useNavigate();

    const blogInfo = {
        title: "",
        category: "",
        theme: "default",
        description: "",
        creator: loggedInUser
    }
    const [errors, setErrors] = useState([])

    const createBlog = blog => {
        BlogService.createBlog(blog)
                .then(res => {
                    console.log("Blog successfully created")
                    navigate(`/blogs/${res.data.id}`)
                })
                .catch(err => setErrors(err.response.data.messages))
    }

    return (
        <div>
            <BlogForm categories={categories} onSubmitProp={createBlog} errors={errors} blogInfo={blogInfo} mode={"create"}/>
        </div>
    );
};


export default CreateBlog;