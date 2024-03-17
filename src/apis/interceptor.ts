import Axios from 'axios';

const customAxios = Axios.create({
    baseURL: process.env.API_BASE_URL
});

customAxios.interceptors.request.use(
    config => {
        console.log('requestIntercepter: onCall');
        return config
    },
    error => {
        console.log('requestIntercepter: OnRejected');
        return Promise.reject(error);
    }
);

customAxios.interceptors.response.use(
    response => {
        console.log('responseIntercepter: OnFulfilled');
        return response
    },
    error => {
        console.log('responseIntercepter: OnRejected');

        if (error.response && error.response.status) {
            switch (error.response.status) {
                case 401:
                    // console.log('401 Error : ', error.response);
                    // break;
                    return error.response;
                    // return new Promise(() => {});
                    // Promise 동시성 이슈 발생 시
                case 403:
                    console.log('403 Error : ', error.response);
                    break;
                case 404:
                    console.log('404 Error : ', error.response);
                    break;

                default:
                    return Promise.reject(error);
            }
        } else if (error.request) {
            console.error('Network error : ', error.message);
        }
        return Promise.reject(error);
    }
);

export default customAxios