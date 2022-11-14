import axiosClient from '../axiosClient';
const productApi = {
    post: (params) => {
        const url = '/products/product/add.php';
        return axiosClient.post(url, params);
    },
    update: (params) => {
        const url = '/products/product/update.php';
        return axiosClient.post(url, params);
    },
    deleteById: (params) => {
        const url = '/products/product/delete.php';
        return axiosClient.get(url, { params });
    },
    get: (params) => {
        const url = `/products/product/get.php`;
        return axiosClient.get(url, { params });
    },
    getALL: () => {
        const url = '/products/product/get.php';
        return axiosClient.get(url);
    },
    getById: (params) => {
        const url = '/products/product/getById.php';
        return axiosClient.get(url, { params });
    },
    getByIdCategory: (params) => {
        const url = '/products/product/getByIdCategory.php';
        return axiosClient.get(url, { params });
    },
};
export default productApi;
