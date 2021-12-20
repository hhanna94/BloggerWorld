import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import UserService from '../../services/UserService';

const Login = props => {
    const {toggleUpdate, setToggleUpdate} = props
    const [loginInfo, setLoginInfo] = useState({username: "", password: ""});
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const handleChange = e => {
        setLoginInfo({
            ...loginInfo,
            [e.target.name]: e.target.value
        })
    }

    const login = e => {
        e.preventDefault();
        UserService.login(loginInfo)
            .then(res => localStorage.setItem("auth", res.data.body.accessToken))
            .then(() => setToggleUpdate(!toggleUpdate))
            .then(() => navigate("/"))
            .catch(err => setErrors(err.response.data.messages))
    }


    return (
        <div className='container w-25 sub-container d-flex flex-column justify-content-between'>
            <h3 className='text-center fw-bold'>Login</h3>
            {errors.map( (error, i) => {
                return (
                    <p className="my-0 text-danger" key={i}>*{error}</p>
                )
            })}
            <form onSubmit={login} className='container w-75 d-flex flex-column gap-3 mt-3'>
                <input onChange={handleChange} type="text" name="username" id="username" placeholder='username' className='form-control'/>
                <input onChange={handleChange} type="password" name="password" id="password" placeholder='password' className='form-control'/>
                <div className="d-flex justify-content-center">
                    <input className="btn btn-secondary mb-3" type="submit" value="Login" />
                </div>
            </form>
            <a className="text-center" href="/register">New here? Click here to register!</a>
        </div>
    );
};


export default Login;
