<template>
  <div>
    <div class="warp">
      <div class="header">
        <el-row class="tac">
          <el-col :span="12">
            <el-menu
              :default-active="1"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
            >
              <el-menu-item index="1">
                <span>我的订单</span>
              </el-menu-item>
              <el-menu-item index="2">
                <span>商品详情</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
        <el-tabs type="border-card">
          <el-tab-pane label="所有订单">
            <div class="mt-4">
              <el-input
                v-model="input3"
                placeholder="输入商品标签或订单号进行搜索"
                class="input-with-select"
              >
                <template #append>
                  <el-button :icon="Search" />
                </template>
              </el-input>

              <el-table stripe style="width: 100%" empty-text=" ">
                <el-table-column label="订单详情" width="590" />
                <el-table-column label="收货人" width="80" />
                <el-table-column label="金额" width="90" />
                <el-table-column label="状态" width="90" />
                <el-table-column label="操作" width="80" />
              </el-table>
              <tbody v-for="(item,index) in orderLists" :key="index">
                <tr class="tr-th">
                  <td colspan="5" class="td">
                    <span class="dealtime">{{new Date(item.createdAt).toLocaleDateString()}}</span>
                    <span class="number">订单号:</span>
                    <span class="numbers">{{item.orderSn}}</span>
                    <img
                      class="del"
                      src="@/assets/images/icon-del.png"
                      alt=""
                    />
                  </td>
                </tr>
                <tr class="tr-bd">
                  <td class="td-shops">
                    <tr v-for="(el,index) in item.rows" :key="index">
                    <td class="td-shop">
                    <div class="goods-item">
                      <div class="p-img">
                        <img :src="el.bannerUrl" alt="" />
                      </div>
                      <div class="p-msg">
                        <div class="p-name">
                          {{el.productName}}
                        </div>
                      </div>
                    </div>
                    <div class="goods-number">x{{el.num}}</div>
                    <div class="goods-repair">
                      <span class="br">申请售后</span>
                      <span class="br">卖了换钱</span>
                    </div>
                  </td>
                </tr>
                  <!-- <tr v-for="(item,index) in ordereRow" :key="index">
                    <td class="td-shop">
                    <div class="goods-item">
                      <div class="p-img">
                        <img :src="item.bannerUrl" alt="" />
                      </div>
                      <div class="p-msg">
                        <div class="p-name">
                          {{item.productName}}
                        </div>
                      </div>
                    </div>
                    <div class="goods-number">x{{item.num}}</div>
                    <div class="goods-repair">
                      <span class="br">申请售后</span>
                      <span class="br">卖了换钱</span>
                    </div>
                  </td>
                </tr> -->


              </td>
                  <td>
                    <el-popover
                      placement="left-start"
                      :width="200"
                      trigger="hover"
                    >
                    <template #default>
                      <p>{{item.receiver}}</p>
                      <p>山西省阳泉市盂县西烟镇南社村</p>
                      <p>{{item.phoneNumber}}</p>
                    </template>
                      <template #reference>
                        <div class="user">
                          <span class="txt">{{item.receiver}}</span>
                          <img
                            class="user-img"
                            src="@/assets/images/icon-user.png"
                          />
                        </div>
                      </template>
                    </el-popover>
                  </td>
                  <td>
                    <div class="amount">
                      <span>￥{{item.amount}}</span>
                      <br />
                      <span class="ftx-13">在线支付</span>
                    </div>
                  </td>
                  <td>
                    <div class="status">
                      <span class="amount">已完成</span>
                      <br />
                      <span>订单详情</span>
                    </div>
                  </td>
                  <td>
                    <div class="operate">
                      <span>查看发票</span>
                      <br />
                      <span>追加评论</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </div>
          </el-tab-pane>
          <el-tab-pane label="待付款">
            <el-table stripe style="width: 100%" empty-text=" ">
              <el-table-column label="订单详情" width="540" />
              <el-table-column label="收货人" width="80" />
              <el-table-column label="金额" width="90" />
              <el-table-column label="状态" width="90" />
              <el-table-column label="操作" width="80" />
            </el-table>

            <tbody>
              <tr class="tr-th">
                <td colspan="5" class="td">
                  <span class="dealtime">2021-11-16 19:36:21</span>
                  <span class="number">订单号:</span>
                  <span class="numbers">230307184410</span>
                  <span class="titless">京耳官方旗舰店</span>
                  <img class="del" src="@/assets/images/icon-del.png" alt="" />
                </td>
              </tr>
              <tr class="tr-bd">
                <td>
                  <div class="goods-item">
                    <div class="p-img">
                      <img src="@/assets/images/jer.jpg" alt="" />
                    </div>
                    <div class="p-msg">
                      <div class="p-name">
                        京耳
                        蓝牙耳机真无线运动跑步游戏音乐降噪电脑双耳适用智能手机
                        白色
                      </div>
                    </div>
                  </div>
                  <div class="goods-number">x1</div>
                </td>
                <td>
                  <div class="user">
                    <span class="txt">刘伟博</span>
                    <img
                      class="user-img"
                      src="@/assets/images/icon-user.png"
                      alt=""
                    />
                  </div>
                </td>
                <td>
                  <div class="amount">
                    <span class="payment">应付</span>
                    <br />
                    <span class="payment">￥9.90</span>
                    <br />
                    <span class="ftx-13">在线支付</span>
                  </div>
                </td>
                <td>
                  <div class="status">
                    <span class="amount">等待付款</span>
                    <br />
                    <span>订单详情</span>
                  </div>
                </td>
                <td>
                  <div class="operate">
                    <span>剩余23时50时</span>
                    <br />
                    <span class="payment-pay">付款</span>
                    <br />
                    <span>取消订单</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </el-tab-pane>
          <el-tab-pane label="待发货">
            <el-table stripe style="width: 100%" empty-text=" ">
              <el-table-column label="订单详情" width="570" />
              <el-table-column label="收货人" width="100" />
              <el-table-column label="金额" width="90" />
              <el-table-column label="状态" width="90" />
              <el-table-column label="操作" width="80" />
            </el-table>

            <tbody>
              <tr class="tr-th">
                <td colspan="5" class="td">
                  <span class="dealtime">2021-11-16 19:36:21</span>
                  <span class="number">订单号:</span>
                  <span class="numbers">230307184410</span>
                  <span class="titless">京耳官方旗舰店</span>
                  <img class="del" src="@/assets/images/icon-del.png" alt="" />
                </td>
              </tr>
              <tr class="tr-bd">
                <td>
                  <div class="goods-item">
                    <div class="p-img">
                      <img src="@/assets/images/jer.jpg" alt="" />
                    </div>
                    <div class="p-msg">
                      <div class="p-name">
                        京耳
                        蓝牙耳机真无线运动跑步游戏音乐降噪电脑双耳适用智能手机
                        白色
                      </div>
                    </div>
                  </div>
                  <div class="goods-number">x1</div>
                  <div class="goods-repair">
                    <span class="br">退款/退货</span>
                    <span class="br">投诉商家</span>
                  </div>
                </td>
                <td>
                  <div class="user">
                    <span class="txt">刘伟博</span>
                    <img
                      class="user-img"
                      src="@/assets/images/icon-user.png"
                      alt=""
                    />
                  </div>
                </td>
                <td>
                  <div class="amount">
                    <span>￥9.90</span>
                    <br />
                    <span class="ftx-13">在线支付</span>
                  </div>
                </td>
                <td>
                  <div class="status">
                    <span class="amount">买家已付款</span>
                    <br />
                    <span>订单详情</span>
                  </div>
                </td>
                <td>
                  <div class="operate">
                    <span>修改订单</span>
                    <br />
                    <span>申请开票</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </el-tab-pane>
          <el-tab-pane label="待收货">
            <el-table stripe style="width: 100%" empty-text=" ">
              <el-table-column label="订单详情" width="530" />
              <el-table-column label="收货人" width="80" />
              <el-table-column label="金额" width="90" />
              <el-table-column label="状态" width="90" />
              <el-table-column label="操作" width="80" />
            </el-table>

            <tbody>
              <tr class="tr-th">
                <td colspan="5" class="td">
                  <span class="dealtime">2021-11-16 19:36:21</span>
                  <span class="number">订单号:</span>
                  <span class="numbers">230307184410</span>
                  <span class="titless">京耳官方旗舰店</span>
                  <img class="del" src="@/assets/images/icon-del.png" alt="" />
                </td>
              </tr>
              <tr class="tr-bd">
                <td>
                  <div class="goods-item">
                    <div class="p-img">
                      <img src="@/assets/images/jer.jpg" alt="" />
                    </div>
                    <div class="p-msg">
                      <div class="p-name">
                        京耳
                        蓝牙耳机真无线运动跑步游戏音乐降噪电脑双耳适用智能手机
                        白色
                      </div>
                    </div>
                  </div>
                  <div class="goods-number">x1</div>
                </td>
                <td>
                  <div class="user">
                    <span class="txt">刘伟博</span>
                    <img
                      class="user-img"
                      src="@/assets/images/icon-user.png"
                      alt=""
                    />
                  </div>
                </td>
                <td>
                  <div class="amount">
                    <span class="payment">应付</span>
                    <br />
                    <span class="payment">￥9.90</span>
                    <br />
                    <span class="ftx-13">在线支付</span>
                  </div>
                </td>
                <td>
                  <div class="status">
                    <span class="amount">卖家已发货</span>
                    <br />
                    <span>订单详情</span>
                    <br />
                    <span class="origin">查看物流</span>
                  </div>
                </td>
                <td>
                  <div class="operate">
                    <span>剩余9天23时</span>
                    <br />
                    <span class="payment-pay">确认收货</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </el-tab-pane>
          <el-tab-pane label="待评价">
            <el-table stripe style="width: 100%" empty-text=" ">
              <el-table-column label="订单详情" width="530" />
              <el-table-column label="收货人" width="80" />
              <el-table-column label="金额" width="90" />
              <el-table-column label="状态" width="90" />
              <el-table-column label="操作" width="80" />
            </el-table>

            <tbody>
              <tr class="tr-th">
                <td colspan="5" class="td">
                  <span class="dealtime">2021-11-16 19:36:21</span>
                  <span class="number">订单号:</span>
                  <span class="numbers">230307184410</span>
                  <span class="titless">京耳官方旗舰店</span>
                  <img class="del" src="@/assets/images/icon-del.png" alt="" />
                </td>
              </tr>
              <tr class="tr-bd">
                <td>
                  <div class="goods-item">
                    <div class="p-img">
                      <img src="@/assets/images/jer.jpg" alt="" />
                    </div>
                    <div class="p-msg">
                      <div class="p-name">
                        京耳
                        蓝牙耳机真无线运动跑步游戏音乐降噪电脑双耳适用智能手机
                        白色
                      </div>
                    </div>
                  </div>
                  <div class="goods-number">x1</div>
                </td>
                <td>
                  <div class="user">
                    <span class="txt">刘伟博</span>
                    <img
                      class="user-img"
                      src="@/assets/images/icon-user.png"
                      alt=""
                    />
                  </div>
                </td>
                <td>
                  <div class="amount">
                    <span class="payment">应付</span>
                    <br />
                    <span class="payment">￥9.90</span>
                    <br />
                    <span class="ftx-13">在线支付</span>
                  </div>
                </td>
                <td>
                  <div class="status">
                    <span>交易成功</span>
                    <br />
                    <span>订单详情</span>
                    <br />
                    <span class="origin">查看物流</span>
                    <br />
                    <span>对方已评</span>
                  </div>
                </td>
                <td>
                  <div class="operate">
                    <span class="payment-pay" @click="appraise">评价</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </el-tab-pane>
        </el-tabs>
      </div>
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
import { ref } from "vue";
import { orderListApi, queryUserInfoApi, addFoodAppraiseApi,foodAppraiseListApi } from "@/api/api";
import type { TabsPaneContext } from "element-plus";
import { useRouter,useRoute } from "vue-router";
import { useId } from '@/stores/getUserId';
import { storeToRefs } from "pinia";
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
  Search,
} from "@element-plus/icons-vue";

