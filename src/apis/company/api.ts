import axios, { AxiosError } from 'axios';
import customAxios from "@apis/interceptor";
import { CompanyParameter } from '@common/interfaces';

export const fetchCompany = async (tenant:CompanyParameter) => {
    try {
        console.log('fetch Company Parameter', tenant);
        const response = await customAxios.post('/master-service/company/findCompany', tenant);
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
