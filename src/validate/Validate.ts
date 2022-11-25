import { ElMessage } from "element-plus";

export interface ValidaResult {
    isOk: boolean;
    msg: string
}
type Rule<T> = {
    [key in keyof T]: Function
}


export default abstract class Validate<T> {
    protected payload: T;

    private rule: Rule<T>

    constructor(payload: T) {
        this.payload = payload
        this.rule = this.ruleConfig();
    }

    abstract ruleConfig(): Rule<T>;

    validate(successCallback: Function) {
        let validaResult = this.getValidaResult();
        if (!validaResult.isOk) {
            ElMessage.warning(validaResult.msg);
        } else {
            successCallback()
        }
    }
    getValidaResult(): ValidaResult {
        for (const key in this.rule) {
            let fn: Function = this.rule[key]
            let v: ValidaResult = fn(this.payload[key])
            console.log('-----------v------------');
            
            console.log(v);
            if (!v.isOk) return v;
        }
        return {
            isOk: true,
            msg: '成功'
        };
    }

} 