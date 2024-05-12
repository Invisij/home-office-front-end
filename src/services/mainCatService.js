import axios from '../axios';

const mainCatService = {
    readMainCat(name) {
        return axios.get(`/v1/api/read-main-cat?name=${name || ''}`);
    },
    createMainCat(data) {
        return axios.post(`/v1/api/create-main-cat`, data);
    },
    deleteMainCat(id) {
        return axios.delete(`/v1/api/delete-main-cat`, {
            data: {
                id,
            },
        });
    },
    updateMainCat(data) {
        return axios.put(`/v1/api/update-main-cat`, data);
    },
};

export default mainCatService;
