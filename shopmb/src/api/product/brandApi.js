import axiosClient from '../axiosClient';

const brandApi = {
    post: (params) => {
        const url = '/products/brand/add.php';
        return axiosClient.post(url, params);
    },
    get: (params) => {
        const url = '/products/brand/get.php';
        return axiosClient.get(url, { params });
    },
    getById: (params) => {
        const url = '/products/brand/getById.php';
        return axiosClient.get(url, { params });
    },
    update: (params) => {
        const url = '/products/brand/update.php';
        return axiosClient.post(url, params);
    },
    delete: (params) => {
        const url = '/products/brand/delete.php';
        return axiosClient.get(url, { params });
    },
};

export default brandApi;
