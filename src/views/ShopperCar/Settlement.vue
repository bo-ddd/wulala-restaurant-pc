<template>
    <main>
        <div class="warp center">
            <div class="nav m-20">
                <div class="settlement">
                    <img src="@/assets/images/settlement-icon.png" alt="">
                    <p>结算页</p>
                </div>
                <el-steps :space="200" :active="2" align-center finish-status="success">
                    <el-step title="1.我的购物车" />
                    <el-step title="2.填写核对订单信息" />
                    <el-step title="3.成功提交订单" />
                </el-steps>
            </div>
            <!-- 收货人信息 -->
            <div class="content plr-20 m-20">
                <!-- <div>
                配送至：<elui-china-area-dht isall :leave="4" @change="onChange"></elui-china-area-dht>
                </div> -->
                <div class="df-sp m-20">
                    <h3>收货人信息</h3>
                    <div>
                        <el-button text @click="dialogFormVisible = true">
                            新增收货地址
                        </el-button>
    
                        <el-dialog v-model="dialogFormVisible" title="新增收货人信息">
                            <el-form :model="form">
                                <el-form-item label="所在地区" :label-width="formLabelWidth">
                                    <elui-china-area-dht isall :leave="4" @change="onChange"></elui-china-area-dht>
                                </el-form-item>
                                <el-form-item label="收货人" :label-width="formLabelWidth">
                                    <el-input v-model="form.name" autocomplete="off" />
                                </el-form-item>
                                <el-form-item label="详细地址" :label-width="formLabelWidth">
                                    <el-input v-model="form.address" autocomplete="off" />
                                </el-form-item>
                                <el-form-item label="手机号码" :label-width="formLabelWidth">
                                    <el-input v-model="form.phone" autocomplete="off" placeholder="86+" />
                                </el-form-item>
                                <el-form-item label="固定电话" :label-width="formLabelWidth">
                                    <el-input v-model="form.lockPhone" autocomplete="off" placeholder="86+" />
                                </el-form-item>
                                <el-form-item label="地址别名" :label-width="formLabelWidth">
                                    <el-select v-model="form.region" placeholder="">
                                    <el-option label="家" value="shanghai" />
                                    <el-option label="父母家" value="beijing" />
                                    <el-option label="公司" value="beijing" />
                                    </el-select>
                                </el-form-item>
                            </el-form>
                            <template #footer>
                                <span class="dialog-footer">
                                    <el-button @click="dialogFormVisible = false">取消</el-button>
                                    <el-button type="primary" @click="dialogFormVisible = false">确定</el-button>
                                </span>
                            </template>
                        </el-dialog>
                    </div>
                </div>
                <!-- consignee  收货人 -->
                <div class="consignee-content mb-20" @mouseover="mouseover" @mouseout="mouseout">
                    <div class="df-sp">
                        <div class="user-info mb-10">
                            <p class="name">刘伟耨</p>
                            <p class="phones">13145674567</p>
                            <div class="default">默认地址</div>
                        </div>
                        <!-- 操作 -->
                        <div class="operation" :class="{none : isActive}">
                            <el-popconfirm 
                            title="您确认要删除该地址吗?" 
                            width="200px"
                            confirm-button-text="确认"
                            cancel-button-text="取消"
                            >
                                <template #reference>
                                    <span class="delete">删除</span>
                                </template>
                            </el-popconfirm>
                            <p class="delete" @click="dialogFormVisible = true">编辑</p>
                        </div>
                    </div>
                    <!-- 地址 -->
                    <div class="address">
                        <p>山西省 阳泉市 盂县 吸烟者 南村</p>
                    </div>
                </div> 
                <div class="order-add mb-20">
                    <p class="view-all-add" @click="ViewAllAdd" :class="{none : isViewAllAdd}">查看全部地址</p>
                    <p class="stow-add" @click="StowAdd" :class="{none:isStowAdd}">收起地址</p>
                </div>
            </div>
            <!-- 订单信息 -->
            <div class="order-info pd-20">
                <div class="order-info_content">
                    <div class="order-list">
                        <!--商品信息 -->
                        <div class="order-main">
                            <img src="@/assets/images/Carousel-02.png" class="mr-20" alt="">
                            <div class="order-name">
                                <span class="name">撒旦解放上的飞机螺丝钉法律上的会计分录撒旦解放老师看了电视剧k</span>
                                <p>x1</p>
                                <p>￥5,000.00</p>
                            </div>
                        </div>
                        <!-- 发票信息 -->
                        <div class="invoice-info">
                            <p class="mr-20">发票信息</p>
                            <p class="notes">商品由第三方卖家销售，发票内容由其卖家决定，发票由卖家开具并寄出</p>
                        </div>
                    </div>
                    <!-- 结算价格信息 -->
                    <div class="order-total">
                        <div class="order-delivery">
                            <div class="garden"></div>
                            <p>标准配送</p>
                        </div>
                        <div class="order-total-price">
                            <ul>
                                <li>
                                    <strong>商品总金额：</strong>
                                    <span class="price">￥5,000.00</span>
                                </li>
                                <li>
                                    <strong>运费：</strong>
                                    <span class="price">￥0.00</span>
                                </li>
                                <li>
                                    <strong>优惠金额：</strong>
                                    <span class="price">-￥200.00</span>
                                </li>
                                <li>
                                    <strong>结算金额：</strong>
                                    <span class="price settlement">￥4,800.00</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script lang="ts" setup>
