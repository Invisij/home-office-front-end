import axios from '../axios';

const cartService = {
    readCart(userId) {
        return axios.get(`/v1/api/read-cart?userId=${userId || ''}`);
    },
    readCartById(id) {
        return axios.get(`/v1/api/read-cart?id=${id || ''}`);
    },
    createCart(data) {
        return axios.post(`/v1/api/create-cart`, data);
    },
    deleteCart(id) {
        return axios.delete(`/v1/api/delete-cart`, {
            data: {
                id,
            },
        });
    },
    updateCart(data) {
        return axios.put(`/v1/api/update-cart`, data);
    },
};

export default cartService;
