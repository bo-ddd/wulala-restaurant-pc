import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { queryUserInfoApi } from '@/api/api'
interface address{
  provinceCode:number, cityCode:number, areaCode:number,
  address:string,phoneNumber:string,receiver:string
}
export const useCounterStore = defineStore('counter', () => {
  // const count = ref(0);
  // const doubleCount = computed(() => count.value * 2)
  // function increment() {
  //   count.value++
  // }

  // 周
  const commodityInfo = reactive({});//商品信息
  const setCommodityInfo = function(playolad={}){
    Object.assign(commodityInfo , playolad);
  }
  const addressInfo = reactive({}) as address;//地址信息
  const setAddressInfo = function(playolad={}){
    Object.assign(addressInfo,playolad)
  }
  const indexs = reactive({});//收货地址下标
  const setIndex = function(playolad={}){
    Object.assign(indexs,playolad)
  }


  // 郝永祥
  const userId = ref();
  async function getUserId() {
    let res = await queryUserInfoApi();
    userId.value = res.data.data.userId;
    console.log(userId.value);
  }
  return { userId, getUserId ,setCommodityInfo ,commodityInfo,setAddressInfo,addressInfo}
})
