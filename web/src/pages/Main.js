import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import './Main.css'

import logo from '../assets/logo.svg';
import like from '../assets/like.svg';
import dislike from '../assets/dislike.svg';
import itsamatch from '../assets/itsamatch.png'

import api, { apiURL } from '../services/api';

export default function Main({ match }) {
  const [users, setUsers] = useState([]);
  const [matchDev, setMatchDev] = useState(null);

  useEffect(() => {
    async function loadUsers() {
      const users = await api.users(match.params.id);
      setUsers(users);
    }

    loadUsers();
  }, [match.params.id]);

  useEffect(() => {
    const socket = io(apiURL, {
      query: { user: match.params.id }
    });

    socket.on('match', dev => {
      setMatchDev(dev);
    });
  }, [match.params.id]);

  function updateUserWithout(id) {
    setUsers(users.filter(user => user._id !== id))
  }

  async function handleLike(id) {
    const response = await api.like(id, match.params.id);
    console.log({ response });
    updateUserWithout(id);
  }

  async function handleDislike(id) {
    const response = await api.dislike(id, match.params.id);
    console.log({ response });
    updateUserWithout(id);
  }

  return (
    <div className="main-container">
      <Link to="/">
        <img src={logo} alt="TinDev" />
      </Link>
      {users.length > 0 ? (
        <ul>
          {users.map(user => (
            <li key={user._id}>
              <img src={user.avatar} alt="Avatar não disponível" />
              <footer>
                <strong>{user.name}</strong>
                <p>{user.bio}</p>
              </footer>

              <div className="buttons">
                <button type="button" onClick={() => handleDislike(user._id)}>
                  <img src={dislike} alt="dislike" />
                </button>
                <button type="button" onClick={() => handleLike(user._id)}>
                  <img src={like} alt="like" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
          <div className="empty">Acabou :(</div>
        )}
      { matchDev && (
        <div className="match-container">
          <img src={itsamatch} alt="It's a match" />
          <img className="avatar" src={matchDev.avatar} alt="user" />
          <strong>{matchDev.name}</strong>
          <p>{matchDev.bio}</p>

          <button onClick={() => setMatchDev(null)} type="button">FECHAR</button>
        </div>
      ) }
    </div>
  );
}
