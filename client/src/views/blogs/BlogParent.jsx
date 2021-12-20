import React from 'react';
import { Route, Routes } from 'react-router-dom';

import ViewBlog from './ViewBlog';

const BlogParent = () => {
    return (
        <div className='container sub-container w-75'>
            <Routes>
                <Route exact path=":id" element={<ViewBlog />}/>
            </Routes>
        </div>
    );
};


export default BlogParent;