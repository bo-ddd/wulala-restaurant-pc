<template>
    <div class="header">
        <el-row class="tac">
            <el-col :span="12">
                <el-menu :default-active = "route.name" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                    <el-menu-item index="mineview" @click="navigator('mineview')">
                        <span>个人信息</span>
                    </el-menu-item>
                    <el-menu-item index="orderview" @click="navigator('orderview')">
                        <span>我的订单</span>
                    </el-menu-item>
                    <el-menu-item index="updatePersonalInfo" @click="navigator('updatePersonalInfo')">
                        <span>修改个人信息</span>
                    </el-menu-item>
                </el-menu>
            </el-col>
        </el-row>
        <RouterView />

    </div>
</template>

<script lang="ts" setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
  Search,
} from "@element-plus/icons-vue";
import { useRouter, useRoute } from 'vue-router';
let router = useRouter();
let route =useRoute();
// const defaultActive = route.name;
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
function navigator(name: string) {
  router.push({ name: name })
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
</style>