<template>
    <div >
  <el-carousel indicator-position="outside">
    <el-carousel-item v-for="item in Carousel" :key="item">
      <img class="carousel" :src="parsrAsssetFile(item.src)" alt="">
    </el-carousel-item>
  </el-carousel>
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
}

</style>