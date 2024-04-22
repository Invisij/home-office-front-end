import axios from '../axios';

const userService = {
    handleLogin(email, password) {
        return axios.post('/v1/api/login', { email, password });
    },
};

export default userService;
