<template>
    <div class="box">
        <div class="classify-top">
            <ul class="tapqiehuan">
                <li class="title">菜肴分类</li>
                <li class="nav-item" v-for="(item, index) in tapli" :key="index" :class="[index == idxon ? 'on' : '']"
                    @click="tapqie(index, item)">
                    {{ item.name }}
                </li>
            </ul>
        </div>
        <div class="minsu-ls-view clearfix">
            <div class="products" style="display: flex;">
                <div class="minsu-item " v-for="(item, index) in bomtxt" :key="index" @click='toShoppingDetails(item)'>
                    <div class="product-card-header"><img class="product-img" :src="item.bannerUrl" alt=""></div>
                    <div>
                        <span class="food-name">{{ item.foodName }}</span>
                    </div>
                    <div class="box-description">
                        <p class="description">{{ item.description }}</p>
                    </div>
                    <div class="product-info">
                        <span class="price"><span class="symbol">￥</span>{{ item.price }}</span>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { getCategoryListApi, gatFoodListApi } from '@/api/api'
import { useRouter } from 'vue-router'
let tapli: any = ref()
let idxon = ref(0)
let bomtxt: any = ref({})
let router = useRouter()
getCategoryListApi({}).then(res => {
    tapli.value = res.data
    gatFoodListApi({
        categoryId: tapli.value[0].id
    }).then(res => {
        bomtxt.value = res.data.list
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

const toShoppingDetails = (item: any) => {
    router.push({
        name: 'shoppingDetalis',
        query: {
            shoppingDetalisId: item.foodId
        }
    })

}
</script>

<style scoped>
.classify-top {
    width: 100%;
    height: 44px;
    line-height: 44px;
    box-sizing: border-box;
    color: #fff;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    /* background: linear-gradient(to right, rgb(250, 60, 104) 2%, rgb(254, 70, 77) 97%) rgb(250, 60, 104); */
    background-color: #222222;
}

ul {
    margin: 0;
    padding: 0;
}

li {
    list-style: none;
    margin: 0;
    padding: 0;
    cursor: pointer;
}

.tapqiehuan {
    display: flex;
}

.nav-item {
    padding: 0 5px;
    font-size: 15px;
}

.minsu-ls-view {
    padding: 20px;
    padding-right: 0;
    padding-bottom: 0;
    border: 1px solid #E5E5E5;
    border-top: 0px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    background: #fff;
    overflow-y: scroll;
    height: calc(100vh - 284px);
}

::-webkit-scrollbar {
    display: none
}

.clearfix:after {
    content: " ";
    visibility: hidden;
    display: block;
    height: 0;
    clear: both;
}

.clearfix:before {
    content: " ";
    visibility: hidden;
    display: block;
    height: 0;
    clear: both;
}

.minsu-ls-view .minsu-item {
    float: left;
    margin-right: 18px;
}

.minsu-ls-view .minsu-item .product-card-header .product-img {
    width: 276px;
    height: 208px;
    border-radius: 4px;
    background-size: cover;
    background-position: 50%;
    max-width: 100%;
    height: 200px;
    margin-bottom: 11px;
    cursor: pointer;
}


.products {
    flex-wrap: wrap;
}

.title {
    font-size: 20px;
    margin: 0 20px;
    font-family: "MFShangHei-Regular";
}

.food-name {
    color: #222222;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 7px 0;
    font-weight: 600;
    width: 297px;
    font-size: 15px;
}

.description {
    font-size: 15px;
    color: #999999;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 5px 0 0 0;
    font-weight: 400;
    width: 228px;
    white-space: nowrap;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
}

.price {
    font-weight: 500;
    font-size: 20px;
    color: #FF6600;
    letter-spacing: -0.8px;
    padding: 4px 0
}

.symbol {
    color: #FF6600;
    font-size: 14px;
}

.product-info {
    padding-bottom: 20px;
}

.on {
    color: #409eff;
}
</style>