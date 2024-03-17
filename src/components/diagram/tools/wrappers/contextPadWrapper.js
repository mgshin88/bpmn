import React, { useEffect } from 'react';
import { useNextProgramList } from '@recoils/program/next/hook';
import { selectedProgramState } from '@recoils/program/selected/atom';
import { tenantState } from '@recoils/tenant/atom';
import CustomContextPad from '@components/diagram/tools/modules/contextPad';
import { useRecoilState, useRecoilValue } from 'recoil';

export default function CustomContextPadWrapper(bpmnFactory, config, contextPad, create, elementFactory, injector, translate, programList) {
      const [selectedProgram, setSelectedProgram] = useRecoilState(selectedProgramState);
      const tenant = useRecoilValue(tenantState);

    const setParameters = (uid) => {
        if (uid) {
              setSelectedProgram({
                uid: uid,
                tenant: tenant
              });
        }
    }
    
    useEffect(() => {
        if (nextProgramList.uid && selectedProgram.tenant) {
            console.log('ProselectedProgramm List After Selected API Call: ', nextProgramList);
            const nextProgramList = useNextProgramList(selectedProgram);
            setProgramList(nextProgramList);
            setProcessState('CTN');
        }
    }, [selectedProgram]);


    // return <CustomContextPad
    //     bpmnFactory={bpmnFactory}
    //     config={config}
    //     contextPad={contextPad}
    //     create={create}
    //     elementFactory={elementFactory}
    //     injector={injector}
    //     translate={translate}
    //     programList={programList}
    //     setParameters={setParameters}
    // />;
      return new CustomContextPad(bpmnFactory, config, contextPad, create, elementFactory, injector, translate, programList, setParameters);
};
