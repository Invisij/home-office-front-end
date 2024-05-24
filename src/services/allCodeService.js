import axios from '../axios';

const allCodeService = {
    readAllCode(type) {
        return axios.get(`/v1/api/get-all-code?type=${type || ''}`);
    },
};

export default allCodeService;
