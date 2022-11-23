<template>
    <div v-if="cartList != 'undefined' || cartList != 'null'">
        <el-empty image="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"/>
    </div>
    <div v-else>
        <div class="warp center" >
            <!-- 搜索框 -->
            <el-input v-model="input" class="w-300 m-20 input" size="large" placeholder="请输入您想要了解的美食" :suffix-icon="Search"/>
            <div class="nav pd-10 df-al">
                <p>全部商品 {{ 1 }}</p>
            </div>
            <el-table
                ref="multipleTableRef"
                :data="cartList"
                class="mb-20"
                select-all
                style="width: 100%"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" />
                <el-table-column label="商品" width="370px">
                    <template #default="scope">
                        <div class="commodity">
                            <img class="commodity-icon" :src="scope.row.bannerUrl" alt="">
                            <div class="df-sub">
                                <p>{{scope.row.productDesc}}</p>
                                <div class="type">{{scope.row.categoryName}}</div>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="单价" show-overflow-tooltip>
                    <template #default="scope">
                        <p>￥{{scope.row.originalPrice}}.00</p>
                        <el-tooltip
                            class="box-item"
                            effect="dark"
                            content="Bottom Right prompts info"
                            placement="bottom-end"
                        >
                        <template #content>
                            <span class="checked-content">
                                <el-checkbox v-model="checked2">
                                    满2000元减20元，包邮（限中国内地）
                                </el-checkbox>
                            </span>
                        </template>
                            <el-button>促销</el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column label="数量" width="180" >
                    <template #default="scope">
                        <el-input-number v-model="scope.row.quantity" :min="1" :max="111000" @change="handleChange(scope.row.quantity,scope.row.id,scope.row.originalPrice)" />
                    </template>
                </el-table-column>
                <el-table-column label="小计" width="120" >
                    <template #default="scope">
                        <span class="cl-r">￥{{scope.row.id == ids ? prices : scope.row.totalPrice}}.00</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="120" >
                    <template #default>
                        <p class="delete">删除</p>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 去结算 -->
        <div class="go-settlement mt-20 mb-20">
            <div class="go-settlement_left">
                <!-- <el-checkbox v-model="checked2" class="pl-10">全选</el-checkbox> -->
                <p class="ml-10">删除选中的商品</p>
            </div>
            <div class="go-settlement_right">
                <p>已选择 <span class="cl-red">{{1}}</span> 件商品</p>
                <p class="ml-10">总价：<span class="cl-red total-price">￥0.00</span></p>
                <el-button @click="toSettlement" type="danger" class="go-settlement_btn ml-10">去结算</el-button>
            </div>
        </div>
        <el-backtop :right="90" :bottom="100" />
    </div>
</template>

<script lang="ts" setup>
import { cartListApi } from '@/api/api';
import { Search } from '@element-plus/icons-vue';
import {ref } from 'vue';
import { ElTable ,ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';

let router = useRouter();
const checked2 = ref(false)
let input = ref();
interface User {
  date: string
  address: string
}

const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<User[]>([])
const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val
}

const isPlusReduce = ref(false);
let prices = ref();
let ids = ref();
const handleChange = (value: number,id:number,price:number) => {
  console.log(value)
  console.log('id',id);
  console.log('price',price);

  isPlusReduce.value = true
  ids.value = id;
  prices.value = price * value
}
// 结算按钮
const toSettlement = function(){
    router.push({name:'settlement'});
};
const cartList = ref();
cartListApi().then(res => {
    if (res.status == 401) {
        ElMessage({
            message: '请先登录.',
            type: 'success',
        })
        router.push({name:'login'})
    }else{
        cartList.value = res.data;
        console.log(res.data);
    }
})
</script>

<style scoped>
.input{
    float: right;
}
.nav p{
    clear: both;
    font-size: 16px;
    color: #f7d347;
    font-weight: 550;
    margin: 0px;
}
.center{
    background:#fff;
    overflow: hidden;
    width: 1200px;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 0 20px;
}
.commodity-icon{
    width: 23%;
}
.commodity{
    display: flex;
    justify-content: space-between;
}
.commodity p{
    width: 250px;
    cursor: pointer;
}
.commodity p:hover{
    color: #409eff;
}

.box-item {
  width: 110px;
  margin-top: 10px;
}
/* 选服务的btn */
.option-service{
    width: 20px;
    height: 19px;
}

.btn-content{
    line-height: 18px;
    width: 85px;
    text-align: left;
    color: #fff;
    border: 1px solid #ccc;
    cursor: pointer;
    padding: 10px;
}
.btn-content:hover{
    color: #409eff;
    background-color: #ecf5ff;
    border: 1px solid #409eff;
}
.btn-content_item{
    padding: 0 10px;
}
.content{
    display: flex;
    align-items: center;
}
.delete{
    cursor: pointer;
}
.delete:hover{
    color: red;
}

/* 结算 */
::v-deep .el-button{
    border-radius: 0;
}
.go-settlement_btn{
    width: 94px;
    height: 52px;
    font-size: 16px;
    font-weight: 550;
}
.go-settlement{
    display: flex;
    align-items: center;
    border: 1px solid #ebeef5;
    justify-content: space-between;
    font-size: 12px;
    background-color: #fff;
}
.go-settlement_left{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.go-settlement_left{
    cursor: pointer;
}
.go-settlement_left p:hover{
    color: #E2231A;
}
.go-settlement_right{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.total-price{
    font-size: 16px;
}
.checked-content{
    color: #fff;
}
.cl-r{
    color: #E2231A;
}
::v-deep .el-table tr{
    background: #fff4e8;
}
.type{
    padding: 0 12PX;
    height: 20PX;
    line-height: 20PX;
    text-align: center;
    color: #fff;
    background: #cb1f17;
    display: inline-block;
    margin-right: 16PX;
    font-style: normal;
}
</style>