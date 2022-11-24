import type { ArticleValidate } from "@/types/xhrPayLoad";
import { ElMessage } from "element-plus";
import Validate from "./Validate";


export default class LoginValidate extends Validate<ArticleValidate> {
    constructor(payload: ArticleValidate) {
        super(payload);
    }
    validate(cb: Function): void {
        const { title, content } = this.payload;
        if (title == null) {
            ElMessage.warning('文章空');
            return;
        } else if (content == null) {
            ElMessage.warning('密码名必须为6-20位之间');
            return;
        }
        cb()
    }

}