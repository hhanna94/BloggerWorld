import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../../services/UserService';

const Registration = () => {
    // useStates for the registration form that are used in the register method. By default, userInfo is an object full of empty strings for all of the fields.
    const [userInfo, setUserInfo] = useState({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        confirmPassword: "",
    })
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    // Updates the registration useState as the user types in the registration form fields
    const handleChange = e => {
        setUserInfo({...userInfo, [e.target.name]: e.target.value})
    }

    // Upon submitting the registration form, prevent the default (which will cause a page refresh and the rest of the logic to be ignored.) Then call on the API to register the user. As long as they filled out the form correctly, then redirect the user to the login page so that they can log in.
    const register = e => {
        e.preventDefault();
        UserService.register(userInfo)
            .then(res => navigate("/login"))

            // If there are errors, display those errors on the form so the user knows what went wrong.
            .catch(err => setErrors(err.response.data.messages))
    }

    return (
        <div className='container w-25 sub-container d-flex flex-column justify-content-between h-75' style={{minHeight: "450px"}}>
            <h3 className='text-center fw-bold'>Registration</h3>
            {/* If there are errors in the registration form, add an overflow div for the errors to be displayed. This is to prevent the container from getting so large that it extends past the gray. */}
            {errors.length>0 ? <div className="overflow-auto mb-3">
            {errors.map( (error, i) => {
                return (
                    <p className="my-1 text-danger" key={i}>*{error}</p>
                )
            })}
            </div> : ""}
                
            <form onSubmit={register} className='container mt-2'>
                <div className="d-flex align-items-center mb-3">
                    <label htmlFor="firstName" className="fw-bold col-5">First Name: </label>
                    <input onChange={handleChange} type="text" name="firstName" id="firstName" className='form-control'/>
                </div>
                <div className="d-flex align-items-center mb-3">
                <label htmlFor="lastName" className="fw-bold col-5">Last Name: </label>
                    <input onChange={handleChange} type="text" name="lastName" id="lastName" className='form-control'/>
                </div>
                <div className="d-flex align-items-center mb-3">
                <label htmlFor="username" className="fw-bold col-5">Email: </label>
                    <input onChange={handleChange} type="email" name="username" id="username" className='form-control'/>
                </div>
                <div className="d-flex align-items-center mb-3">
                <label htmlFor="password" className="fw-bold col-5">Password: </label>
                    <input onChange={handleChange} type="password" name="password" id="password"  className='form-control'/>
                </div>
                <div className="d-flex align-items-center mb-3">
                <label htmlFor="confirmPassword" className="fw-bold col-5">Confirm Password: </label>
                    <input onChange={handleChange} type="password" name="confirmPassword" id="confirmPassword" className='form-control'/>
                </div>
                <div className="d-flex justify-content-center">
                    <input onChange={handleChange} className="btn btn-secondary mb-3" type="submit" value="Register" />
                </div>
            </form>
            <a className="text-center" href="/login">Already a user? Login here!</a>
        </div>
    );
};


export default Registration;