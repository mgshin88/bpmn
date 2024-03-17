import axios, { AxiosError } from 'axios';
import customAxios from "@apis/interceptor";
import { ProcessParameter } from '@common/interfaces';
import { SaveProcessParameter } from '@common/interfaces';
export const fetchProcess = async (processType: ProcessParameter) => {
    try {
        console.log('fetch Process Prameters', processType);
        const response = await customAxios.post('/master-service/processMng/findProcessMng', processType);
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

export const saveProcess = async (drawnProcess: SaveProcessParameter) => {
    try {
        console.log('Saving Process Parameter', drawnProcess);
        const response = await customAxios.post('/master-service/processMng/saveProcessMng', { params: drawnProcess });
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

