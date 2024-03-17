import { selector } from "recoil";
import { getCategoryKey } from '@common/consts';
import { categoryState } from "./atom";
import { Category } from "@common/interfaces";

export const getAndSetProgressCategorySelector = selector({
    key: getCategoryKey,
    get: async ({ get }) => {
        const category = get(categoryState);
        return category.code;
    },
    // set: () => ({ set }, newCategory: Category) => {
    //     set(categoryState, newCategory);
    // }
});
