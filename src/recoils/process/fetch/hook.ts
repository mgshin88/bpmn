import { useRecoilValue } from 'recoil';
import { getProcessSelector } from './selector';
import { ProcessParameter } from '@common/interfaces';
export const useProcess = (processParameter: ProcessParameter) => {
    let loadedProcessFlow: any[] = [];
    const loadedProcess = useRecoilValue(getProcessSelector(processParameter));
    
    if (loadedProcess && loadedProcess.flow) {
        const newFlow = loadedProcess.flow.split(',');
        loadedProcessFlow = newFlow.map((uid: string, i: number) => {
            const replacedUid = uid.replace(' ', '');
            return {
                key: i,
                uid: replacedUid,
                appName: replacedUid
            }
        });
        console.log('Process Loaded from API Call: ', loadedProcessFlow);
    }
    return loadedProcessFlow;
}; 