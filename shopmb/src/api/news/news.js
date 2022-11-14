import axiosClient from '../axiosClient';

const newsApi = {
    post: (params) => {
        const url = '/news/news/add.php';
        return axiosClient.post(url, params);
    },
    get: (params) => {
        const url = '/news/news/get.php';
        return axiosClient.get(url, { params });
    },
    getById: (params) => {
        const url = '/news/news/getById.php';
        return axiosClient.get(url, { params });
    },
    update: (params) => {
        const url = '/news/news/update.php';
        return axiosClient.post(url, params);
    },
    delete: (params) => {
        const url = '/news/news/delete.php';
        return axiosClient.get(url, { params });
    },
};
export default newsApi;
