export default class CustomDirectEditing {
    constructor(directEditing) {
        directEditing._providers = []; // 기존 프로바이더를 비워서 DirectEditing 비활성화

        this._directEditing = directEditing;
    }

    isActive() {
        return false; // DirectEditing을 비활성화
    }
}

CustomDirectEditing.$inject = ['directEditing'];
