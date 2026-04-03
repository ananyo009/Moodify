import axios from "axios";

const api = axios.create({
  baseURL: "https://moodify-u98o.onrender.com/api",
  withCredentials: true,
});

export const getSongs = async ({ mood }) => { 
    const response = await api.get('/songs?mood=' + mood);

    return response.data
}