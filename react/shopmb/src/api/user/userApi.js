import axiosClient from '../axiosClient';

const userApi = {
    signIn: (params) => {
        const url = '/user/signIn.php';
        return axiosClient.post(url, params);
    },
    getMe: (params) => {
        const url = '/user/getMe.php';
        return axiosClient.get(url, { params });
    },
    add: (params) => {
        const url = '/user/add.php';
        return axiosClient.post(url, params);
    },
    get: (params) => {
        const url = '/user/get.php';
        return axiosClient.get(url, { params });
    },
    getById: (params) => {
        const url = '/user/getById.php';
        return axiosClient.get(url, { params });
    },
    getByTime: (params) => {
        const url = '/user/getByTime.php';
        return axiosClient.get(url, { params });
    },
    getFavouriteProducts: (params) => {
        const url = '/user/getFavouriteProducts.php';
        return axiosClient.get(url, { params });
    },
    updateInfo: (params) => {
        const url = '/user/updateInfo.php';
        return axiosClient.post(url, params);
    },
    changePassword: (params) => {
        const url = '/user/changePassword.php';
        return axiosClient.post(url, params);
    },
    updateStatus: (params) => {
        const url = '/user/updateStatus.php';
        return axiosClient.post(url, params);
    },
    updateLikePro: (params) => {
        const url = '/user/updateLikePro.php';
        return axiosClient.post(url, params);
    },
    updateLikeCmt: (params) => {
        const url = '/user/updateLikeCmt.php';
        return axiosClient.post(url, params);
    },
    updateDislikeCmt: (params) => {
        const url = '/user/updateDislikeCmt.php';
        return axiosClient.post(url, params);
    },
};
export default userApi;
