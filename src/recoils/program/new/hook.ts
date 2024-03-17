import { useRecoilValue } from 'recoil';
import { getInitialProgramListSelector } from '@recoils/program/new/selector';
import { InitialProgramParameter } from '@common/interfaces';

export const useInitialProgramList = (programCategory:InitialProgramParameter) => {
    return useRecoilValue(getInitialProgramListSelector(programCategory));;
};