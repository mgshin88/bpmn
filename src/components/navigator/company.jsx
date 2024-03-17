import React from 'react';
import { 
    companyState, 
    selectedProgramState, 
    categoryState,
    processListState,
    processFlowState,
    newProgramListState
} from '@recoils/states';
import { useRecoilState, useResetRecoilState } from 'recoil';

export default function CompanyInput(props) {
    const [company, setCompany] = useRecoilState(companyState);
    const setCategory = useResetRecoilState(categoryState);
    const setProcessList = useResetRecoilState(processListState);
    const setSelectedProgram = useResetRecoilState(selectedProgramState);
    const setProcessFlow = useResetRecoilState(processFlowState);
    const setProgramList = useResetRecoilState(newProgramListState);

    const options = props.companyList.map((option) => {
        return <option key={option.key} value={option.companyId}>
            {option.name}
        </option>
    });

    const onChangeHandler = (event) => {
        const selectedCompany = props.companyList.find(option => String(option.companyId) === event.target.value);
        setCompany(selectedCompany);

        if (!selectedCompany.companyId) {
            setProcessList();
            setProgramList();
            setProcessFlow();
            setCategory();
            setSelectedProgram();
        }
        console.log('Selected Company: ', selectedCompany);
    }

    return (
        <div style={{ display: 'flex' }}>
            <h2>Company</h2>
            <select onChange={onChangeHandler} value={company.companyId}>
                {options}
            </select>
        </div>
    )
}