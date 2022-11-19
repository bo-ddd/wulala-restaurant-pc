<template>
    <div class="box">

        <div class="tapbox wrap">
            <ul class="tapqiehuan">
                <li v-for="(item, index) in tapli" :key="index" :class="[index == idxon ? 'on' : '']"
                    @click="tapqie(index, item)">
                    {{ item.name }}
                </li>
            </ul>
            <div class="tapbombox">
                <div class="box-text">
                    <span>菜肴图片</span>
                    <span>菜肴名称</span>
                    <span>菜肴介绍</span>
                    <span>菜肴价格</span>
                    <span>加入购物车</span>
                </div>
                <div class="bombox" v-for="(item, index) in bomtxt" :key="index">
                    <div class="box-bannerurl_png"><img class="bannerurl-png" :src="item.bannerUrl" alt=""></div>
                    <div> <span class="food-name">{{ item.foodName }}</span></div>
                    <div class="box-description"><span class="description">{{ item.description }}</span></div>
                    <div><span class="price">￥{{ item.price }}</span></div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue'
import { getCategoryListApi, gatFoodListApi } from '@/api/api'
let tapli: any = ref()
let idxon = ref(0)
let bomtxt: any = ref({})
getCategoryListApi({}).then(res => {
    tapli.value = res.data
    gatFoodListApi({
        categoryId: tapli.value[0].id
    }).then(res => {
        bomtxt.value = res.data.list
        console.log(res.data.list);

    })
})
const tapqie = (index: number, el: any) => {
    gatFoodListApi({
        categoryId: el.id
    }).then(res => {
        bomtxt.value = res.data.list
    })
    idxon.value = index
}
</script>
  
<style scoped >
.box {
    padding: 20px;
    background-color: #fff;
    min-height: calc(100vh - 220px);
}

.tapbox {
    width: 100%;
    margin: 0 auto;
}

.tapqiehuan {
    padding: 0 0.3rem;
    display: flex;
    justify-content: space-between;
}

ul li {
    list-style: none
}

li {
    padding: 10px 20px;
    border: 1px solid #d9ecff;
    cursor: pointer;
}

li:hover {
    color: #409eff;
}

.on {
    background: #ecf5ff;
    color: #409eff;
}

.bombox {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 50px;
}

.bannerurl-png {
    width: 150px;
    height: 100px;
    margin: 15px 0;
}

.box-text {
    padding: 0 50px;
    display: flex;
    justify-content: space-between;
}
.food-name{
    margin-left: 235px;
}
.price{
    margin-left: 235px;

}
.description{
    margin-left: 235px;

}

</style>
  
  