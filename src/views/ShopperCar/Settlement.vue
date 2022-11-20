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
            <div class="content plr-20 m-20">
                <!-- <div>
                配送至：<elui-china-area-dht isall :leave="4" @change="onChange"></elui-china-area-dht>
                </div> -->
                <div class="df-sp">
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
}
</style>