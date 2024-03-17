import { useRecoilValue } from 'recoil';
import { saveProcess } from "@apis/process/api";
import { tenantState } from "@recoils/tenant/atom";
import { categoryState } from "@recoils/category/selected/atom";
import { companyState } from "@recoils/company/selected/atom";
import { ProcessList } from '@common/interfaces';
export const useSaveProcessList = async (processList: ProcessList[]) => {
    const tenantCode = useRecoilValue(tenantState).code;
    const categoryCode = useRecoilValue(categoryState).code;
    const companyId = useRecoilValue(companyState).companyId;
    const flow = processList.map(process => {
        return process.uid
    });

    const response = await saveProcess({
        tenant: tenantCode,
        processCategoryCd: categoryCode,
        companyId: companyId,
        uid: null,
        name: 'test',
        flow: flow
    });

    return response.data;
};