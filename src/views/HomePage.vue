<template>
    <div class="warp">
        <el-carousel indicator-position="outside">
    <el-carousel-item v-for="item in Carousel" :key="item">
      <img :src="item.src" alt="">
      {{item.src}}
    </el-carousel-item>
  </el-carousel>
    </div>
</template>
<script lang="ts" setup>
let Carousel = [
    {
        id:1,
        src:"@/assets/images/Carousel-01.png"
    }, {
        id:2,
        src:"@/assets/images/Carousel-02.png"
    }, {
        id:3,
        src:"@/assets/images/Carousel-03.png"
    }, {
        id:4,
        src:"@/assets/images/Carousel-04.png"
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

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>