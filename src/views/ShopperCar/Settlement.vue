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
                <div class="df-sp m-20">
                    <h3>收货人信息</h3>
                    <div>
                        <el-button text @click="address">
                            新增收货地址
                        </el-button>
    
                        <el-dialog v-model="dialogFormVisible" title="新增收货人信息">
                            <el-form :model="form">
                                <el-form-item label="所在地区" :label-width="formLabelWidth">
                                    <elui-china-area-dht isall :leave="4" @change="onChange" v-model="option" placeholder="请选择地区"></elui-china-area-dht>
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
                                <el-form-item label="是否设为默认地址" :label-width="formLabelWidth">
                                    <el-checkbox v-model="checked" label="设为默认地址" size="large" />
                                </el-form-item>
                                <el-form-item label="地址别名" :label-width="formLabelWidth">
                                    <el-select v-model="form.region" placeholder="">
                                    <el-option label="家" value="家" />
                                    <el-option label="父母家" value="父母家" />
                                    <el-option label="公司" value="公司" />
                                    </el-select>
                                </el-form-item>
                            </el-form>
                            <template #footer>
                                <span class="dialog-footer">
                                    <el-button @click="dialogFormVisible = false">取消</el-button>
                                    <el-button type="primary" @click="addCreate()">确定</el-button>
                                </span>
                            </template>
                        </el-dialog>
                    </div>
                </div>
                <!-- consignee  收货人 -->
                <div v-for="(item,index) in receiptList" :class="{ none : index == isCheck?false:true && isDisplayAddress}">
                    <div class="consignee-content mb-20" 
                        @mouseover="mouseover(item)" 
                        @mouseout="mouseout(item)" 
                        @click="choiceAddress(index,item)"
                        :class="{br : index == indexs ? true : false}" 
                        >
                            <div class="df-sp ps-r">
                                <div class="user-info mb-10">
                                    <p class="user-name">{{item.receiver}}</p>
                                    <p class="phones">{{item.phoneNumber}}</p>
                                    <div class="default" :class="{none:item.isDefaultActive == 0 ? true : false}" >默认地址</div>
                                </div>
                                <!-- 操作 -->
                                <div class="operation" :class="{none : !item.is}">
                                    <p class="delete" @click="defaults(item)" :class="{none:item.isDefaultActive == 0 ? false : true}">设为默认</p>
                                    <span class="delete" @click="deleteAddress(item.id)">删除</span>
                                    <p class="delete" @click="edit(item)">编辑</p>
                                </div>
                            </div>
                            <!-- 地址 -->
                            <div class="address">
                                <p class="codeList">
                                    <span v-for="element in codeListGoRepeat">
                                        <span class="pr-10" v-if="element.code == item.provinceCode">{{element.name}}</span> 
                                        <span class="pr-10" v-if="element.code == item.cityCode">{{element.name}}</span> 
                                        <span class="pr-10" v-if="element.code == item.areaCode">{{element.name}}</span>
                                    </span>
                                    <span>{{item.address}}</span>
                                </p>
                            </div>
                    </div> 
                </div>
                <div class="order-add mb-20" v-if="receiptList != ''">
                    <p class="view-all-add" @click="ViewAllAdd" :class="{none : isViewAllAdd}">查看全部地址</p>
                    <p class="stow-add" @click="StowAdd" :class="{none:isStowAdd}">收起地址</p>
                </div>
            </div>
            <!-- 订单信息 -->
            <div class="order-info pd-20 mb-20">
                <div class="order-info_content">
                    <div class="order-list">
                        <!--商品信息 -->
                        <div class="order-main" v-for="item in commodityInfo">
                            <img :src="item.bannerUrl" class="mr-20" alt="">
                            <div class="order-name">
                                <span class="name">
                                    <div>
                                        <span class="foodname"> {{item.productName}} </span> {{item.productDesc}}
                                    </div>
                                    <div><span class="cuisine">菜系 : </span>{{item.categoryName}}</div>
                                </span>
                                <p>x{{item.quantity}}</p>
                                <p>￥{{item.quantity * item.originalPrice}}.00</p>
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
                                    <span class="price">￥{{allPrice}}.00</span>
                                </li>
                                <li>
                                    <strong>运费：</strong>
                                    <span class="price">￥200.00</span>
                                </li>
                                <li>
                                    <strong>优惠金额：</strong>
                                    <span class="price">-￥200.00</span>
                                </li>
                                <li>
                                    <strong>结算金额：</strong>
                                    <span class="price settlements">￥{{allPrice}}.00</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="order-info pd">
                <div class="order-submit">
                    <p>应付金额：<b class="order-submit_price">￥{{allPrice}}.00</b></p>
                </div>
                <!-- 无收货地址 -->
                <div class="ship-to_add pd-20" v-if="receiptList == ''">
                    <span>无收货地址不可下单，<a href="#">点击填充</a></span>
                </div>
                <!-- 配送至 -->
                <div class="delivery-to" v-else>
                    <p class="delivery">配送至：</p>
                    <div>
                        <p>{{addressForm.provinceCode}} {{addressForm.cityCode}} {{addressForm.areaCode}} {{addressForm.address}}</p>
                        <p>{{addressForm.name}} {{addressForm.phoneNumber}}</p>
                    </div>
                </div>
                <!-- 结算按钮 -->
                <div class="settlement-btn ptb-15">
                    <a @click="submitOrder">提交订单</a>
                </div>
            </div>
        </div>
        <el-backtop :right="80" :bottom="100" />
    </main>
