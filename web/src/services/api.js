import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3333'
});

console.log({ env: process.env.REACT_APP_API_URL })

export default {
  createUser: async username => (await api.post('/devs', { username })).data,
  users: async id => (await api.get('/devs', {
    headers: {
      user: id
    }
  })).data,
  dislike: async (id, fromUserId) => (await api.post(`/devs/${id}/dislikes`, {}, {
    headers: {
      user: fromUserId
    }
  })).data,
  like: async (id, fromUserId) => (await api.post(`/devs/${id}/likes`, {}, {
    headers: {
      user: fromUserId
    }
  })).data
};
