import React, { useState } from 'react';
import './Login.css';

import api from '../services/api';

import logo from '../assets/logo.svg';

export default function Login({ history }) {
  const [username, setUsername] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    const { _id, avatar } = await api.createUser(username);
    console.log(avatar)

    history.push(`/dev/${_id}`);
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <img src={logo} alt="TinDev" />
        <input
          placeholder="Usuário do Github"
          value={username}
          onChange={e => setUsername(e.target.value)} />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
