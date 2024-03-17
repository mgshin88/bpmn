import { selectorFamily } from "recoil";
import { fetchNextProgramList } from "@apis/program/api";
import { getNextProgramListKey } from '@common/consts';
import { ProgramList, SelectedProgramParameter } from "@common/interfaces";

export const getNextProgramListSelector = selectorFamily<ProgramList[], SelectedProgramParameter>({
    key: getNextProgramListKey,
    get: (selectedProgram) => async () => {
        let programList = [];

        if (selectedProgram.tenant && selectedProgram.uid) {
            const response = await fetchNextProgramList(selectedProgram);

            programList = response.data.map((program:any, key: number) => {
                return {
                    score: key + 1,
                    uid: program.ableNextAppId,
                    appName: program.nextAppName
                }
            })
        }

        if (programList.length > 0) {
            return programList;
        }

        return [];
    }
});
