<template>  
    <div class="wrap">
        <div class="shop-detail">
            <div>
                <img class="food-picture" :src="foodlist.bannerUrl" />
            </div>
            <div>
                <div class="food-name">{{ foodlist.foodName }}</div>
                <div class="cuisine food-info">菜品菜系：{{ foodlist.categoryName }}</div>
                <div class="food-info">菜品价格：{{ foodlist.price }}</div>
                <div class="food-info">菜品介绍：{{ foodlist.description }}</div>
                <el-button size='small' @click="appraise">评论此菜品</el-button>
            </div>
        </div>
        <div class="shop-appraise-text">商品评价</div>
        <div class="shop-appraise">
            <div>
                <div class="praise">好评度</div>
                <div class="percent">{{ Math.ceil(degreePraise  *  100) }}%</div>  
            </div>
            <div>
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
                        全部评价({{ allAppraiseLength}})
                    </template>
                    <div class="bj-white grid" v-for="item in foodAppraise">
                        <div v-for="users in item.users">
                            <img class="avatar-size" :src=users.avatarImg alt="">
                            <span class="user-name">{{ item.isRealName == 0 ? '匿名' : reviewUserInfo.avatarName }}</span>
                        </div>
                        <div>
                            <el-rate disabled v-model="item.star" :max="5" allow-half  :colors="['#409eff', '#67c23a', '#FF9900']"/>
                            <div class="user-appraise">{{ item.content }}</div>
                            <div>用户上传的图片</div>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="好评" name="second">
                    <div class="bj-white grid"  v-for="item in goodAppraise">
                            <div v-for="users in item.users"  v-if="item.star >= 4" class="bj-white">
                                <img class="avatar-size" :src=users.avatarImg alt="">
                                <span class="user-name">{{ item.isRealName == 0 ? '匿名' : reviewUserInfo.avatarName }}</span>
                            </div>
                            <div  v-if="item.star >= 4" class="bj-white">
                                <el-rate disabled v-model="item.star" :max="5" allow-half :colors="['#409eff', '#67c23a', '#FF9900']"/>
                                <div class="user-appraise">{{ item.content }}</div>
                                <div>用户上传的图片</div>
                            </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="中评" name="third">
                    <div class="bj-white grid"  v-for="item in midAppraise">
                            <div v-for="users in item.users" v-if="item.star == 3" class="bj-white">
                                <img class="avatar-size" :src=users.avatarImg alt="">
                                <span class="user-name">{{ item.isRealName == 0 ? '匿名' : reviewUserInfo.avatarName }}</span>
                            </div>
                            <div v-if="item.star == 3" class="bj-white">
                                <el-rate disabled v-model="item.star" :max="5" allow-half  :colors="['#409eff', '#67c23a', '#FF9900']"/>
                                <div class="user-appraise">{{ item.content }}</div>
                                <div>用户上传的图片</div>
                            </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="差评" name="fourth">
                    <div class="bj-white grid" v-for="item in badAppraise">
                            <div v-for="users in item.users" v-if="item.star <= 2" class="bj-white">
                                <img class="avatar-size" :src=users.avatarImg alt="">
                                <span class="user-name">{{ item.isRealName == 0 ? '匿名' : reviewUserInfo.avatarName }}</span>
                            </div>
                            <div v-if="item.star <= 2" class="bj-white">
                                <el-rate disabled v-model="item.star" :max="5" allow-half  :colors="['#409eff', '#67c23a', '#FF9900']"/>
                                <div class="user-appraise">{{ item.content }}</div>
                                <div>用户上传的图片</div>
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
        <el-dialog
            v-model="centerDialogVisible"
            title="评价此菜品"
            width="400px"
            align-center 
            >
            <div class="appraise-content">
                <div><textarea rows="6" columns="30" v-model="appraiseContent" placeholder="评价内容"></textarea></div>
                <input type="number" v-model="star">星评价 
                <br>
                <el-switch v-model="value1" />
            </div>
            <template #footer>
            <span class="dialog-footer">
                <el-button @click="centerDialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="submitAppraise">
                    提交
                </el-button>
            </span>
            </template>
        </el-dialog>
    </div>
