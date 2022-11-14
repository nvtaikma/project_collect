import axiosClient from '../axiosClient';

const feedbackRatingApi = {
    add: (params) => {
        const url = '/feedback_rating/add.php';
        return axiosClient.post(url, params);
    },
    get: (params) => {
        const url = '/feedback_rating/get.php';
        return axiosClient.get(url, { params });
    },
};
export default feedbackRatingApi;
