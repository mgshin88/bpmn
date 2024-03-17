import { useRecoilValue } from 'recoil';
import { getInitialProgramListSelector } from '@recoils/program/new/selector';
import { getNextProgramListSelector } from '@recoils/program/next/selector';
import { InitialProgramParameter, SelectedProgramParameter } from '@common/interfaces';
import { processFlowType } from '@common/enums';
// function isInitialProgramParameter(param: InitialProgramParameter | SelectedProgramParameter): param is InitialProgramParameter {
//     return (param as InitialProgramParameter).processCategoryCd !== undefined;
// }

export const useProgramList = (flow: string, initial: InitialProgramParameter, selected: SelectedProgramParameter) => {
    if (flow === processFlowType.new && initial.processCategoryCd) {
        return useRecoilValue(getInitialProgramListSelector(initial));
    } else if (flow === processFlowType.continue && selected.uid) {
        return useRecoilValue(getNextProgramListSelector(selected));
    }

};