</template>
<script setup lang="ts">
import { gatFoodListApi, foodAppraiseListApi, addFoodAppraiseApi } from '@/api/api';
import { useRoute } from 'vue-router';
import type { TabsPaneContext } from 'element-plus';
import { ref } from 'vue';
import { useId } from '@/stores/getUserId';
import { storeToRefs } from "pinia";
let aa = useId()
aa.getUserIds();
let { userId } = storeToRefs(aa);
console.log(userId.value);

let route = useRoute();
let centerDialogVisible = ref(false);
let foodlist: any = ref({});
let foodAppraise = ref();
let reviewUserInfo = ref();
let appraiseContent: any = ref('');
let star = ref(0);
let allAppraise = ref();
let allAppraiseLength = ref();
let goodAppraise = ref();
let midAppraise =ref();
let badAppraise = ref();
let degreePraise = ref();
const activeName = ref('first');
const value1 = ref(true);

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
const handleCurrentChange = (val: number) => {
//   console.log(`current page: ${val}`)
    currentPage.value = val;
    foodAppraiseListApi({ foodId: route.query.shoppingDetalisId ,pageSize:5,pageNum:currentPage.value}).then(res => {
        foodAppraise.value = res.data.data.list;
        // 好评 差评
        goodAppraise.value = foodAppraise.value.filter((item: any) => item.star >= 4);
        midAppraise.value = foodAppraise.value.filter((item: any) => item.star == 3);
        badAppraise.value = foodAppraise.value.filter((item: any) => item.star <= 2);
        allAppraise.value = foodAppraise.value.filter((item: any) => item.star >= 1);
        degreePraise.value = (goodAppraise.value.length / allAppraise.value.length);
        allAppraiseLength.value = allAppraise.value.length;
        currentPage.value = res.data.data.pageNum;
        // pageSize.value = res.data.data.pageSize;
    })
    console.log( currentPage.value);
    
    // dishesEva();
}


const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event)
}

/**
 * 菜肴列表接口
 */
gatFoodListApi().then(res => {
    // console.log(res);
    res.data.data.list.forEach((item: any) => {
        if (route.query.shoppingDetalisId == item.foodId) {
            foodlist.value = item;
            console.log(foodlist.value);
        }
    })
})
dishesEva();
/**
 * 菜肴评价列表
 */
 
function dishesEva() {
    foodAppraiseListApi({ foodId: route.query.shoppingDetalisId ,pageSize:pageSize.value,pageNum:currentPage.value}).then(res => {
        console.log(res.data.data.list);
        
        foodAppraise.value = res.data.data.list;
        // 好评 差评
        goodAppraise.value = foodAppraise.value.filter((item: any) => item.star >= 4);
        midAppraise.value = foodAppraise.value.filter((item: any) => item.star == 3);
        badAppraise.value = foodAppraise.value.filter((item: any) => item.star <= 2);
        allAppraise.value = foodAppraise.value.filter((item: any) => item.star >= 1);
        degreePraise.value = (goodAppraise.value.length / allAppraise.value.length);
        allAppraiseLength.value = allAppraise.value.length;
        total.value = res.data.data.total;
    })
}
function appraise() {
    centerDialogVisible.value = true;
}
async function submitAppraise() {
    /**
     * 新增菜肴评价
     */
    let res = await addFoodAppraiseApi({
        userId: userId.value,
        foodId: route.query.shoppingDetalisId,
        content: appraiseContent.value,
        star: star.value,
        isRealName: 0
    });
    console.log(res);
    console.log('又增加了一个评论');
    dishesEva();
    centerDialogVisible.value = false;
}
dishesEva();
</script>
<style scoped>
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