import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const backend_url = import.meta.env.VITE_BACKEND_URL

function Login() {
    const navigate = useNavigate()
    const [loginUser, setLoginUser] = useState({
        email: "",
        password: ""
    })

    const login = () => {
        fetch(`${backend_url}/login`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(loginUser)
        })

            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.token) {
                    localStorage.setItem("token", data.token)
                    navigate("/profile")
                } else {
                    alert("Incorrect login. Please check your email or password.")
                }

            })
            .catch((err) => {
                console.error("Login error", err);

            })
    }
    return (
        <div className='text-center'>
            <h1>Login here</h1>
            <form>
                <div className="mb-3 text-center">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email"
                        className="form-control text-center"
                        id="exampleInputEmail1"
                        value={loginUser.email}
                        onChange={(e) => setLoginUser({ ...loginUser, email: e.target.value })}
                        aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password"
                        className="form-control text-center"
                        value={loginUser.password}
                        onChange={(e) => setLoginUser({ ...loginUser, password: e.target.value })}
                        id="exampleInputPassword1" />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" for="exampleCheck1">Check me out</label>
                </div>
                <button type="button"
                    className="btn btn-success"
                    onClick={login}
                >Login</button>
            </form>
        </div>
    )
}

export default Login