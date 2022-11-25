import axiosClient from '../axiosClient';

const categoryApi = {
    post: (params) => {
        const url = '/news/category/add.php';
        return axiosClient.post(url, params);
    },
    get: (params) => {
        const url = '/news/category/get.php';
        return axiosClient.get(url, { params });
    },
    update: (params) => {
        const url = '/news/category/update.php';
        return axiosClient.post(url, params);
    },
    delete: (params) => {
        const url = '/news/category/delete.php';
        return axiosClient.get(url, { params });
    },
};

export default categoryApi;
