import { atom } from "recoil";
import { newProgramListKey } from '@common/consts';
import { NewProgramList } from "@common/interfaces";

const initialState = {
    tenant: '',
    uid: '',
    app: '',
    processCategoryCd: '',
    title: ''
};

export const newProgramListState = atom<NewProgramList[]>({
    key: newProgramListKey,
    default: []
});