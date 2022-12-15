<template>  
    <div class="wrap">
        <div class="shop-detail">
            <div>
                <img class="food-picture" :src="foodlist.bannerUrl" />
            </div>
            <div>
                <div class="food-name">{{ foodlist.foodName }}</div><el-rate max="1"/>
                <div class="cuisine food-info">菜品菜系：{{ foodlist.categoryName }}</div>
                <div class="food-info">菜品价格：{{ foodlist.price }}</div>
                <div class="food-info">菜品介绍：{{ foodlist.description }}</div>
                <el-input-number v-model="ShoppingNumber" :min="1" :max="30" @change="handleChange" />
                <el-button class="add-shopping-cart_btn" type="info" @click="addShoppingCar">加入购物车  +</el-button>
            </div>
        </div>
        <div class="shop-appraise-text">商品评价</div>
        <div class="shop-appraise">
            <div>
                <div class="praise">好评度</div>
                <div class="percent">{{ Math.ceil(degreePraise * 100) }}%</div>  
            </div>
            <div class="appraise-label">
                <el-tag>正宗品质</el-tag>
                <el-tag class="penetrate_ml-10">非常地道</el-tag>
                <el-tag class="penetrate_ml-10">颜值颇高</el-tag>
                <el-tag class="penetrate_ml-10">十分好吃</el-tag>
            </div>
        </div>
        <div>
            <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
                <el-tab-pane name="first">
                    <template #label>
                        全部评价({{ allAppraiseLength }})
                    </template>
                    <div class="bj-white grid" v-for="item in foodAppraise">
                        <div v-for="users in item.users">
                            <img class="avatar-size" :src=users.avatarImg alt="">
                            <span class="user-name">{{ item.isRealName == 0 ? '匿名' : users.avatarName }}</span>
                        </div>
                        <div>
                            <el-rate disabled v-model="item.star" :max="5" allow-half  :colors="['#409eff', '#67c23a', '#FF9900']"/>
                            <div class="user-appraise">{{ item.content }}</div>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="好评" name="second">
                    <div class="bj-white grid"  v-for="item in goodAppraise">
                            <div v-for="users in item.users"  v-if="item.star >= 4" class="bj-white">
                                <img class="avatar-size" :src=users.avatarImg alt="">
                                <span class="user-name">{{ item.isRealName == 0 ? '匿名' : users.avatarName }}</span>
                            </div>
                            <div  v-if="item.star >= 4" class="bj-white">
                                <el-rate disabled v-model="item.star" :max="5" allow-half :colors="['#409eff', '#67c23a', '#FF9900']"/>
                                <div class="user-appraise">{{ item.content }}</div>
                            </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="中评" name="third">
                    <div class="bj-white grid"  v-for="item in midAppraise">
                            <div v-for="users in item.users" v-if="item.star == 3" class="bj-white">
                                <img class="avatar-size" :src=users.avatarImg alt="">
                                <span class="user-name">{{ item.isRealName == 0 ? '匿名' : users.avatarName }}</span>
                            </div>
                            <div v-if="item.star == 3" class="bj-white">
                                <el-rate disabled v-model="item.star" :max="5" allow-half  :colors="['#409eff', '#67c23a', '#FF9900']"/>
                                <div class="user-appraise">{{ item.content }}</div>
                            </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="差评" name="fourth">
                    <div class="bj-white grid" v-for="item in badAppraise">
                            <div v-for="users in item.users" v-if="item.star <= 2" class="bj-white">
                                <img class="avatar-size" :src=users.avatarImg alt="">
                                <span class="user-name">{{ item.isRealName == 0 ? '匿名' : users.avatarName }}</span>
                            </div>
                            <div v-if="item.star <= 2" class="bj-white">
                                <el-rate disabled v-model="item.star" :max="5" allow-half  :colors="['#409eff', '#67c23a', '#FF9900']"/>
                                <div class="user-appraise">{{ item.content }}</div>
                            </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
            <el-pagination
                v-model:current-page="currentPage"
                v-model:page-size="pageSize"
                :page-sizes="[5, 20, 30, 40]"
                :small="small"
                :disabled="disabled"
                :background="background"
                layout="total, sizes, prev, pager, next, jumper"
                :total=total
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                />
        </div>
    </div>
</template>
<script setup lang="ts">
import { gatFoodListApi, foodAppraiseListApi, addShoppingCartApi } from '@/api/api';
import { useRoute } from 'vue-router';
import type { TabsPaneContext } from 'element-plus';
import { ref } from 'vue';
import { useIdStore } from '@/stores/getUserId';
import { storeToRefs } from "pinia";
import router from '@/router';
// pinia
import { useCounterStore } from '@/stores/counter';
let { getCartLists } = useCounterStore();
let aa = useIdStore();
aa.getUserIds()
let { userId } = storeToRefs(useIdStore());
console.log(userId.value);

