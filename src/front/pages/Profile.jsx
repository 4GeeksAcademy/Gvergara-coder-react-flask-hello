import React, { useState } from 'react'

const backend_url = import.meta.env.VITE_BACKEND_URL

const Profile = () => {
  const [isAuth, setIsAuth] = useState(null)
  const [currentUser, setCurrentUSer] = useState(null)
  fetch(`${backend_url}/private`, {
    method: "POST",
    headers: { "Authorization":"Bearer" + localStorage.getItem("token") },
})

    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        if (data.token) {
            localStorage.setItem("token", data.token)
        } else {
            alert("Incorrect login. Please check your email or password.")
        }

    })
    .catch((err) => {
        console.error("Login error", err);

    })
  return (
    <div className='text-center'>
      <h1>Profile</h1>
    </div>
  )
}

export default Profile