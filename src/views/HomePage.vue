<template>
    <div >
  <el-carousel indicator-position="outside">
    <el-carousel-item v-for="item in Carousel" :key="item">
      <img class="carousel" :src="parsrAsssetFile(item.src)" alt="">
    </el-carousel-item>
  </el-carousel>
         <div class="box">
             <div class="title">所有菜系</div>
              <div class="box-item">
                <div class="box-img"><img src="@/assets/images/chuancai.png" alt=""></div>
                <div class="texts">
                  <div class="qqq">麻、辣、鲜、香、味蕾盛宴</div>
                  <el-button type="info" color="#000000" round>查看全部川菜</el-button>
                </div>
              </div>
              <div class="box-item">
                <div class="texts">
                  <div class="qqq">麻、辣、鲜、香、味蕾盛宴</div>
                  <el-button type="info" color="#000000" round>查看全部川菜</el-button>
                </div>
                <div class="box-img"><img src="@/assets/images/chuancai.png" alt=""></div>
              </div>
         </div>  
         
    </div>
</template>
<script lang="ts" setup>
import useUtil from "@/assets/util"
let { parsrAsssetFile } = useUtil()
let Carousel = [
    {
        id:1,
        src:"Carousel-01.png"
    }, {
        id:2,
        src:"Carousel-02.png"
    }, {
        id:3,
        src:"Carousel-03.png"
    }, {
        id:4,
        src:"Carousel-04.png"
    },
]
</script>
<style>
.el-carousel__item h3 {
  display: flex;
  color: #475669;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}
.carousel{
    width: 100%;
    height: 100%;
    border-radius: 20px;
}

.el-carousel__container{
  
  min-height: 600px;
  border-bottom: 1px solid #ccc;
  border-radius: 20px;
}
.box-item{
  border-radius: 30px;
  margin-bottom: 50px;
  background-color: white;
  display: flex;
  justify-content: space-between;
}
.box-item img{
  display: inline-block;
  width: 100%;
  height:100%;
  border-radius: 30px 0 0 30px;
}
.box-img{
  width: 40%;
height: 450px;
}
.texts{
  width: 30%;
  margin:0 120px 0 150px;
  padding-top: 150px;
}
.title{
  font-size: 50px;
  font-weight: 700;
  margin: 20px 20px;
}

.qqq {
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 60px;
}
</style>