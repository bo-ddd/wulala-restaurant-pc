import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { queryUserInfoApi } from '@/api/api'

export const useCounterStore = defineStore('counter', () => {
  // const count = ref(0);
  // const doubleCount = computed(() => count.value * 2)
  // function increment() {
  //   count.value++
  // }
  const userId = ref();
  async function getUserId() {
    let res = await queryUserInfoApi();
    userId.value = res.data.data.userId;
    console.log(userId.value);
  }
  return { userId, getUserId }
})