let route = useRoute();
let foodlist: any = ref({});
let foodAppraise = ref();
let allAppraise = ref();
let allAppraiseLength = ref();
let goodAppraise = ref();
let midAppraise = ref();
let badAppraise = ref();
let degreePraise = ref(0);
const activeName = ref('first');

//分页
const currentPage = ref();     //当前页数
const pageSize = ref(5);       //每页显示的条数
const small = ref(false);       //是否使用小型分页样式
const background = ref(false);  //是否需要分页颜色
const disabled = ref(false);    //是否禁用分页
let total = ref(0);              //总数
//分页变量完

/**
 * @description  分页方法 
 */
const handleSizeChange = (val: number) => {
    //   console.log(`${val} items per page`)
    pageSize.value = val;
    dishesEva();
}
const ShoppingNumber = ref(1);
const handleChange = (value: number) => {
    console.log(value);
}
const handleCurrentChange = (val: number) => {
    //   console.log(`current page: ${val}`)
    currentPage.value = val;
    foodAppraiseListApi({ foodId: route.query.shoppingDetalisId, pageSize: 5, pageNum: currentPage.value }).then(res => {
        foodAppraise.value = res.data.data.list;
        // 好评 差评
        goodAppraise.value = foodAppraise.value.filter((item: any) => item.star >= 4);
        midAppraise.value = foodAppraise.value.filter((item: any) => item.star == 3);
        badAppraise.value = foodAppraise.value.filter((item: any) => item.star <= 2);
        allAppraise.value = foodAppraise.value.filter((item: any) => item.star >= 1);
        degreePraise.value = (goodAppraise.value.length / allAppraise.value.length);
        console.log(degreePraise.value);

        allAppraiseLength.value = allAppraise.value.length;
        currentPage.value = res.data.data.pageNum;
        // pageSize.value = res.data.data.pageSize;
    })
    console.log(currentPage.value);
    // dishesEva();
}

const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event)
}
/**
 * 菜肴列表接口
 */
gatFoodListApi({}).then(res => {
    // console.log(res);
    res.data.data.list.forEach((item: any) => {
        if (route.query.shoppingDetalisId == item.foodId) {
            console.log(item);

            foodlist.value = item;
        }
    })
})
dishesEva();
/**
 * 菜肴评价列表
 */
function dishesEva() {
    foodAppraiseListApi({ foodId: route.query.shoppingDetalisId, pageSize: pageSize.value, pageNum: currentPage.value }).then(res => {
        console.log(res.data.data.list);

        foodAppraise.value = res.data.data.list;
        // 好评 差评
        goodAppraise.value = foodAppraise.value.filter((item: any) => item.star >= 4);
        midAppraise.value = foodAppraise.value.filter((item: any) => item.star == 3);
        badAppraise.value = foodAppraise.value.filter((item: any) => item.star <= 2);
        allAppraise.value = foodAppraise.value.filter((item: any) => item.star >= 1);
        if (goodAppraise.value.length == 0) {
            degreePraise.value = 0
        } else {
            degreePraise.value = (goodAppraise.value.length / allAppraise.value.length);

        }
        allAppraiseLength.value = allAppraise.value.length;
        total.value = res.data.data.total;

    })
}
//加入购物车
async function addShoppingCar() {

    let res = await addShoppingCartApi({
        productId: route.query.shoppingDetalisId,
        quantity: ShoppingNumber.value
    });
    console.log(res);
    if (res.data.status == 1) {
        router.push({ name: 'shoppercar' });
        getCartLists();
    } else if (res.data.status == 401) {
        router.push({ name: 'login' });
    }
}

dishesEva();
</script>
<style scoped>
.appraise-label {
    display: flex;
    align-items: center;
}

.shop-detail {
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: 20px;
    background-color: white;
    padding: 20px;
}

.food-picture {
    width: 300px;
    height: 200px;
}

.food-name {
    font-size: 20px;
    font-weight: bold;
}

.food-info {
    font-size: 16px;
    padding: 10px 0 10px 18px;
    font-weight: 500;
}

.shop-appraise-text {
    margin: 20px 0;
    font-weight: 600;
}

.shop-appraise {
    background-color: white;
    padding: 20px;
    display: grid;
    grid-template-columns: 1fr 6fr;
}

.add-shopping-cart_btn {
    margin-left: 20px;
}

.percent {
    color: red;
    font-size: 40px;
    margin-left: 15px;
}

.praise {
    font-size: 16px;
}

::v-deep .penetrate_ml-10 {
    margin-left: 10px;
}

.demo-tabs>.el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
}

.bj-white {
    background-color: white;
}

.grid {
    display: grid;
    grid-template-columns: 1fr 5fr;
    gap: 40px;
    padding: 15px;
    border-bottom: 1px solid #ddd;
}

.user-appraise {
    margin: 10px 0;
}

.avatar-size {
    width: 30px;
    height: 30px;
    margin-right: 10px;
    vertical-align: middle;
    border-radius: 10px;
}
</style>