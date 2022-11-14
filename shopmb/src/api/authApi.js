import axiosClient from './axiosClient';

const authApi = {
    signIn: (params) => {
        const url = '/auth/signIn.php';
        return axiosClient.post(url, params);
    },
    refreshToKen: () => {
        const url = '/auth/refreshToken.php';
        return axiosClient.post(url);
    },
    // getMe: (params) => {
    //     const url = '/user/getMe.php';
    //     return axiosClient.get(url, { params });
    // },
};
export default authApi;
