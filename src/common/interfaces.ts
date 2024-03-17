export interface ProgramList {
    score: number;
    uid: number;
    appName: string;
}

export interface NewProgramList {
    tenant: string;
    uid: number;
    app: string;
    processCategoryCd: string;
    title: string;
    appName: string;
}

export interface NextProgramList {
    uid: number;
    processCategoryCd: string;
    appName: string;
    ableNextAppId: string;
    nextAppName: string;
}

export interface Tenant {
    code: string,
    name: string | null
}

export interface Company {
    companyId: string,
    name: string | null
}

export interface Category {
    key: string,
    code: string,
    name: string | null
}

export interface Process {
    tenant: string;
    uid: number;
    processCategoryCd: string;
    companyId: string;
    name: string;
    flow: string;
    remarks: string;
}

export interface DefaultResponse {
    data: any;
    success: boolean;
    msg: string;
}

export interface ProcessList {
    [key: string]: any;
    uid: number;
    score: number;
    appName: string;
}

export interface ProcessParameter {
    [key: string]: any;
    tenant: string;
    processTypeCd: string;
    companyId: number;
}

export interface SaveProcessParameter {
    [key: string]: any;
    tenant: string;
    uid: number | null;
    processCategoryCd: string;
    companyId: string;
    name: string;
    flow: number[];
    // remarks: string;
}

export interface InitialProgramParameter {
    [key: string]: any;
    tenant: string;
    processCategoryCd: string;
}

export interface SelectedProgramParameter {
    [key: string]: any;
    tenant: string;
    uid: number;
}

export interface CompanyParameter {
    [key: string]: any;
    tenant: string;
    isOwner: number;
    isCompany: number;
}

export interface ProcessParameter {
    tenant: string;
    processTypeCd: string;
    companyId: string;
}

export interface CategoryParameter {
    [key: string]: any;
    tenant: string;
    codeCategory: string;
}
