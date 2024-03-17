import { atom } from "recoil";
import { Category } from "@common/interfaces";
import { categoryKey } from "@common/consts";

const initialState = {
    key: '',
    code: '',
    name: ''
};

export const categoryState = atom<Category>({
    key: categoryKey,
    default: initialState
});