</template>

<script lang="ts" setup>
// 三级联动
import { EluiChinaAreaDht}  from 'elui-china-area-dht'
import { onMounted, reactive, ref } from 'vue'
import { addressListApi , addressCreateApi,addressDeleteApi ,addressUpdateApi,orderCreateApi} from '@/api/api';
import  codeLists from './codeList';
import type {commodityInfo,defaultAddress,code,orderInfo,interfaceParameter} from '@/types/xhrPayLoad';
import {ElMessage} from 'element-plus';
import AddAddressValidate from '@/validate/AddAddressValidate';
import {useCounterStore} from '@/stores/counter';
import router from '@/router';

let {setAddressInfo,addressInfo} = useCounterStore();//pinia
let { selectedOptions } = codeLists(); //地址code码
let receiptList = ref();//地址数据
let codeList :any = [];//coed码对应是name
let codeListGoRepeat = ref();//地址列表(数据)
// 提交订单btn
let rows:interfaceParameter[] = []; //后端要的接口参数
let checked = ref(false);//是否设为默认地址
// 获取商品信息
let commodityInfo = JSON.parse(sessionStorage.getItem('commodityInfo') as any); //获取商品列表
let allPrice = ref(0.00);//结算金额
commodityInfo.forEach((el:commodityInfo) => {
    allPrice.value += (el.quantity * el.originalPrice);
});

const dialogFormVisible = ref(false);//新增收货地址弹层
const formLabelWidth = '140px';//table表格 的labelwidth
// 三级联动
const one = ref();//省
const two = ref();//市
const three = ref();//县
const chinaData = new EluiChinaAreaDht.ChinaArea().chinaAreaflat;//收货地址

let isViewAllAdd = ref(false);//查看全部地址
let isStowAdd = ref(true);//收起地址

// 地址编辑按钮
let option = ref();//请选择地区 绑定值
// 点击选择地址
let supIndex = sessionStorage.getItem('addressIndex') as unknown as number;
let index = 0;//获取用户上次点击地址的下标
if (supIndex == null) {
    index = 0
}else{
    index = supIndex
}
let indexs = ref<number>(index != 0 ? index : 0);//进页面默认选中地址的下标
let isCheck = ref<number>(0);//控制地址显示隐藏
let isDisplayAddress = ref(true);//控制none全部显示
let addressIds = ref();//地址id


