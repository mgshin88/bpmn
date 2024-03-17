import React from 'react';
import CommonBpmn from '@components/diagram/common';
import { useRecoilValue, useRecoilState } from 'recoil';
import { tenantState } from '@recoils/tenant/atom';
import { useEffect, useCallback } from 'react';
import {
    useInitialProgramList,
    useNextProgramList
} from '@recoils/hooks';
import {
    processFlowState,
    processListState,
    newProgramListState,
    selectedProgramState,
    categoryState,
    companyState
} from '@recoils/states';
import { actionType, processFlowType } from '@common/enums';

export default function DiagramViewer(props) {
    const tenant = useRecoilValue(tenantState);
    const category = useRecoilValue(categoryState);
    const company = useRecoilValue(companyState);
    const [processList, setProcessList] = useRecoilState(processListState);
    const [selectedProgram, setSelectedProgram] = useRecoilState(selectedProgramState);
    const [processFlow, setProcessFlow] = useRecoilState(processFlowState);
    const [programList, setProgramList] = useRecoilState(newProgramListState);
    // const newProgramList = useProgramList(
    //     processFlow,
    //     {
    //         tenant: tenant.code,
    //         processCategoryCd: category.code
    //     },
    //     selectedProgram
    // );
    const newProgramList = useInitialProgramList({
        tenant: tenant.code,
        processCategoryCd: category.code
    });
    const nextProgramList = useNextProgramList(selectedProgram);

    useEffect(() => {
        if (newProgramList && newProgramList.length > 0) {
            console.log('Program List After API Call: ', newProgramList);
            onUpdateProgramList(newProgramList, processFlowType.new);
        }
    }, [newProgramList]);

    useEffect(() => {
        console.log('Program List After Selected API Call: ', nextProgramList);
        if (selectedProgram.uid === 0 && programList.length > 0) {
            return;
        } else if (selectedProgram.uid === 0 && nextProgramList.length === 0) {
            return;
        }
        onUpdateProgramList(nextProgramList, processFlowType.continue);
    }, [nextProgramList]);

    // useEffect(() => {
    //     console.log('Program List After API Call: ', newProgramList);
    //     onUpdateProgramList(newProgramList);
    // }, [newProgramList]);

    // useEffect(() => {
    //     if (processList && processList.length > 0) {
    //         onSetParameters();
    //     }
    // }, [processList]);

    const onUpdateProgramList = useCallback((programList) => {
        setProgramList(programList);
    }, [setProgramList]);

    const onUpdateProcess = useCallback((processList) => {
        setProcessFlow(processList && processList.length > 0 ? processFlowType.continue : processFlowType.new);
        setProcessList(processList);
    }, [setProcessFlow, setProcessList]);


    const onSetParameters = useCallback((program, type) => {
        if (program) {
            const newProcessList = processList.filter(process => process.uid !== program.uid);
            const updatedProcessList = program.uid ? [...newProcessList, program] : newProcessList;
            let currentProgram = null

            if (type === actionType.add) {
                onUpdateProcess(updatedProcessList);
                currentProgram = updatedProcessList.length > 0 ? updatedProcessList[updatedProcessList.length - 1].uid : 0;
            } else {
                onUpdateProcess(newProcessList);
                currentProgram = newProcessList.length > 0 ? newProcessList[newProcessList.length - 1].uid : 0;
            }

            setSelectedProgram({
                uid: currentProgram,
                tenant: tenant.code
            });

            if (programList.length > 0) {
                onUpdateProgramList(programList);
            }
        }

        // else if (processList.length > 0) {
        //     currentProgram = processList[processList.length - 1].uid;
        // }

    }, [processList]);


    const onShown = () => {
        console.log('diagram shown');
    };

    const onLoading = () => {
        console.log('diagram loading');
    };

    const onError = (err) => {
        console.log('failed to show diagram', err);
    };

    if (!category.code || !company.companyId) {
        return null;
    };

    return (
        <CommonBpmn
            onSetParameters={onSetParameters}
            onShown={onShown}
            onLoading={onLoading}
            onError={onError}
        // programList={programList}
        // processList={processList}
        // processFlow={processFlow}
        />
    );
};