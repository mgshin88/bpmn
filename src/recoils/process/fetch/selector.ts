import { selectorFamily } from "recoil";
import { getProcessKey } from '@common/consts';
import { fetchProcess } from "@apis/process/api";
import { Process, ProcessList, ProcessParameter } from "@common/interfaces";

export const getProcessSelector = selectorFamily<ProcessList[], ProcessParameter>({
    key: getProcessKey,
    get: (processParameter) => async () => {
        let loadedProcessList: any[] = [];
        if (processParameter.tenant && processParameter.companyId && processParameter.processTypeCd) {
            const response = await fetchProcess(processParameter);
            console.log('Saved Process Result', response);

            if (response.data && response.data.length > 0) {
                const loadedProcess = response.data[0];
                // return response.data[0];
                const newFlow = loadedProcess.flow.split(',');
                loadedProcessList = newFlow.map((uid: string, i: number) => {
                    const replacedUid = uid.replace(' ', '');
                    return {
                        score: i,
                        uid: replacedUid,
                        appName: replacedUid
                    }
                });

                console.log('Process Loaded from API Call: ', loadedProcessList);
            }
        };
        // throw new Error("Missing required parameters for fetching process");
        return loadedProcessList;
    },
});
