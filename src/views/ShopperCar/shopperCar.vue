<template>
    <div v-if="(cartList == 0)">
        <el-empty :image-size="200"
        description="购物车空空的哦~，去看看心仪的商品吧~"
        >
            <el-button type="primary" @click="router.push({name:'mall'})">去逛逛</el-button>
        </el-empty>
    </div>
    <div v-else>
        <div class="warp center" >
            <!-- 搜索框 -->
            <el-input v-model="input" class="w-300 m-20 input" size="large" placeholder="请输入您想要了解的美食" :suffix-icon="Search"/>
            <div class="nav pd-10 df-al">
                <p>全部商品 {{ cartListLength }}</p>
            </div>
            <!-- :row-style="isSelected == true ? rowState : isRowState" -->
            <el-table
                ref="multipleTableRef"
                :data="cartList"
                class="mb-20 bj"
                select-all
                style="width: 100%"
                @selection-change="handleSelectionChange"
                @select="handleValue"
            >
                <el-table-column type="selection" width="55" :checked="true"/>
                <el-table-column label="商品" width="370px">
                    <template #default="scope">
                        <div class="commodity">
                            <img class="commodity-icon" :src="scope.row.bannerUrl" alt="">
                            <div class="df-sub">
                                <el-tooltip :content="scope.row.productDesc" placement="right">
                                    <p>{{scope.row.productName}}</p>
                                </el-tooltip>
                                <!-- <p>{{scope.row.productDesc}}</p> -->
                                <div class="type">{{scope.row.categoryName}}</div>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="单价" show-overflow-tooltip>
                    <template #default="scope">
                        <p>￥{{scope.row.originalPrice}}</p>
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
                        <el-input-number v-model="scope.row.quantity" :min="1" :max="111000" @change="handleChange(scope.row.quantity,
                        scope.row.id,scope.row.originalPrice,scope.row)" />
                    </template>
                </el-table-column>
                <el-table-column label="小计" width="120" >
                    <template #default="scope">
                        <span class="cl-r">￥{{scope.row.id == ids ? prices : scope.row.totalPrice}}.00</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="120" >
                    <template #default="scope">
                        <p class="delete" @click="deletes(scope.row)">删除</p>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 去结算 -->
        <el-affix position="bottom" :offset="10">
            <div class="go-settlement mt-20 mb-20">
                <div class="go-settlement_left">
                    <!-- <el-checkbox v-model="checked2" class="pl-10">全选</el-checkbox> -->
                    <p class="ml-10" @click="deleteCommdoity">删除选中的商品</p>
                </div>
                <div class="go-settlement_right">
                    <p>已选择 <span class="cl-red">{{multipleSelectionLength}}</span> 件商品</p>
                    <p class="ml-10">总价：<span class="cl-red total-price">￥{{multipleSelectionPrice}}</span></p>
                    <el-button @click="toSettlement" type="danger" class="go-settlement_btn ml-10">去结算</el-button>
                </div>
            </div>
        </el-affix>
        <el-backtop :right="90" :bottom="100" />
    </div>
</template>

