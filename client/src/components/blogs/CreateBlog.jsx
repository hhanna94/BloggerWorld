import React, { useState } from 'react';
import BlogService from '../../services/BlogService';

const CreateBlog = props => {
    const {categories, loggedInUser} = props
    const themes = ["default"]
    const [blogInfo, setBlogInfo] = useState({
        title: "",
        category: "",
        theme: "default",
        description: "",
        creator: {creator: loggedInUser.id}
    })

    const handleChange = e => {
        setBlogInfo({
            ...blogInfo,
            [e.target.name]: e.target.value
        })
    }

    const createBlog = e => {
        e.preventDefault();
        BlogService.createBlog(blogInfo)
            .then(res => console.log(res))
            .catch(err => console.log(err.response.data.messages))
    }

    return (
        <div>
            <h4>Create a New Blog</h4>
            <form onSubmit={createBlog} className="w-50 mt-3">
                <div className="d-flex align-items-center mb-3">
                    <label htmlFor="title" className="fw-bold col-3">Title: </label>
                    <input onChange={handleChange} type="text" name="title" id="title" className='form-control'/>
                </div>
                <div className="d-flex align-items-center mb-3">
                    <label htmlFor="category" className="fw-bold col-3">Category: </label>
                    <select name="category" id="category" onChange={handleChange} className="form-select w-25">
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
                    <select name="theme" id="theme" onChange={handleChange} className="form-select w-25">
                        {themes.map( (theme, i) => {
                            return (
                                <option key={i} value={theme}>{theme}</option>
                            )
                        })}
                    </select>
                </div>
                <label htmlFor="description" className="fw-bold">Description: </label>
                <textarea name="description" id="description" className="form-control mt-3" onChange={handleChange} rows="5"></textarea>
                <p className='small-text'>*Press enter to start a new line.</p>
                <input type="submit" value="Create Blog" className="btn btn-secondary" />
            </form>
        </div>
    );
};


export default CreateBlog;