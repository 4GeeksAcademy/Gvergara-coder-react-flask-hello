import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer';

const backend_url = import.meta.env.VITE_BACKEND_URL;

const Profile = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${backend_url}private`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Falló la autenticación del usuario.');
        }
        return response.json();
      })
      .then((data) => {
        setIsLoading(false);
        if (data.user) {
          dispatch({
            type: 'set_current_user',
            payload: data.user,
          });
        } else {
          dispatch({
            type: 'set_current_user',
            payload: null,
          });
          navigate('/login');
        }
        console.log(data);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.message);
        console.error('Error de autenticación', err);
        dispatch({
          type: 'set_current_user',
          payload: null,
        });
        navigate('/login'); 
      });
  }, [dispatch, navigate]);

  if (isLoading) {
    return <h1 className="text-center">Cargando perfil...</h1>;
  }

  if (error) {
    return <h1 className="text-center">Error: {error}</h1>;
  }

  if (!store.currentUser) {
    return <h1 className="text-center">No estás autorizado</h1>;
  }

  return (
    <div className="text-center">
      <h1>Perfil</h1>
      <p>email: {store.currentUser.email}</p>
    </div>
  );
};

export default Profile;