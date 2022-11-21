<template>
   
        <div class="warp center">
            <!-- 搜索框 -->
            <el-input v-model="input" class="w-300 m-20 input" size="large" placeholder="请输入您想要了解的美食" :suffix-icon="Search"/>
            <div class="nav pd-10 df-al">
                <p>全部商品 {{ 1 }}</p>
                <!-- <div>
                    带isall参数和leave参数示例
                    配送至：<elui-china-area-dht isall :leave="4" @change="onChange"></elui-china-area-dht>
                </div> -->
            </div>
            <el-table
                ref="multipleTableRef"
                :data="tableData"
                class="mb-20"
                select-all
                style="width: 100%"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" />
                <el-table-column label="商品" width="370px">
                    <template #default>
                        <div class="commodity">
                            <img class="commodity-icon" src="@/assets/images/Carousel-02.png" alt="">
                            <div>
                                <p>撒旦解放上的飞机螺丝钉法律上的会计分录撒旦解放老师看了电视剧k</p>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="单价" show-overflow-tooltip>
                    <template #default>
                        <p>$5,000.00</p>
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
                    <template #default>
                        <el-input-number v-model="num" :min="1" :max="10" @change="handleChange" />
                    </template>
                </el-table-column>
                <el-table-column label="小计" width="120" >
                    <template #default>
                        <span class="cl-r">$5,000.00</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="120" >
                    <template #default>
                        <p class="delete">删除</p>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 去结算 -->
            <div class="go-settlement mb-20">
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
        </div>
        <el-backtop :right="100" :bottom="100" />
</template>

<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue'
import {ref } from 'vue';
import { ElTable } from 'element-plus'
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

const tableData: User[] = [
  {
    date: '2016-05-03',
    address: 'No. 189, Grove St, Los Angeles',
  },
]

const num = ref(1)
const handleChange = (value: number) => {
  console.log(value)
}
// 结算按钮
const toSettlement = function(){
    router.push({name:'settlement'});
}
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
    width: 80px;
    height: 80px;
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
</style>