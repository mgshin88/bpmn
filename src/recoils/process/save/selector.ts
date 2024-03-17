import { selectorFamily } from "recoil";
import { saveProcess } from "@apis/process/api";
import { saveProcessKey } from '@common/consts';
import { SaveProcessParameter } from "@common/interfaces";
import { DefaultResponse } from "@common/interfaces";
import { tenantState } from "@recoils/tenant/atom";
import { categoryState } from "@recoils/category/selected/atom";
import { companyState } from "@recoils/company/selected/atom";
import { ProgramList } from "@common/interfaces";

export const saveProcessSelector = selectorFamily<DefaultResponse, SaveProcessParameter>({
    key: saveProcessKey,
    get: (processList) => async ({ get }) => {
        if (processList) {
            const tenantCode = get(tenantState).code;
            const companyCode = get(companyState).companyId;
            const categoryCode = get(categoryState).code;
            const flow = processList.map((process: ProgramList) => {
                return process.uid
            });

            const response = await saveProcess({
                tenant: tenantCode,
                processCategoryCd: categoryCode,
                companyId: companyCode,
                uid: null,
                name: 'test',
                flow: flow
            });
            console.log('Saved Process Result', response);
            return response;
        }
        return [];
    }
});
