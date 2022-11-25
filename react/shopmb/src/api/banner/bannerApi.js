import axiosClient from '../axiosClient';

const bannerApi = {
    post: (params) => {
        const url = '/banner/add.php';
        return axiosClient.post(url, params);
    },
    get: (params) => {
        const url = 'banner/get.php';
        return axiosClient.get(url, { params });
    },
    update: (params) => {
        const url = '/banner/update.php';
        return axiosClient.post(url, params);
    },
    delete: (params) => {
        const url = 'banner/delete.php';
        return axiosClient.get(url, { params });
    },
};

export default bannerApi;
