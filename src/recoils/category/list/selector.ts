import { selectorFamily } from "recoil";
import { getCategoryListKey } from '@common/consts';
import { tenantState } from "@recoils/tenant/atom";
import { Category, CategoryParameter } from "@common/interfaces";
import { fetchCategory } from "@apis/category/api";

export const getCategoryListSelector = selectorFamily<Category[], string>({
    key: getCategoryListKey,
    get: (codeCategory) => async ({ get }) => {
        let categoryList = [{
            key: '',
            code: '',
            name: ''
        }]

        const tenantCode = get(tenantState);
        if (tenantCode.code && codeCategory) {
            const response = await fetchCategory({
                tenant: tenantCode.code,
                codeCategory: codeCategory
            });

            
            console.log('fetch Category Result', response);
            response.data.map((category: any) => {
                return (categoryList.push(
                    {
                        key: category.codeId,
                        code: category.code,
                        name: category.codeName
                    }
                ))
            })
            return categoryList;
        }
        return categoryList;
    }
});
