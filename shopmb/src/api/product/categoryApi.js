import axiosClient from '../axiosClient';
const categoryApi = {
    post: (params) => {
        const url = '/products/category/add.php';
        return axiosClient.post(url, params);
    },
    get: (params) => {
        const url = `/products/category/get.php`;
        return axiosClient.get(url, { params });
    },
    getALL: () => {
        const url = '/products/category/get.php';
        return axiosClient.get(url);
    },
    getById: (params) => {
        const url = '/products/category/getById.php';
        return axiosClient.get(url, { params });
    },
    update: (params) => {
        const url = '/products/category/update.php';
        return axiosClient.post(url, params);
    },
    delete: (params) => {
        const url = '/products/category/delete.php';
        return axiosClient.get(url, { params });
    },
};
export default categoryApi;
