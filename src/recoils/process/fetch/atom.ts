import { atom } from "recoil";
import { processKey } from '@common/consts';
import { Process } from "@common/interfaces";

const initialState = {
    tenant: '',
    uid: 0,
    processCategoryCd: '',
    companyId: '',
    name: '',
    flow: '',
    remarks: ''
};

export const fetchProcessState = atom<Process> ({
    key: processKey,
    default: initialState 
});