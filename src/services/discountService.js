import axios from '../axios';

const discountService = {
    readDiscount(name) {
        return axios.get(`/v1/api/read-discount?name=${name || ''}`);
    },
    readDiscountById(id) {
        return axios.get(`/v1/api/read-discount?id=${id || ''}`);
    },
    createDiscount(data) {
        return axios.post(`/v1/api/create-discount`, data);
    },
    deleteDiscount(id) {
        return axios.delete(`/v1/api/delete-discount`, {
            data: {
                id,
            },
        });
    },
    updateDiscount(data) {
        return axios.put(`/v1/api/update-discount`, data);
    },
};

export default discountService;
