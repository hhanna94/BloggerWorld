import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PostService from '../../services/PostService';

const ViewPost = () => {
    const params = useParams();
    const [postData, setPostData] = useState({})
    const [loaded, setLoaded] = useState(false)

    useEffect( () => {
        PostService.getPost(params.id)
            .then(res => {
                setPostData(res.data)
                setLoaded(true);
            })
            .catch(err => console.log(err))
    }, [])
    
    return (
        <div>
            {loaded && 
            <div>
                <h3 className='text-center'>{postData.title}</h3>
                <div className='d-flex justify-content-between'>
                    <p>Written by: {postData.parentBlog.creator.firstName} {postData.parentBlog.creator.lastName}</p>
                    <div className="d-flex gap-3">
                        <p className="text-danger">xxx likes</p>
                        <Link to="edit">edit</Link>
                    </div>
                </div>
                <div className="overflow-auto" style={{maxHeight: "50vh"}}>
                    <p style={{whiteSpace: "pre-line"}}>{postData.content}</p>
                </div>
                <Link to={`/blogs/${postData.parentBlog.id}`} className='float-end'>back to blog</Link>
            </div>
            }
        </div>
    );
};


export default ViewPost;