let centerDialogVisible = ref(false);
let aa = useId();
aa.getUserIds();
let appraiseContent: any = ref('');
let star = ref(0);
const value1 = ref(true);
let { userId } = storeToRefs(aa);
const activeName = ref("all");
const input3 = ref("");
let router = useRouter();
let route = useRoute();
const currentPage = ref();     //当前页数
const pageSize = ref(5);       //每页显示的条数
const orderLists: any = ref({});
const ordereRow = ref({});

getUserId();

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
async function getUserId() {
  let res = await queryUserInfoApi();
  let orderList = await orderListApi({
    userId: res.data.data.userId,
  });
  // console.log(orderList.data.data.list);
  orderLists.value = orderList.data.data.list;
  orderList.data.data.list.forEach((item: any) => {
    console.log(item.rows);
      ordereRow.value = item.rows;
  });
}

//打开评论界面
function appraise() {
    centerDialogVisible.value = true; 
}

// //菜肴评论列表
function dishesEva() {
    foodAppraiseListApi({ 
      foodId: route.query.shoppingDetalisId ,
      pageSize:pageSize.value,
      pageNum:currentPage.value
    }).then(res => {
        console.log(res.data.data.list);
    })
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
        isRealName: value1.value == true ? 1 : 0
    });
    console.log(res);
    console.log('又增加了一个评论');
    dishesEva();
    centerDialogVisible.value = false;
}
</script>