// 提交订单按钮  (创建订单)
const submitOrder = function(){
    commodityInfo.forEach((item:orderInfo) => {
        rows.push({skuId:item.productId,num:item.quantity}); 
    });
    orderCreateApi({
        addressId:addressIds.value,
        rows:rows,
    }).then(res => {
        console.log(res);
        if (res.data.status == 1) {
            router.push({name:'orderview'})
        }
    })
}

// 设置默认地址 (配送)
onMounted(async()=>{
    await addressList();
    setIndexFun();
})

// 新增收货地址弹层
const form = reactive({
  address:'',//详细地址
  phone:'',//手机号
  lockPhone:'',//固定手机号
  name: '',//收货人
  region: '',//地址别名
  type: [],
})

const mouseover = function(item:any){//鼠标移动上去显示操作
    item.is = true;
}
const mouseout = function(item:any){//离开隐藏操作
    item.is = false;
}

const ViewAllAdd = function(){//查看全部地址点击事件
    isViewAllAdd.value = true;
    isStowAdd.value = false;
    isDisplayAddress.value = false;//显示全部地址
}
const StowAdd = function(){//收起地址点击事件
    isViewAllAdd.value = false;
    isStowAdd.value = true;
    isDisplayAddress.value = true;//收起地址
}
// 新增收货地址
const address = function(){//默认赋值空
    form.name = '';
    form.phone = '';
    form.address = '';
    dialogFormVisible.value = true
}
const addCreate = function(){//新增收货地址 确定按钮
    const formAddress = reactive({
        address:form.address,//详细地址
        phone:form.phone,//手机号
        lockPhone:form.lockPhone,//固定手机号
        name:form.name,//收货人
        chinaDatas:one.value,//地址
    })
    let v = new AddAddressValidate(formAddress);
    v.validate(function () {
        addressCreateApi({
            provinceCode:one.value.value,//省编码
            cityCode:two.value.value,//市编码
            areaCode:three.value.value,//区编码
            address:formAddress.address,//详细地址
            isDefaultActive:checked.value==false  ? '0' : '1',//默认地址
            phoneNumber:formAddress.phone,//手机号
            receiver:formAddress.name,//收货人名字
        }).then(res => {
            if (res.data.msg == '成功') {
                ElMessage.success('添加成功');
                addressList();
                dialogFormVisible.value = false;
            } else {
                ElMessage.warning(res.data.msg)
            }
        })
    })
}

// 地址删除按钮
const deleteAddress = function(ids:number){
    addressDeleteApi({
        id:ids
    }).then(res =>{
        console.log(res);
        if (res.data.status == 1) {
            addressList()
        }else{
            ElMessage({
                message: res.data.msg,
                type: 'warning',
            })
        }
    })
}
// 地址编辑按钮
const edit  = function(item:any){
    console.log(item);
    form.name = item.receiver;
    form.phone = item.phoneNumber;
    form.address = item.address;
    dialogFormVisible.value = true;
}

