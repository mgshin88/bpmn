import { selectorFamily } from "recoil";
import { fetchProgramList } from "@apis/program/api";
import { getNewProgramListKey } from '@common/consts';
import { InitialProgramParameter, ProgramList } from "@common/interfaces";
// import { processListState } from "@recoils/states";

export const getInitialProgramListSelector = selectorFamily<ProgramList[], InitialProgramParameter>({
    key: getNewProgramListKey,
    get: (programCategory) => async ({ get }) => {
        // const processList = get(processListState);

        if (programCategory.tenant && programCategory.processCategoryCd) {
            const response = await fetchProgramList(programCategory);

            const programList = response.data.map((program: ProgramList, key: number) => {
                return {
                    score: key + 1,
                    uid: program.uid,
                    appName: program.appName
                }
            })

            if (programList.length > 0) {
                return programList;
            }
        }
        return [];
    }
});
