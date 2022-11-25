import axiosClient from '../axiosClient';

const orderApi = {
    add: (params) => {
        const url = '/order/add.php';
        return axiosClient.post(url, params);
    },
    get: (params) => {
        const url = '/order/get.php';
        return axiosClient.get(url, { params });
    },
    getById: (params) => {
        const url = '/order/getById.php';
        return axiosClient.get(url, { params });
    },
    update: (params) => {
        const url = '/order/update.php';
        return axiosClient.post(url, params);
    },
};

export default orderApi;
