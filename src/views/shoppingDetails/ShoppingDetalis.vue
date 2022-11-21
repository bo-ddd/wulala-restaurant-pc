<template>  
    <div class="wrap">
        <div class="shop-detail">
            <div></div>
            <div class="shop-info"></div>
        </div>
        <div class="shop-appraise"></div>
    </div>
</template>
<script setup lang="ts">
// shoppingDetalisId 商品信息 Id  路由传参  
import { gatFoodDetailApi } from '@/api/api'

async function foodDetail(){
    let res = await gatFoodDetailApi({});
}
</script>
<style scoped>
</style>