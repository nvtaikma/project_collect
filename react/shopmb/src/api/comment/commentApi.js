import axiosClient from '../axiosClient';

const commentApi = {
    add: (params) => {
        const url = '/comments/add.php';
        return axiosClient.post(url, params);
    },
    get: (params) => {
        const url = '/comments/get.php';
        return axiosClient.get(url, { params });
    },
    getCommentsLike: (params) => {
        const url = '/comments/getCommentsLike.php';
        return axiosClient.get(url, { params });
    },
    getByIdUser: (params) => {
        const url = '/comments/getByIdUser.php';
        return axiosClient.get(url, { params });
    },
};
export default commentApi;