<script lang="ts" setup>
import { cartListApi , cartDeleteApi , cartAddApi} from '@/api/api';
import { Search, User } from '@element-plus/icons-vue';
import { onMounted, ref } from 'vue';
import { ElTable ,ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
// import { useCounterStore } from '@/stores/counter';
// let { setCommodityInfo } = useCounterStore();
//修改table样式
// const rowState = () => {
//   return {
//     backgroundColor: '#fff4e8',
//   }
// }  

let router = useRouter();
const checked2 = ref(false)
let input = ref();
interface User {
  date: string
  address: string
  totalPrice?:number
  quantity:number
  originalPrice:number
}

const multipleTableRef = ref<InstanceType<typeof ElTable>>();//设置默认选中
const multipleSelection = ref<User[]>([]);
const multipleSelectionLength = ref(0);//勾选商品数量
const multipleSelectionPrice = ref(0.00);
let vals = ref();
const handleSelectionChange = (val: User[]) => {
  vals.value = val;
  multipleSelection.value = val;
  multipleSelectionLength.value = multipleSelection.value.length;
//   console.log(val); //选中的商品
  multipleSelectionPrice.value =  0 
  val.forEach(el => {
    multipleSelectionPrice.value += (el.quantity * el.originalPrice)
  })
}
// 选中
let isSelected = ref();
const handleValue = (select : any,val : any) => {
    isSelected.value = select.length && select.indexOf(val) !== -1  // true就是选中，0或者false是取消选中  
}

const deleteCommdoity = function(){
    if (multipleSelection.value.length == 0) {
        ElMessage({
            message: '您还没选中商品哦',
            type: 'warning',
        })
    }else{
        multipleSelection.value.forEach((item:any) => {
            cartDeleteApi({
                id:item.id
            }).then(res => {
                if (res.data.status == 1) {
                    cartLists()
                }
            }).catch(err => {
                console.log(err);
            })
        })
    }
}

const deletes = (scope : any)=>{
    cartDeleteApi({
        id:scope.id
    }).then(res => {
        if (res.data.status == 1) {
            cartLists()
        }
    }).catch(err => {
        console.log(err);
    })
}

// 计算加减
const isPlusReduce = ref(false);
let prices = ref();
let ids = ref();
const handleChange = (value: number,id:number,price:number,scope:any) => {
  isPlusReduce.value = true
  ids.value = id;
  prices.value = price * value;

  cartAddApi({
    id:scope.id,
    productId:scope.productId,
    quantity:scope.quantity,
  }).then((res:any) => {
    if (res.data.status != 1) {
        ElMessage({
            message: res.msg,
            type: 'warning',
        })
    }else{
        // console.log('成功');
        let commodityId = ref([]);
        // console.log(vals.value); //选中数据
        
        vals.value.forEach((el: { id: any; }) => {
            return commodityId.value.push(el.id as never);
        });
        // 同步加减时候的价格
        multipleSelectionPrice.value = 0
        cartList.value.forEach((item: any) => {
            commodityId.value.forEach((el)=>{
                if (item.id == el) {
                    // console.log(item); 点击加号获取选中数据
                    multipleSelectionPrice.value += (item.quantity * item.originalPrice)
                }
            })
        });
    }
    }).catch(err=>{
        console.log(err);
    })
    }
// 结算按钮
const toSettlement = function(){
    if(multipleSelection.value.length == 0){
        ElMessage({
            message: '请选中你要结算的商品',
            type: 'warning',
        })
    }else{
        // console.log(multipleSelection.value); //选中结算的数据
        // setCommodityInfo(multipleSelection.value);
        sessionStorage.setItem('commodityInfo',JSON.stringify(multipleSelection.value))
        router.push({name:'settlement'});
    }
};
// 设置默认选中
interface row{
avatarName:string, 
bannerUrl:string, 
categoryId:number, 
categoryName:string, 
id:number, 
originalPrice:number, 
productDesc:string, 
productId:number, 
productName:string, 
quantity: number,
totalPrice:number, 
userId:number, 
}
// let commodityInfo = sessionStorage.getItem('commodityInfo') as string;
// onMounted(()=>{
//     let row = JSON.parse(commodityInfo);
//     console.log(multipleTableRef.value);
//     console.log(JSON.parse(commodityInfo));
//     row.forEach((rows:row) => {
        
//         // multipleTableRef.value!.toggleRowSelection(JSON.parse(commodityInfo),true)
//         multipleTableRef.value!.toggleAllSelection();
//     });
// })

// 拿购物车列表
let cartList = ref();
let cartListLength = ref();
const cartLists = function(){
    cartListApi().then(res => {
        if (res.data.status != 1) {
            ElMessage({
                message: '请先登录.',
                type: 'success',
            })
            router.push({name:'login'})
        }else{
            cartList.value = res.data.data;

            cartListLength.value =cartList.value.length;
        }
    }).catch(err => {
        console.log(err);
    })
}
cartLists();
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
    width: 30%;
    height: 100%;
    border-radius: 7px;
}
.commodity{
    display: flex;
    gap: 20px;
}
.commodity p{
    width: 100%;
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
/* .bj ::v-deep .el-table tr{
    background: #fff4e8;
} */
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