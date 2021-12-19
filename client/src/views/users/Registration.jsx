import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../../services/UserService';

const Registration = () => {
    const [userInfo, setUserInfo] = useState({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        confirmPassword: "",
    })
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const handleChange = e => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        })
    }

    const register = e => {
        e.preventDefault();
        UserService.register(userInfo)
            .then(res => navigate("/login"))
            .catch(err => setErrors(err.response.data.messages))
    }

    return (
        <div className='container w-25 sub-container d-flex flex-column justify-content-between '>
            <h3 className='text-center fw-bold'>Registration</h3>
            {/* If there are errors in the registration form, add an overflow div for the errors. This is to prevent the container from getting so large that it extends past the gray. */}
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