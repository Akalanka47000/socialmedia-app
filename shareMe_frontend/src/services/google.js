import axios from 'axios';

const google = axios.create({
    baseURL: 'https://www.googleapis.com/oauth2/v3',
    headers: {
        'Content-Type': 'application/json',
    },
});

google.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('google_access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

export const getUserInfo = async (accessToken) => {
    const response = await google.get('/userinfo', {
        params: {
            access_token: accessToken,
        },
    });
    return response.data;
}