import axios from '../axios';

const cartProductService = {
    readCartProduct(cartId, productId) {
        return axios.get(`/v1/api/read-cart-product?cartId=${cartId || ''}&productId=${productId || ''}`);
    },
    readCartProductById(id) {
        return axios.get(`/v1/api/read-cart-product?id=${id || ''}`);
    },
    createCartProduct(data) {
        return axios.post(`/v1/api/create-cart-product`, data);
    },
    deleteCartProduct({ id, cartId, productId }) {
        return axios.delete(`/v1/api/delete-cart-product`, {
            data: {
                id,
                cartId,
                productId,
            },
        });
    },
    updateCartProduct(data) {
        return axios.put(`/v1/api/update-cart-product`, data);
    },
};

export default cartProductService;
