import axiosClient from '../axiosClient';

const ratingApi = {
    add: (params) => {
        const url = '/rating/add.php';
        return axiosClient.post(url, params);
    },
    get: (params) => {
        const url = '/rating/get.php';
        return axiosClient.get(url, { params });
    },
    getByIdUser: (params) => {
        const url = '/rating/getByIdUser.php';
        return axiosClient.get(url, { params });
    },
    statistical: (params) => {
        const url = '/rating/statistical.php';
        return axiosClient.get(url, { params });
    },
};
export default ratingApi;
