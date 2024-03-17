import React from 'react';
import { useNextProgramList } from '@recoils/program/next/hook';
import { selectedProgramState } from '@recoils/program/selected/atom';
import { tenantState } from '@recoils/tenant/atom';
import { useRecoilState, useRecoilValue } from 'recoil';

export default function withProgramList(CustomComponent) {
  return function WrappedComponent(props) {
    const [selectedProgram, setSelectedProgram] = useRecoilState(selectedProgramState);
    const newProgramList = useNextProgramList(selectedProgram);
    const tenant = useRecoilValue(tenantState);

    // Function to update selected program
    const setParameters = (uid) => {
      if (uid) {
        setSelectedProgram({ uid: uid, tenant: tenant });
      }
    };

    // Return the class component with additional props
    return (
      <CustomComponent
        {...props}
        programList={newProgramList}
        setParameters={setParameters}
      />
    );
  };
}