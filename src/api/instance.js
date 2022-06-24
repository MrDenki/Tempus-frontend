import axios from "axios";

// const API_URL = 'http://localhost:5000'
const API_URL = 'http://10.0.90.227:5000'

const instance = axios.create({
    withCredentials: true,
    baseURL: API_URL
})


instance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
});


instance.interceptors.response.use((config) => config, async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && error.config && !error.config._isRetry) {
            originalRequest._isRetry = true;

            try {
                const response = await instance.get(`/refresh`, {withCredentials: true,});

                // localStorage.setItem("token", response.data.accessToken);
                return instance.request(originalRequest);
            } catch (e) {
                throw e;
            }
        }
    }
);

export default instance;