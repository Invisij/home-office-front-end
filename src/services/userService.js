import axios from '../axios';

const userService = {
    handleLogin(email, password) {
        return axios.post(`/v1/api/login`, { email, password });
    },
    getUser(firstName) {
        return axios.get(`/v1/api/read-user?firstName=${firstName || ''}`);
    },
    createUser(data) {
        return axios.post(`/v1/api/create-user`, data);
    },
    deleteUser(id) {
        return axios.delete(`/v1/api/delete-user`, {
            data: {
                id,
            },
        });
    },
    updateUser(data) {
        return axios.put(`/v1/api/update-user`, data);
    },
};

export default userService;
