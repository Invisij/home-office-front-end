import axios from '../axios';

const userService = {
    handleLogin(email, password) {
        return axios.post(`/v1/api/login`, { email, password });
    },
    readUser(firstName) {
        return axios.get(`/v1/api/read-user?firstName=${firstName || ''}`);
    },
    readUserById(id) {
        return axios.get(`/v1/api/read-user?id=${id || ''}`);
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
    getAllCode(type) {
        return axios.get(`/v1/api/get-all-code?type=${type || ''}`);
    },
};

export default userService;
