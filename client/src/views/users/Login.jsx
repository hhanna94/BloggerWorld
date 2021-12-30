import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import UserService from '../../services/UserService';

const Login = props => {
    // Update related props sent down from App.jsx to be used to force a useEffect update on App.jsx upon login.
    const {toggleUpdate, setToggleUpdate} = props

    // useStates for the login form that are used in the login method.
    const [loginInfo, setLoginInfo] = useState({username: "", password: ""});
    const [errors, setErrors] = useState([]);

    // Allows me to redirect the user on successful login
    const navigate = useNavigate();

    // Updates the login useState as the user types the login form fields
    const handleChange = e => {
        setLoginInfo({...loginInfo, [e.target.name]: e.target.value})
    }

    // Upon submitting the login form, prevent the default (which will cause a page refresh and the rest of the logic to be ignored.) Then call on the API to log the user in. If it's successful, save the JWT into local storage. The JWT is used in all API calls (see Interceptors.js) to allow Spring Security to verify if the user is allowed to access whatever they are requesting. After saving the token, force App.jsx useEffect to update and save the user as the logged in user, then redirect to the home page. 
    const login = e => {
        e.preventDefault();
        UserService.login(loginInfo)
            .then(res => localStorage.setItem("auth", res.data.body.accessToken))
            .then(() => setToggleUpdate(!toggleUpdate))
            .then(() => navigate("/"))
            
            // If there are errors, display those errors on the form so the user knows what went wrong.
            .catch(err => setErrors(err.response.data.messages))
    }


    return (
        <div className='container w-25 sub-container d-flex flex-column justify-content-between h-50' style={{minHeight: "320px"}}>
            <h3 className='text-center fw-bold'>Login</h3>
            {/* Map the errors that may or may not have been generated in the login method. */}
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
