import React, {useState, useEffect} from 'react';

import { useParams, useNavigate } from 'react-router-dom';
import BlogForm from '../../components/blogs/BlogForm';
import BlogService from '../../services/BlogService';

const EditBlog = props => {
    // Categories array and logged in user passed down from MyAccount, to be passed down again to the actual Blog Form. Also, toggleReload passed down from MyAccount which will be used to force the useEffect to run on the Account Nav sidebar when a blog is deleted.
    const {categories, toggleReload, setToggleReload, loggedInUser} = props

    // Used to pull the blog ID from the URL
    const params  = useParams();

    // Used to redirect the user
    const navigate = useNavigate();

    // Used for the blog form, is passed down to the actual form component
    const [blogInfo, setBlogInfo] = useState({})
    const [errors, setErrors] = useState([])

    // Used to set whether or not the form component should be displayed.
    const [loaded, setLoaded] = useState(false)

    // useEffect to get the blog information from the URL. If it's successful, then set blogInfo to be the response from the API call and tell React to load the Blog Form component. This will set the default information in the form to be that of the blog the user is trying to edit.
    useEffect( () => {
        BlogService.getBlog(params.id)
            .then(res => {
                setBlogInfo(res.data)
                setLoaded(true)
            })
            .catch(err => console.log(err))
    }, [])

    // Logic for when the user submits the blog form when it is in edit mode. If the user is allowed to make the edit, then call on the API to edit the blog in the database, then redirect the user to the blog's page.
    const editBlog = blog => {
        // A check to make sure the user owns the blog, if they don't then redirect them to the home page. This is to prevent people from editing other people's blogs.
        if (loggedInUser.id !== blogInfo.creator.id) {
            navigate("/")
            return;
        }

        BlogService.editBlog(blog)
                .then(res => navigate(`/blogs/${res.data.id}`))
                // If there are errors, then set the errors array that is passed into the form component to be those errors, so that the user will know what they need to fix.
                .catch(err => setErrors(err.response.data.messages))
    }

    // When the user clicks the delete button, if the user is allowed to delete, then call on the API to delete the blog from the database. If successful, force the useEffect on the side nav to run so that the blog no longer appears in the list. Navigate back to the details part of MyAccount.
    const deleteBlog = () => {
        // A check to make sure the user owns the blog, if they don't then redirect them to the home page. This is to prevent people from deleting other people's blogs.
        if (loggedInUser.id !== blogInfo.creator.id) {
            navigate("/")
            return;
        }
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