import { atom } from "recoil";
import { Category } from "@common/interfaces";
import { categoryListKey } from "@common/consts";

export const categoryListState = atom<Category[]>({
    key: categoryListKey,
    default: []
});
