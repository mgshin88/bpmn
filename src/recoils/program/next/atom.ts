import { atom } from "recoil";
import { nextprogramListKey } from '@common/consts';
import { NextProgramList } from "@common/interfaces";

const initialState = {
    uid: '',
    processCategoryCd: '',
    appName: '',
    ableNextAppId: '',
    nextAppName: ''
};

export const nextProgramListState = atom<NextProgramList[]>({
    key: nextprogramListKey,
    default: []
});
