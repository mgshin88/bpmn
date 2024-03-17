import { atom } from "recoil";
import { Tenant } from "@common/interfaces";
import { tenantKey } from "@common/consts";

const initialState = {
    code: '',
    name: ''
};

export const tenantState = atom<Tenant>({
    key: tenantKey,
    default: initialState
});