<style scoped>
.header {
  display: flex;
}
::v-deep .el-col-12 {
  max-width: 100%;
  width: 200px;
  flex: 0%;
}
.el-tabs {
  margin: 0 20px;
  width: 1200px;
}
.input-with-select .el-input-group__prepend {
  background-color: var(--el-fill-color-blank);
}
::v-deep .el-table__empty-block {
  display: none;
}
::v-deep .el-scrollbar {
  display: none;
}
::v-deep .cell {
  text-align: center;
}
.tbody {
  display: table-row-group;
  vertical-align: middle;
  border: 1px solid #e5e5e5;
  border-color: inherit;
}
.tr-th {
  background: #f5f5f5;
  height: 31px;
  line-height: 31px;
  color: #aaa;
  overflow: hidden;
  padding: 10px 0 0;
  border-bottom-color: #f5f5f5;
}
.dealtime {
  font-family: verdana;
  float: left;
  height: 18px;
  line-height: 18px;
  font-size: 14px;
  padding: 10px 0 0;
  margin-right: 30px;
  margin: 0 14px;
}
.number {
  font-family: verdana;
  float: left;
  height: 18px;
  line-height: 18px;
  padding: 10px 0 0;
  font-size: 14px;
}
.numbers {
  font-family: verdana;
  float: left;
  height: 18px;
  line-height: 18px;
  padding: 10px 0 0;
  font-size: 14px;
  color: #000;
  margin: 0 10px;
}
.titless {
  font-family: verdana;
  float: left;
  height: 18px;
  line-height: 18px;
  padding: 10px 0 0;
  font-size: 14px;
  color: #000;
  margin: 0 10px;
  margin-left: 50px;
}
.del {
  width: 24px;
  float: right;
  padding: 7px 0 0;
}
.td {
  width: 1200px;
}
td {
  padding: 14px 0;
}
.tr-bd {
  text-align: center;
  vertical-align: top;
}
.goods-item {
  margin-right: 20px;
  float: left;
  display: block;
}
.p-img {
  float: left;
  width: 60px;
  height: 60px;
  border: 1px solid #efefef;
  margin: 0 14px;
  position: relative;
}
.p-img img{
  width: 60px;
  height: 60px;
}
.p-msg {
  width: 240px;
  float: left;
}
.p-name {
  height: 36px;
  line-height: 18px;
  overflow: hidden;
  color: #333;
  text-align: left;
  font-size: 12px;
}
.goods-number {
  float: left;
  text-align: left;
  color: #aaa;
  font-family: verdana;
}

