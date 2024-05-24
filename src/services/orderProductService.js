import axios from '../axios';

const orderProductService = {
    readOrderProduct(orderId, productId) {
        return axios.get(`/v1/api/read-order-product?orderId=${orderId || ''}&productId=${productId || ''}`);
    },
    readOrderProductByOrderId(orderId) {
        return axios.get(`/v1/api/read-order-product?orderId=${orderId || ''}`);
    },
    readOrderProductById(id) {
        return axios.get(`/v1/api/read-order-product?id=${id || ''}`);
    },
    createOrderProduct(data) {
        return axios.post(`/v1/api/create-order-product`, data);
    },
    deleteOrderProduct(id) {
        return axios.delete(`/v1/api/delete-order-product`, {
            data: {
                id,
            },
        });
    },
    updateOrderProduct(data) {
        return axios.put(`/v1/api/update-order-product`, data);
    },
};

export default orderProductService;
