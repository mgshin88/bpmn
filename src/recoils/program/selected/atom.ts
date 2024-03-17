import { atom } from "recoil";
import { selectedProgramKey } from '@common/consts';
import { SelectedProgramParameter } from "@common/interfaces";

const initialState = {
    tenant: '',
    uid: 0
};

export const selectedProgramState = atom<SelectedProgramParameter>({
    key: selectedProgramKey,
    default: initialState
});
