import type { AddressPayLoad } from "@/types/xhrPayLoad";
import Validate from "./Validate";

const rule = {
    chinaDatas : function(val:string){
        return {
            isOk: val != undefined,
            msg: '请选择收货地址'
        }
    },
    name : function (val:string){
        return {
            isOk: val.length,
            msg: '请输入收货人姓名'
        }
    },
    address: function (val: string) {
        return {
            isOk: val.length,
            msg: '请填写详细地址'
        }
    },
    phone: function (val: string) {
        return {
            isOk: val.length == 11,
            msg: '手机号必须是11位'
        }
    },
    lockPhone : function (val:string){
        return {
            isOk: val.length == 11,
            msg: '固定手机号必须是11位'
        }
    },
}

export default class AddressValidate extends Validate<AddressPayLoad> {
    constructor(payload: AddressPayLoad) {
        super(payload);
    }

    ruleConfig(): { address: Function; phone: Function; lockPhone:Function;name:Function;chinaDatas:Function;} {
        return rule
    }
}