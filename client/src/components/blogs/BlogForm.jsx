import React, { useState } from 'react';

const BlogForm = props => {
    // Props passed down from the CreateBlog or EditBlog Views that are used in the form.
    const {categories, errors, blogInfo, onSubmitProp, mode} = props

    // By default, the data displayed in the form should be set to whatever was passed down in the props. If it's from the edit, it will be the existing blog's information, otherwise it will be mostly empty strings, the logged in user as the creator, and the theme set by default to default.
    const [blogFormInfo, setBlogFormInfo] =  useState(blogInfo)

    // Themes list based on the CSS themes created in App.css. Used to change certain elements of styling of blogs and their posts.
    const themes = ["default", "nautical", "woods", "pink"]

    // Updates the form's useState as the user types in the form fields
    const handleChange = e => {
        setBlogFormInfo({...blogFormInfo, [e.target.name]: e.target.value})
    }

    // Upon submitting the form, use the proper mode's onSubmitProp, which is either the edit API call or the create API call.
    const submit = e => {
        e.preventDefault();
        onSubmitProp(blogFormInfo)
    }

    return (
        <div>
            {/* Logic to change the header based on whether it is edit or create mode. */}
            <h4>{mode == "create" ? "Create a New" : "Edit"} Blog</h4>

            {/* If there are errors in creating/editing the blog, map them here so the user knows what to fix. */}
            {errors.map((error, i) => {
                return (
                    <p key={i} className='text-danger'>*{error}</p>
                )
            })}
            <form onSubmit={submit} className="mt-3">
                <div className="w-50">
                    <div className="d-flex align-items-center mb-3">
                        <label htmlFor="title" className="fw-bold col-3">Title: </label>
                        <input onChange={handleChange} type="text" name="title" id="title" className='form-control' value={blogFormInfo.title}/>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                        <label htmlFor="category" className="fw-bold col-3">Category: </label>
                        <select name="category" id="category" onChange={handleChange} className="form-select w-25" value={blogFormInfo.category}>
                            <option value="">-----</option>
                            {/* Add the categories as options for the select field, passed all the way from the App.jsx file. */}
                            {categories.map( (category, i) => {
                                return (
                                    <option key={i} value={category}>{category}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                        <label htmlFor="theme" className="fw-bold col-3">Theme: </label>
                        <select name="theme" id="theme" onChange={handleChange} className="form-select w-25" value={blogFormInfo.theme}>
                            {/* Add the themes as options for the select field.  */}
                            {themes.map( (theme, i) => {
                                return (
                                    <option key={i} value={theme}>{theme}</option>
                                )
                            })}
                        </select>
                    </div>
                    <label htmlFor="description" className="fw-bold">Description: </label>
                </div>
                <textarea name="description" id="description" className="form-control mt-3" onChange={handleChange} rows="8"  value={blogFormInfo.description}></textarea>
                <p className='small-text'>*Press enter to start a new line.</p>
                <input type="submit" value="Submit Blog" className="btn btn-secondary" />
            </form>
        </div>
    );
};


export default BlogForm;