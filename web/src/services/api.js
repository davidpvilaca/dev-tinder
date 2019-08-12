import axios from 'axios';

const apiURL = process.env.REACT_APP_API_URL || 'http://localhost:3333';

const api = axios.create({
  baseURL: apiURL
});

console.log({ env: process.env.REACT_APP_API_URL })

export { apiURL };

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
