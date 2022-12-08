import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import { queryUserInfoApi } from '@/api/api'
import { cartListApi } from '@/api/api';
interface address{
  provinceCode:number, cityCode:number, areaCode:number,
  address:string,phoneNumber:string,receiver:string,id:number,
}
export const useCounterStore = defineStore('counter', () => {
  // 周
  const commodityInfos = reactive({});//商品信息
  const setCommodityInfo = function(playolad={}){
    Object.assign(commodityInfos , playolad);
  }
  const addressInfo = reactive({}) as address;//地址信息
  const setAddressInfo = function(playolad={}){
    Object.assign(addressInfo,playolad)
  }
  const cartLists = reactive({});
  async function getCartLists(playolad={}){
    let res = await cartListApi();//获取购物车列表
    Object.assign(cartLists,res.data.data);
  }
  
  // 郝永祥
  const userId = ref();
  async function getUserId() {
    let res = await queryUserInfoApi();
    userId.value = res.data.data.userId;
    console.log(userId.value);
  }
  return { userId, getUserId ,setCommodityInfo ,commodityInfos,setAddressInfo,addressInfo ,getCartLists,cartLists}
})
