import axios from 'axios';

const api = axios.create({
  baseURL: "/api/users",
  withCredentials: true,
});


export async function register({ email, username, password }) {
    try {
        const response = await api.post('/register', { email, username, password });
        return response.data;
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
}

export async function login({ email, username, password }) {
    try {
        const response = await api.post('/login', { email, username, password });
        return response.data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}

export async function getMe() {
    const response = await api.get('/get-me')
    return response.data;
}

export async function logout() {
    const response = await api.get('/logout')
    return response.data;
}