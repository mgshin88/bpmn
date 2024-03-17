import { atom } from "recoil";
import { processFlowKey } from '@common/consts';
import { processFlowType } from '@common/enums';

export const processFlowState = atom<String>({
    key: processFlowKey,
    default: processFlowType.new
});
