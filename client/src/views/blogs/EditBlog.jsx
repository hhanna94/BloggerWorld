import React, {useState, useEffect} from 'react';

import { useParams, useNavigate } from 'react-router-dom';
import BlogForm from '../../components/blogs/BlogForm';
import BlogService from '../../services/BlogService';

const EditBlog = props => {
    const params  = useParams();
    const navigate = useNavigate();
    const {categories, toggleReload, setToggleReload} = props
    const [blogInfo, setBlogInfo] = useState({})
    const [errors, setErrors] = useState([])
    const [loaded, setLoaded] = useState(false)


    useEffect( () => {
        BlogService.getBlog(params.id)
            .then(res => {
                setBlogInfo(res.data)
                setLoaded(true)
            })
            .catch(err => console.log(err))
    }, [])


    const editBlog = blog => {
        BlogService.editBlog(blog)
                .then(res => {
                    console.log("blog updated")
                    navigate(`/blogs/${res.data.id}`)
                })
                .catch(err => setErrors(err.response.data.messages))
    }

    const deleteBlog = () => {
        BlogService.deleteBlog(blogInfo.id)
            .then( () => {
                setToggleReload(!toggleReload)
                navigate("/myaccount/details")
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            {loaded && <BlogForm categories={categories} onSubmitProp={editBlog} errors={errors} blogInfo={blogInfo} mode={"edit"}/>}
            <button onClick={deleteBlog} className="btn btn-danger float-end">Delete</button>
        </div>
    );
};


export default EditBlog;