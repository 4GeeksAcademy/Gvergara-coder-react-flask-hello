import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Login from './Login'

const backend_url = import.meta.env.VITE_BACKEND_URL

function Register() {
    const navigate = useNavigate()
    const [registerUser, setRegisterUser] = useState({
        email: "",
        password: ""
    })

    const register = (e) => {
        e.preventDefault()
        fetch(`${backend_url}/signup`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(registerUser)
        })

            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.token) {
                    navigate("/profile")
                } else {
                    alert("Incorrect registration. Please check your email or password.")
                }
            })
            .catch((err) => {
                console.error("Registration error", err);

            })
    }
    return (
        <div className='text-center'>
            <h1>Register here</h1>
            <div className='text-center'><form>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email"
                        className="form-control text-center"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        value={registerUser.email}
                        onChange={(e) => setRegisterUser({ ...registerUser, email: e.target.value })}
                    />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password"
                        className="form-control text-center"
                        id="exampleInputPassword1"
                        value={registerUser.password}
                        onChange={(e) => setRegisterUser({ ...registerUser, password: e.target.value })}
                    />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" for="exampleCheck1">Check me out</label>
                </div>
                <button type="submit"
                    className="btn btn-success"
                    onClick={(e) => register(e)}
                >successfully registered
                </button>
            </form>
            </div>
        </div>
    )
}

export default Register