// 三级联动
import { EluiChinaAreaDht}  from 'elui-china-area-dht'
import { reactive, ref } from 'vue'

const dialogTableVisible = ref(false)
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const form = reactive({
  address:'',//详细地址
  phone:'',//手机号
  lockPhone:'',//固定手机号
  name: '',//收货人
  region: '',//地址别名
  type: [],
})
// 三级联动
const chinaData = new EluiChinaAreaDht.ChinaArea().chinaAreaflat;
function onChange(e:any) {
  const one = chinaData[e[0]]
  const two = chinaData[e[1]]
  const three = chinaData[e[2]]
  console.log(one, two,three)
}
const isActive = ref(true);
const mouseover = function(){
    isActive.value = false;
}
const mouseout = function(){
    isActive.value = true;
}
let isViewAllAdd = ref(false)
let isStowAdd = ref(true);
const ViewAllAdd = function(){
    isViewAllAdd.value = true;
    isStowAdd.value = false
}
const StowAdd = function(){
    isViewAllAdd.value = false;
    isStowAdd.value = true
}
</script>

<style scoped>
main{
    background:#fff;
    overflow: hidden;
}
.nav{
    display: flex;
    justify-content: space-between;
}
.nav p{
    font-size: 24px;
}
.center{
    width: 1200px;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 20px;
}
::v-deep .el-steps--horizontal{
    width: 500px;
}
::v-deep .el-step__title{
    font-size: 12px;
}
.settlement{
    display: flex;
    width: 140px;
    align-items: flex-end;
    justify-content: space-between;
}
.content{
    border: 1px solid #ebeef5;
    box-shadow: 4px 4px 20px #ccc;
}
.user-info{
    display: flex;
    align-items: center;
    gap: 24px;
    font-size: 14px;
}
.address{
    color: #9a9a9a;
    height: 20px;
    font-size: 14px;
}
.default{
    padding: 0 1px;
    font-size: 12px;
    color: #E64566;
    border: 1px solid #E64566;
    border-radius: 2px;
}
.consignee-content{
    padding: 16px;
    border: 1px solid red;
}
.consignee-content:hover{
    cursor: pointer;
}
.delete:hover{
    color: red;
}
.operation{
    display: flex;
    gap: 10px;
    font-size: 12px;
    color: #aaa;
}
.none{
    display: none;
}
.order-add p{
    font-size: 14px;
    color: #a4a4a4;
}
.order-add p:hover{
    cursor: pointer;
}
.view-all-add::after{
    content: "";
    width: 12px;
    height: 10px;
    display: inline-block;
    margin-left: 4px;
    background: url('@/assets/images/sub.png') 100% no-repeat;
    background-size: 100%;
}
.stow-add::after{
    content: "";
    width: 12px;
    height: 10px;
    display: inline-block;
    margin-left: 4px;
    background: url('@/assets/images/sup.png') 100% no-repeat;
    background-size: 100%;
}
/* 订单信息 */
.order-info{
    border: 1px solid #ebeef5;
    box-shadow: 4px 4px 20px #ccc;
}
.order-info_content{
    background: #f6f6f6;
    border: 1px solid #eaeaea;
    width: 1120px;
    position: relative;
    display: flex;
    justify-content: space-between;
}
.order-list{
    width: 70%;
    background-color: #fff;
    border-right: 1px solid #eaeaea;
}
.order-total{
    width: 30%;
    background-color: rgb(246, 246,246);
}
.order-main{
    padding: 20px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
}
.order-main img{
    width: 100px;
    height: 100px;
}
.order-name{
    display: flex;
    justify-content: space-between;
}
.name{
    width: 360px;
    text-align: left;
}
.order-name p{
    width: 150px;
    text-align: center;
}
/* 发票 */
.invoice-info{
    display: flex;
    line-height: 30px;
    font-size: 18px;
    border-top: 1px solid #eaeaea;
    padding: 20px;
}
.notes{
    font-size: 12px;
    color: #a4a4a4;
}
/* 园 */
.garden{
    width: 18px;
    height: 18px;
    background: #ca141d;
    border-color: #ca141d;
    position: relative;
    border-radius: 20px;
    border: 1px solid #fff;
}
.garden::before{
    content: "";
    width: 10px;
    height: 10px;
    border-radius: 10px;
    background: #fff;
    position: absolute;
    z-index: 1;
    top: 4.2px;
    left: 3.7px;
    box-shadow: 0 -2px 2px 0 rgb(146 5 12 / 50%);
}
.order-delivery{
    display: flex;
    gap: 10px;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid #eaeaea;
}
.price , strong{
    font-weight: normal;
    display: table-cell;
    width: 120px;
    vertical-align: middle;
    text-align: right; 
}
.order-total-price{
    font-size: 14px;
    position: absolute;
    bottom: 0;
    right: 0;
    padding:0  20px;
    line-height: 25px;
}
.order-total-price li{
    display: flex;
    align-items: center;
}
.settlement{
    font-weight: normal;
    color: #ca141d;
    font-size: 24px;
}
</style>