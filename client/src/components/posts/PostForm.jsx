import React, {useState} from 'react';

const PostForm = props => {
    const {errors, postInfo, onSubmitProp, mode, comments} = props
    const [postFormInfo, setPostFormInfo] = useState(postInfo)

    // When a user types in the form, it will update the state.
    const handleChange = e => {
        setPostFormInfo({...postFormInfo, [e.target.name]: e.target.value})
    }

    // On submit, set the post's comments to be the comments passed down from the Edit Form. This line does nothing if nothing is passed. Then, use the passed down onSubmitProp to perform the correct logic (either create or update a post).
    const submit = e => {
        e.preventDefault();
        postFormInfo.comments = comments;
        onSubmitProp(postFormInfo)
    }

    return (
        <div>
            {/* Depending on the current mode, changes the header appropriately. */}
            <h4>{mode == "create" ? "Create a New" : "Edit"} Post</h4>

            {/* Maps any errors that are returned from the API call so the user knows what to fix. */}
            {errors.map((error, i) => {
                return (
                    <p key={i} className='text-danger'>*{error}</p>
                )
            })}
            <form onSubmit={submit} className="mt-3">
                <div className="w-50">
                    <div className="d-flex align-items-center mb-3">
                        <label htmlFor="title" className="fw-bold col-3">Title: </label>
                        <input onChange={handleChange} type="text" name="title" id="title" className='form-control' value={postFormInfo.title}/>
                    </div>
                    <label htmlFor="description" className="fw-bold">Content: </label>
                </div>
                <textarea name="content" id="content" className="form-control mt-3" onChange={handleChange} rows="11"  value={postFormInfo.content}></textarea>
                <p className='small-text'>*Press enter to start a new line.</p>
                <input type="submit" value="Submit Post" className="btn btn-secondary" />
            </form>
        </div>
    );
};


export default PostForm;