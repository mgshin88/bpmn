import axios, { AxiosError } from 'axios';
import customAxios from "@apis/interceptor";
import { InitialProgramParameter, SelectedProgramParameter } from '@common/interfaces';

export const fetchProgramList = async (clientProgram: InitialProgramParameter) => {
    try {
        console.log('fetch Initial Program Parameters', clientProgram);
        const response = await customAxios.post('/master-service/processMng/findPgmList', clientProgram);
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


export const fetchNextProgramList = async (selectedProgram: SelectedProgramParameter) => {
    try {
        console.log('selected Program Parameters', selectedProgram);
        const response = await customAxios.post('/master-service/processMng/findPgmListFlow', selectedProgram);
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

