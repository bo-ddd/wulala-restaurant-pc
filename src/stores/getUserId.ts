import { defineStore } from "pinia";
import { reactive, computed , ref} from "vue";
import { queryUserInfoApi } from "@/api/api";
export const useId = defineStore('counter', () => {
    let userIds = ref({
        userId: 0
    });
    let userId= computed(() => userIds.value.userId )
    const getUserIds = () => {
       return queryUserInfoApi().then(res => {
        console.log('-----------我是获取userId的store---------');
            console.log(res);
            setUserid(res.data);
        })
    }
    const setUserid = (payload: any) => {
        userIds.value = payload;
    }
    return { userId, getUserIds }
})