import { defineStore } from "pinia";
import { reactive, computed , ref} from "vue";
import { queryUserInfoApi } from "@/api/api";
export const useIdStore = defineStore('id', () => {
    let userIds = ref({
        userId: 0
    });
    let userId= computed(() => userIds.value.userId )
    const getUserIds = () => {
        return queryUserInfoApi().then(res => {
            setUserid(res.data.data);
        })
    }
    const setUserid = (payload: any) => {
        userIds.value = payload;
    }
    return { userId, getUserIds }
})