// 设为默认地址
const defaults = function(item:defaultAddress){
    addressUpdateApi({
        id:item.id,
        provinceCode:item.provinceCode,
        cityCode:item.cityCode,
        areaCode:item.areaCode,
        address:item.address,
        isDefaultActive:1,
        phoneNumber:item.phoneNumber,
        receiver:item.receiver,
    }).then(res => {
        if (res.data.status == 1) {
            addressList()
        }else{
            ElMessage({
                message: res.data.msg,
                type: 'warning',
            })
        }
    })
}
// 点击选择地址
const addressForm = reactive({
    provinceCode:'xxx',
    cityCode:'xxx',
    areaCode:'xxx',
    address:'xxx',//详细地址
    phoneNumber:'xxxx',//电话
    name:'xxx',//name
})
const choiceAddress = function(index:any,item:object){
    indexs.value = index;//控制border
    isCheck.value = index;//控制none
    sessionStorage.setItem('addressIndex',index);
    setAddressInfo(item);
    addressIds.value = addressInfo.id;

    addressForm.address = addressInfo.address;
    addressForm.phoneNumber = addressInfo.phoneNumber;
    addressForm.name = addressInfo.receiver;
    codeListGoRepeat.value.forEach((element:code) => {
        if (element.code == addressInfo.provinceCode) {
            addressForm.provinceCode = element.name
        }else if(element.code == addressInfo.cityCode){
            addressForm.cityCode = element.name
        }else if(element.code == addressInfo.areaCode){
            addressForm.areaCode = element.name
        }
    });
}
// 获取收货地址
function addressList(){
    return addressListApi({}).then(res => {
        receiptList.value = res.data.data;
        res.data.data.forEach((el:any) => {
            selectedOptions.forEach((item:any)=>{
                if (item.code == el.provinceCode) {
                    // console.log(item);//拿到省的code码和name
                    codeList.push(item)
                }
                item.children.forEach((els:any)=>{
                    if (els.code == el.cityCode) {
                        // console.log(els);//拿到市的code码和name
                        codeList.push(els)
                    }
                    if (!els.children) {
                        return
                    }else{
                        els.children.forEach((elss:any) => {
                            if (elss.code == el.areaCode) {
                                // console.log(elss);//拿到区的code码和name
                                codeList.push(elss)
                            }
                        });
                    }
                })
                
            })
            codeListGoRepeat.value = [...new Set(codeList)]
        })
    });
}
function setIndexFun(){//进页面的显示地址 配送
    if(receiptList.value.length){
        choiceAddress(indexs.value,receiptList.value[indexs.value])
    }
}
function onChange(e:any) {//三级联动
    one.value = chinaData[e[0]]
    two.value = chinaData[e[1]]
    three.value = chinaData[e[2]]
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
    height: 45px;
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
    border: 1px solid #f1f1f1;
}
.br{
    border: 1px solid red !important;
}
.consignee-content:hover{
    cursor: pointer;
    border: 1px solid #ccc;
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
    clear: both;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 10px;
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
    /* justify-content: space-between; */
}
.order-main img{
    width: 25%;
    border-radius: 12px;
}
.order-name{
    display: flex;
    justify-content: space-between;
    width: 100%;
}
.user-name{
    text-align: left;
    display: flex;
    flex-direction: column;
    /* align-items: flex-start; */
    justify-content: space-between;
}
.name{
    width: 360px;
    text-align: left;
    display: flex;
    flex-direction: column;
    /* align-items: flex-start; */
    justify-content: space-between;
}
.cuisine{
    font-weight: 550;
}
.foodname{
    color: #ca141d;
    font-size: 18px;
}
.order-name p{
    /* width: 150px; */
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
    top: 3.9px;
    left: 4.2px;
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
    line-height: 28px;
}
.order-total-price li{
    display: flex;
    align-items: center;
}
.settlements{
    font-weight: normal;
    color: #ca141d;
    font-size: 24px;
}
.order-submit{
    font-size: 18px;
    text-align: right;
}
.order-submit_price{
    color: #ca141d;
    font-size: 30px;
}
.ship-to_add{
    background: #fef2f2;
    border: 1px solid #ea9393;
    color: #ca141d;
    font-size: 12px;
}
.ship-to_add a{
    text-decoration: underline;
    color: #ca141d;
}
.ship-to_add span::before{
    content: "";
    width: 12px;
    height: 12px;
    display: inline-block;
    background: url('https://res8.vmallres.com/bp_20221016/images/echannel/icon/icon-tips01.png') no-repeat;
    margin-right: 5px;
    position: relative;
    top: 2px;
}
.settlement-btn{
    margin-top: 20px;
    text-align: center;
    background: #ca141d;
    color: #fff;
    width: 172px;
    font-size:18px;
    border-radius: 2px;
}
.delivery-to{
    display: flex;
    justify-content: space-between;
    background: #fef6f3;
    border: 1px solid #fbd4c4;
    padding: 7px 20px;
    max-width: 350px;
    font-size: 12px;
}
.delivery{
    color: #9a9a9a;
}
.settlement-btn a:hover{
    cursor: pointer;
}
.codeList{
    display: flex;
    align-items: center;
}
</style>