.goods-repair {
  text-align: center;
}
.br {
  display: block;
  color: #666;
  text-decoration: none;
  font-size: 12px;
}
.user {
  position: relative;
  margin: 0 auto;
  z-index: 2;
  cursor: pointer;
  color: #333;
}
.txt {
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  max-width: 72px;
  text-overflow: ellipsis;
  vertical-align: middle;
  font-size: 12px;
}
.user-img {
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  max-width: 72px;
  text-overflow: ellipsis;
  vertical-align: middle;
  width: 20px;
}
.amount {
  color: #aaa;
  font-size: 12px;
  margin-right: 5px;
}
.ftx-13 {
  display: block;
  margin: 0 8px;
  margin-top: 5px;
  padding-top: 1px;
  border-top: solid 1px #e5e5e5;
  line-height: 19px;
  height: 19px;
  overflow: hidden;
}
.status {
  position: relative;
  z-index: 5;
  color: #333;
  line-height: 22px;
  font-size: 12px;
}
.operate {
  line-height: 22px;
  font-size: 12px;
}
.payment {
  font-family: verdana;
  color: #333;
  font-weight: 600;
}
.payment-pay {
  display: inline-block;
  background: #fff;
  border: 1px solid #e4393c;
  color: #e4393c;
  border-radius: 2px;
  width: 85px;
  height: 18px;
  line-height: 18px;
  padding: 2px 0;
  margin: 3px 0;
  text-align: center;
  font-weight: 700;
  cursor: pointer;
}
.origin {
  color: #ff460a;
}
.td-shop{
  width: 450px;
}
.td-shops{
  width: 590px;
}
</style>