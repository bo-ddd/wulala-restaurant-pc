<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <div class="warp box-header">
          <div class="bb">
            <div>
              <img class="logo" src="@/assets/images/icon-wll_logo.png" alt=""/>
            </div>
            <div class="text">
              <span>乌拉拉餐饮</span>
              <p>WULALAFOOD</p>
            </div>
          </div>
          <div class="box-rigth">
            <div class="login">
              <div class="header-fw">服务</div>
              <div class="header-fw">线下门店</div>
              <el-icon class="icon" size="24">
                <Search />
              </el-icon>
              <el-dropdown>
                <span class="el-dropdown-link">
                  <el-icon class="icon" size="24">
                    <User />
                  </el-icon>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>登录</el-dropdown-item>
                    <el-dropdown-item divided>注册</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
              <div class="collection">
                <div>收藏店铺</div>
                <el-button type="primary" color="#000000" round size="small" :icon="Edit">点击收藏</el-button>
              </div>
            </div>
          </div>
        </div>
      </el-header>

      <el-main>
       

          <RouterView />
      
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>
<style>
.bb{
  display: flex;
}
.logo {
  width: 60px;
  height: 60px;
  margin-left: 25px;
}

.el-header {
  height: 80px;
  border-bottom: 1px solid #ccc;
}

.box-header {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.box-rigth {
  margin: 10px 30px;
  /* min-width: 1080px; */
  display: flex;
  justify-content: space-between;
}

.collection {
  border: 1px solid rgb(80, 80, 80);
  padding: 5px 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.text {
  padding: 5px;
}

.text span {
  font-size: 20px;
}

.text p {
  font-size: 15px;
}

.login {
  display: flex;
  align-items: center;
}

.icon {
  margin: 0 20px 0 0px;
}

.header-fw {
  margin-right: 20px;
}
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
.el-main{
  padding:20px 80px;
}
.el-carousel__container{
  min-height: 600px;
}
</style>
<script setup lang="ts">

import { ArrowDown } from '@element-plus/icons-vue'
import { Edit, Search, User } from '@element-plus/icons-vue'
</script>