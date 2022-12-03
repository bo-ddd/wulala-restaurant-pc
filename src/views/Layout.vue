<template>
    <el-container class="warp">
      <el-header class="warp">
        <div class="box-header">
          
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
              <!-- <div class="header-fw" :class="{active:isActive}" @click="navigator('home')">首页</div>
              <div class="header-fw" @click="navigator('mall')">购物中心</div>
              <div class="header-fw" @click="navigator('shoppercar')">购物车</div>
              <div class="header-fw">服务</div>
              <div class="header-fw">线下门店</div> -->
              <div class="header-fw" 
              v-for="(item,index) in routeList"
              :class="{active:!(index-menuIndex)}" 
              @click="clickList(item.label,index)">{{item.name}}</div>
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
                  <el-dropdown-menu v-show="token == null">
                    <el-dropdown-item @click="navigator('login')">登录</el-dropdown-item>
                    <el-dropdown-item divided @click="navigator('register')">注册</el-dropdown-item>
                  </el-dropdown-menu>
                  <el-dropdown-menu v-show="token != null">
                    <el-dropdown-item @click="navigator('orderview')">个人中心</el-dropdown-item>
                    <el-dropdown-item divided @click="exitLogin">退出</el-dropdown-item>
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
      <el-footer>
        <div>
          akjdiojoijsdoij
      </div>
    </el-footer>
    </el-container>
</template>
<style>
.bb {
  display: flex;
}

.logo {
  width: 60px;
  height: 60px;
  margin-right: 25px;
}

.el-header {
  height: 80px;
  border-bottom: 1px solid #ccc;
}

.box-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.box-rigth {
  margin: 10px 0px;
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
  cursor: pointer;
  /* color: v-bind(aa); */
}


.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}

.el-main {
  padding: 20px 0px;
}

.el-carousel__container {
  min-height: 600px;
  border-bottom: 1px solid #ccc;

  border-radius: 20px;
}

.active {
  color: red;
}
</style>
<script setup lang="ts">
import { ref } from "vue"
import { useRouter, useRoute } from 'vue-router';
import { ArrowDown } from '@element-plus/icons-vue';
import { Edit, Search, User } from '@element-plus/icons-vue';
let router = useRouter();
let route = useRoute()
let token = sessionStorage.getItem('token')

const isActive = ref(false)
function navigator(name: string) {
  router.push({ name: name })
}
function clickList(name: string,i:number){
  router.push({ name: name })
  menuIndex.value = i
}
function exitLogin(){
  sessionStorage.removeItem("token");
  token = sessionStorage.getItem('token') 
  // sessionStorage.setItem('token', '');
  router.push({name:'login'});
  router.push({name:'home'});
console.log(token);

}

let menuIndex  = ref(0);
let routeList = [
  {
    name:'首页',
    label:'home',
    index:0
  },
  {
    name:'购物中心',
    label:'mall',
    index:1
  },
  {
    name:'购物车',
    label:'shoppercar',
    index:2
  },
  {
    name:'服务',
    label:'',
    index:3
  },
  {
    name:'线下门店',
    label:'',
    index:4
  }
]
routeList.forEach(el => {
  if (route.name == el.label) {
    menuIndex.value = el.index
  }
})
</script>