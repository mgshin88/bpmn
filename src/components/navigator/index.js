import React, { useEffect } from 'react';
import CategorySelector from '@components/navigator/category';
import TenantInput from '@components/navigator/tenant';
import SaveButton from '@components/navigator/button';
import CompanyInput from '@components/navigator/company';
import { getCategoryListSelector } from '@recoils/category/list/selector';
import { getCompanyListSelector } from '@recoils/company/list/selector';
import { categoryListState } from '@recoils/category/list/atom';
import { companyListState } from '@recoils/company/list/atom';
import { useRecoilState, useRecoilValue } from 'recoil';

export default function Navigator(props) {
    const codeCategory = 'PROCESSCATEGORY';
    const [categoryList, setCategoryList] = useRecoilState(categoryListState);
    const [companyList, setCompanyList] = useRecoilState(companyListState);
    const newCategoryList = useRecoilValue(getCategoryListSelector(codeCategory));
    const newCompanyList = useRecoilValue(getCompanyListSelector(props.tenant));

    useEffect(() => {
        setCategoryList(newCategoryList);
    },[newCategoryList, setCategoryList]);

    useEffect(() => {
        setCompanyList(newCompanyList);
    },[newCompanyList, setCompanyList]);


    if (categoryList.length <= 1 || companyList.length <= 1) {
        return null;
    }

    return (
        <div style={{ display: 'flex' }}>
            <TenantInput />
            <CompanyInput companyList={companyList}/>
            <CategorySelector categoryList={categoryList} />
            <SaveButton />
        </div>
    )
}
