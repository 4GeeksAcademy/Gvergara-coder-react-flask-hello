import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import useGlobalReducer from "../hooks/useGlobalReducer";

const backend_url = import.meta.env.VITE_BACKEND_URL

const Profile = () => {
  const { store, dispatch } = useGlobalReducer()
  const navigate = useNavigate()

  useEffect(() => {

    fetch(`${backend_url}private`, {
      method: "GET",
      headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
    })

      .then((response) => {
        if(!response.ok){
        }
        return response.json()
      })

      .then((data) => {
        if (data.user){
          dispatch({
            type: "set_current_user",
            payload: data.user
          })
        }
        navigate("/profile")
        console.log(data);
      }
      )
      .catch((err) => {
        console.error("Login error", err);
      })

  }, [])
  if (store.currenUser == null){
    return <h1 className='text-center'> You are not allowed </h1>
  }

  if (store.currenUser){

    return (
      <div className='text-center'>
        <h1>Profile</h1>
        <p>email: {store.currenUser.email}</p>
      </div>
    )
  }
}

export default Profile