<template>
    <div class="personal-center mlr-20">
        <div class="s-userbar">
            <div class="avatar-name">
                <img :src = avatarImg class="avatar"/>
                <div class="name-phone">
                    <span class="avatarName-text">{{ avatarName }}</span>
                    <span class="phoneNumber-text">({{ phoneNumber }})</span>
                </div>
            </div>
            <div class="my-delivery-address" @click="navigator('settlement')">我的收货地址</div>
            <div class="my-discounts-infomation">我的优惠信息</div>
        </div>
        <div class="s-my-counts">
            <div><span class="segmentation">|</span><span class="pd-52 counts-style">待付款</span></div>
            <div><span class="segmentation">|</span><span class="pd-52 counts-style">待发货</span></div>
            <div><span class="segmentation">|</span><span class="pd-52 counts-style">待收货</span></div>
            <div><span class="segmentation">|</span><span class="pd-52 counts-style">待评价</span></div>
            <div><span class="segmentation">|</span><span class="pd-52 counts-style">退款</span></div>
        </div>
        <div class="guess-like">
            <h3 class="title">根据浏览，猜我喜欢</h3>
            <div class="like-of-shop">
                <div v-for="item in foodList">
                    <img :src=item.bannerUrl class="food-img-size" />
                    <div>{{ item.foodName }}</div>
                    <div>{{ item.description }}</div>
                    <div>${{ item.price }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.pd-52{
    padding: 0 52px;
}
.s-userbar {
    height: 80px;
    width: 100%;
    background-color: #f5f8fa;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    justify-items: center;
    border: 1px solid rgb(228, 234, 238);
    border-bottom: none;
}
.avatar-name{
    display: flex;
    justify-content: space-around;
}
.avatar{
    width: 60px;
    height: 60px;
    border-radius: 30px;
}
.name-phone{
    padding-left: 18px;
}
.name-phone:hover{
    cursor: pointer;
    color: red;
}   
.avatarName-text{
    font-size: 14px;
}
.phoneNumber-text{
    font-size: 12px;
}
.my-delivery-address{
    font-size: 10px;
}
.my-delivery-address:hover{
    color: red;
    cursor: pointer;
}
.my-discounts-infomation{
    font-size: 10px;
}
.my-discounts-infomation:hover{
    color: red;
    cursor: pointer;
}
.s-my-counts{
    height: 50px;
    display: grid;
    grid-template-columns:repeat(5,1fr);
    align-items: center;
    justify-items: center;
    border: 1px solid rgb(228, 234, 238);
}
.segmentation{
    font-size: large;
    color: #e4eaee;
}
.counts-style{
    font-size: 12px;
}
.counts-style:hover{
    user-select: none;
    cursor: pointer;
    color: red;
}
.guess-like{
    margin-top: 30px;
    width: 100%;
    /* padding: 10px; */
    box-sizing: border-box;
    background-color: #a0cdeb;
    border: 1px solid rgb(228, 234, 238);

}
.guess-like h3{
    color: white;
    font-weight: 400;
    font-size: 20px;
    margin: 10px;
}
.like-of-shop{
    padding: 20px 15px;
    background-color: #f5f8fa;
    display: flex;
}
.food-img-size{
    width: 200px;
    height: 150px;
}
</style>
<script setup lang="ts">
import { ref } from 'vue';
import { queryUserInfoApi,gatFoodListApi } from '@/api/api';
import router from '@/router';

let avatarImg = ref('');    // 头像
let avatarName = ref('');   // 用户名
let phoneNumber = ref();    // 手机号

let foodImg = ref('');      // 菜品图片
let foodName = ref('');     // 菜品名字
let foodDesc = ref('');     // 菜品介绍
let foodPrice = ref();      // 菜品价格
let foodList = ref();       // 食物列表

userInfomation();
getFoodList();

/**
 * 用户信息
 * @author Mr.H
 */
async function userInfomation() {
    let res = await queryUserInfoApi();
    console.log(res);
    avatarImg.value = res.data.data.avatarImg;
    avatarName.value = res.data.data.avatarName;
    phoneNumber.value = res.data.data.phoneNumber;
}

/**
 * 路由跳转
 * @param name 
 */
function navigator(name:string){
    router.push({name:name})
}

/**
 * 菜肴列表
 */
async function getFoodList(){
    let res = await gatFoodListApi();
    console.log(res.data.data.list);
    foodList.value = res.data.data.list;
    // foodImg.value =      // 菜品图片
    // foodName.value =   // 菜品名字
    // foodDesc.value =  // 菜品介绍
    // foodPrice.value =
}
</script>