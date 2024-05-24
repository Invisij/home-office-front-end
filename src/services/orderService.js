import axios from '../axios';

const orderService = {
    readOrder(name) {
        return axios.get(`/v1/api/read-order?name=${name || ''}`);
    },
    readOrderById(id) {
        return axios.get(`/v1/api/read-order?id=${id || ''}`);
    },
    createOrder(data) {
        return axios.post(`/v1/api/create-order`, data);
    },
    deleteOrder(id) {
        return axios.delete(`/v1/api/delete-order`, {
            data: {
                id,
            },
        });
    },
    updateOrder(data) {
        return axios.put(`/v1/api/update-order`, data);
    },
};

export default orderService;
