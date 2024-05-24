import axios from '../axios';

const productService = {
    readProduct(name) {
        return axios.get(`/v1/api/read-product?name=${name || ''}`);
    },
    readProductById(id) {
        return axios.get(`/v1/api/read-product?id=${id || ''}`);
    },
    createProduct(data) {
        return axios.post(`/v1/api/create-product`, data);
    },
    deleteProduct(id) {
        return axios.delete(`/v1/api/delete-product`, {
            data: {
                id,
            },
        });
    },
    updateProduct(data) {
        return axios.put(`/v1/api/update-product`, data);
    },
};

export default productService;
