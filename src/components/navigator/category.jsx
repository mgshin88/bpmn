import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState, useResetRecoilState } from 'recoil';
import {
    tenantState,
    companyState,
    categoryState,
    processListState,
    selectedProgramState,
    processFlowState,
    newProgramListState
} from '@recoils/states';
import { useProcess } from '@recoils/hooks';
import { processFlowType } from '@common/enums';
import { getProcessSelector } from '@recoils/selectors';

export default function CategorySelector(props) {
    const tenant = useRecoilValue(tenantState);
    const company = useRecoilValue(companyState);
    const [category, setCategory] = useRecoilState(categoryState);
    const processList = useRecoilValue(getProcessSelector({
        tenant: tenant.code,
        companyId: company.companyId,
        processTypeCd: category.code
    }));
    const setProcessList = useSetRecoilState(processListState);
    const setSelectedProgram = useSetRecoilState(selectedProgramState);
    const resetSelectedProgram = useResetRecoilState(selectedProgramState);
    const setProcessFlow = useSetRecoilState(processFlowState);
    const resetProgramList = useResetRecoilState(newProgramListState);
    const options = props.categoryList.map((option) => {
        return <option key={option.key} value={option.code}>
            {option.name}
        </option>
    });

    useEffect(() => {
        if (processList.length > 0) {
            setSelectedProgram({
                uid: processList[processList.length - 1].uid,
                tenant: tenant.code
            });
            setProcessList(processList);
            setProcessFlow(processFlowType.load);
        } else {
            setProcessList([]);
            setProcessFlow(processFlowType.new);
        }
    }, [category, processList]);

    // useEffect(() => {
    //     if (!company.code) {
    //         setCategory(processList);
    //     }
    // }, [company]);

    const onChangeHandler = (event) => {
        const selectedCategory = props.categoryList.find(option => option.code === event.target.value);

        if (!company.companyId) {
            alert('Company가 먼저 선택되어야 합니다.');
            return;
        }

        setCategory(selectedCategory);
        console.log('Selected Category: ', selectedCategory);

        if (!selectedCategory.code) {
            onInitializeCanvas();
        }
    }

    const onInitializeCanvas = () => {
        resetSelectedProgram();
        setProcessFlow(processFlowType.new);
        resetProgramList();
    }

    return (
        <div style={{ display: 'flex' }}>
            <h2>Category</h2>
            <select onChange={onChangeHandler} value={category.code}>
                {options}
            </select>
        </div>
    )
}