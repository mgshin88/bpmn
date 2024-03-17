import axios, { AxiosError } from 'axios';
import customAxios from "@apis/interceptor";
import { CategoryParameter } from '@common/interfaces';

export const fetchCategory = async (categoryParameter:CategoryParameter) => {
    try {
        console.log('fetch Category Paremeter', categoryParameter);    
        const response = await customAxios.get('/master-service/code/findCode', { params: categoryParameter });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError; // 타입 단언

            if (axiosError.response) {
                console.error('Response error:', axiosError.response.data);

            } else {
                console.log('Axios error without response', axiosError.name, ' : ', axiosError.message);

            }

        } else if (error instanceof Error) {
            console.log('Unexpected error: ', error)
            // console.error('Unexpected error: ', error.message);

        } else {
            console.error('Unexpected error: ', error.message);
        }

        return null;
    }
}
