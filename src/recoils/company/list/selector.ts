import { selectorFamily } from "recoil";
import { getCompanyKey } from '@common/consts';
import { Company, CompanyParameter } from "@common/interfaces";
import { fetchCompany } from "@apis/company/api";

export const getCompanyListSelector = selectorFamily<Company[], string>({
    key: getCompanyKey,
    get: (tenantCode) => async () => {
        let companyList = [{
            key: 0,
            companyId: '',
            name: ''
        }]

        if (tenantCode) {
            const response = await fetchCompany({
                tenant: tenantCode,
                isOwner: 1,
                isCompany: 1
            });

            console.log('fetch Company Result', response);
            response.data.map((company: any, i: number) => {
                return (companyList.push(
                    {
                        key: i + 1,
                        companyId: company.uid,
                        name: company.name
                    }
                ))
            })
            return companyList;
        }
        return companyList;
    }
});
