<template>
    <div class="warp" >
  <el-carousel indicator-position="outside">
    <el-carousel-item v-for="item in Carousel" :key="item">
      <img class="carousel" :src="parsrAsssetFile(item.src)" alt="">
    </el-carousel-item>
  </el-carousel>
         <div class="boxs">
             <div class="title">所有菜系</div>
              <ProductCategory.Wrapper v-for="el in ProductCategoryList">
                <ProductCategory.Item  :ProductCategory=el></ProductCategory.Item>
              </ProductCategory.Wrapper>
         </div>  
         
    </div>
</template>
<script lang="ts" setup>
import ProductCategory from "@/components/ProductCategory"
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
let ProductCategoryList = [
  { 
    direction:"left",
    text:"麻、辣、鲜、香、味蕾盛宴1",
    src:"src/assets/images/dongbeicai.png",
    btntext:"查看全部东北菜"
  },
  { 
    direction:"rigth",
    text:"麻、辣、鲜、香、味蕾盛宴2",
    src:"src/assets/images/yuecai.png",
    btntext:"查看全部粤菜"
  },
  { 
    direction:"left",
    text:"麻、辣、鲜、香、味蕾盛宴3",
    src:"src/assets/images/jiachangcai.png",
    btntext:"查看全部家常菜"
  },
  { 
    direction:"rigth",
    text:"麻、辣、鲜、香、味蕾盛宴4",
    src:"src/assets/images/chuancai.png",
    btntext:"查看全部川菜"
  }
]
</script>
<style>
.title{
  font-size: 50px;
  font-weight: 700;
  margin: 20px 20px;
}
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

</style>