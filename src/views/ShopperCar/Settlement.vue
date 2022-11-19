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
    
                        <el-dialog v-model="dialogFormVisible" title="Shipping address">
                            <el-form :model="form">
                            <el-form-item label="Promotion name" :label-width="formLabelWidth">
                                <el-input v-model="form.name" autocomplete="off" />
                            </el-form-item>
                            <el-form-item label="Zones" :label-width="formLabelWidth">
                                <el-select v-model="form.region" placeholder="Please select a zone">
                                <el-option label="Zone No.1" value="shanghai" />
                                <el-option label="Zone No.2" value="beijing" />
                                </el-select>
                            </el-form-item>
                            </el-form>
                            <template #footer>
                            <span class="dialog-footer">
                                <el-button @click="dialogFormVisible = false">Cancel</el-button>
                                <el-button type="primary" @click="dialogFormVisible = false">
                                Confirm
                                </el-button>
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
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
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