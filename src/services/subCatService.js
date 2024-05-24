import axios from '../axios';

const subCatService = {
    readSubCat(name) {
        return axios.get(`/v1/api/read-sub-cat?name=${name || ''}`);
    },
    readSubCatById(id) {
        return axios.get(`/v1/api/read-sub-cat?id=${id || ''}`);
    },
    createSubCat(data) {
        return axios.post(`/v1/api/create-sub-cat`, data);
    },
    deleteSubCat(id) {
        return axios.delete(`/v1/api/delete-sub-cat`, {
            data: {
                id,
            },
        });
    },
    updateSubCat(data) {
        return axios.put(`/v1/api/update-sub-cat`, data);
    },
};

export default subCatService;
