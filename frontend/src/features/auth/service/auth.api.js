import axios from 'axios';



const api = axios.create({
    baseURL: 'http://localhost:3000/api/auth',
    withCredentials: true
});


export async function login(username, password) {
    try {
        const res = await api.post('/login', {
            username,
            password
        });
        return res.data;
    } catch (err) {
        console.error("Login error:", err.response?.data || err.message);
        throw err;
    }
}
   


export async function register(username, email, password) {
    try {
        const res = await api.post('/register', {
            username,
            email,
            password
        });
        return res.data;
    } catch (err) {
        console.error("Registration error:", err.response?.data || err.message);
        throw err;
    }
}


export async function getMe() {
    try {
        const res = await api.get('/me');
        return res.data;
    } catch (err) {
        console.error("GetMe error:", err.response?.data || err.message);
        throw err;
    }
}