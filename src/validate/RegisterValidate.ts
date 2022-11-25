import type { RegisterPayload } from "@/types/xhrPayLoad";
import Validate from "./Validate";
const rule = {
    username: function (val: string) {
        return {
            isOk: val.length >= 6 && val.length <= 20,
            msg: '用户名必须为6-20位之间'
        }
    },
    password: function (val: string) {
        return {
            isOk: val.length >= 6 && val.length <= 20,
            msg: '密码必须为6-20位之间'
        }
    },
    phoneNumber: function (val: string) {
        return {
            isOk: val.length != 11,
            msg: '密码必须为6-20位之间'
        }
    }
}

export default class Registgers extends Validate<RegisterPayload> {
    constructor(payload: RegisterPayload) {
        super(payload);
    }
    ruleConfig(): { phoneNumber: Function; username: Function; password: Function; } {
        return rule
    }

}