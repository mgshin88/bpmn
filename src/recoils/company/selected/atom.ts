import { atom } from "recoil";
import { Company } from "@common/interfaces";
import { companyKey } from "@common/consts";

const initialState = {
    key: 0,
    companyId: '',
    name: ''
};

export const companyState = atom<Company>({
    key: companyKey,
    default: initialState
});
