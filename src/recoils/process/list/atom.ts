import { atom } from "recoil";
import { processListKey } from '@common/consts';
import { ProcessList } from "@common/interfaces";

export const processListState = atom<ProcessList[]>({
    key: processListKey,
    default: []
});
