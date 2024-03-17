import { useRecoilValue } from 'recoil';
import { getNextProgramListSelector } from '@recoils/program/next/selector';
import { SelectedProgramParameter } from '@common/interfaces';

export const useNextProgramList = (selectedProgram:SelectedProgramParameter) => {
    return useRecoilValue(getNextProgramListSelector(selectedProgram));;
};