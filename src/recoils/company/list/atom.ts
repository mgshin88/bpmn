import { atom } from "recoil";
import { Company } from "@common/interfaces";
import { companyListKey } from "@common/consts";

export const companyListState = atom<Company[]>({
    key: companyListKey,
    default: []
});
