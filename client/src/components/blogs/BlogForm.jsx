import React, { useState } from 'react';

const BlogForm = props => {
    const {categories, errors, blogInfo, onSubmitProp, mode} = props
    const [blogFormInfo, setBlogFormInfo] =  useState(blogInfo)
    const themes = ["default"]


    const handleChange = e => {
        setBlogFormInfo({
            ...blogFormInfo,
            [e.target.name]: e.target.value
        })
    }

    const submit = e => {
        e.preventDefault();
        onSubmitProp(blogFormInfo)
    }



    return (
        <div>
            <h4>{mode == "create" ? "Create a New" : "Edit"} Blog</h4>
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