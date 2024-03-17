export const enum suitablityScore {
    high = 100,
    average = 50,
    low = 25
};

export const enum actionType {
    add = 'ADD',
    delete = 'DELETE'
};

export const enum processFlowType {
    new = 'NEW',
    continue = 'CONTINUE',
    load = 'LOAD'
};

export const enum errorType {
    NON_EXIST = '캔버스에 다이어그램이 존재하지 않습니다.',
    ERROR_OCCURRED = '예상치 못한 문제가 발생하였습니다.',
    API_ERROR = '통신에러가 발생하였습니다.'
};

export const enum successType {
    SAVE_SUCCESS = '저장에 성공하였습니다.'
};