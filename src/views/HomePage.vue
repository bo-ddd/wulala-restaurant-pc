<template>
    <div class="warp" >
  <el-carousel indicator-position="outside">
    <el-carousel-item v-for="item in Carousel" :key="item">
      <img class="carousel" :src="parsrAsssetFile(item.src)" alt="">
    </el-carousel-item>
  </el-carousel>
  <div class="boxs">
         <div class="title">每日推荐</div>
         <Scroll.Wrapper class="scroll">
      <Scroll.Item v-for="item in recommendGoodsList" @click="">
        <template #image>
          <img class="hot-commodity_img" :src="parsrAsssetFile(item.imgUrl)" alt="" />
        </template>
        <template #description>
          <div class="description">
            <div class="wares-title">{{item.title}}</div>
            <div class="price">￥{{item.price}}</div>
            <div class="quantity">月销{{item.number}}件</div>
          </div>
        </template>
      </Scroll.Item>
    </Scroll.Wrapper>   
  </div>
         <div class="boxs">
             <div class="title">所有菜系</div>
              <ProductCategory.Wrapper v-for="(el,i) in CategoryList">
                <ProductCategory.Item :id = i :ProductCategory=el></ProductCategory.Item>
              </ProductCategory.Wrapper>
         </div>  
    </div>
</template>
<script lang="ts" setup>
import { getCategoryListApi } from '@/api/api';
import { ref } from "vue"
import Scroll from "@/components/Scroll";
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

let CategoryList :any = ref([])


  getCategoryListApi({}).then(res => {
    CategoryList.value = res.data.data
    CategoryList.value.forEach((el:any,i:number) =>{
      console.log(i);
      
     if (i%2 == 0) {
    el.direction = "rigth"
  }else{
    el.direction = "left"
  }
  console.log(el);
    })
    console.log(CategoryList);
    
  })

let recommendGoodsList =[
        {
            goodsId:1,
            imgUrl:'dongbeicai.png',
            title:'欧舒丹甜蜜樱花沐浴啫喱/身体乳套装欧舒丹甜蜜樱花沐浴啫喱/身体乳套装欧舒丹甜蜜樱花沐浴啫喱/身体乳套装',
            price:'378',
            number:'20111'
          },
          {
            goodsId:2,
            imgUrl:'dongbeicai.png',
            title:'欧舒丹甜',
            price:'40',
            number:'20111'
          },
          {
            goodsId:3,
            imgUrl:'dongbeicai.png',
            title:'欧舒丹甜蜜樱花沐浴啫喱/身体乳套装',
            price:'378',
            number:'20111'
          },
          {
            goodsId:4,
            imgUrl:'dongbeicai.png',
            title:'欧舒丹甜蜜樱花沐浴啫喱/身体乳套装',
            price:'40',
            number:'20111'
          },
      
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
.hot-commodity_img {
  width: 100%;
  border-radius: 20px 20px 0 0;
  display: block;
}
/* .hot-commodity_img {
  width: 100%;
  border-radius: 10px 10px 0 0;
} */
.description {
  padding: 10px;
  background-color: #fff;
  font-size: 16px;
  border-radius: 0 0 10px 10px;
}

.description .price {
  font-weight: bold;

  padding: 10px 0;

}

.description .quantity {
  font-size: 12px;
  color: #aeaeae;
  font-weight: 100;
  padding: .40px 0;
}
.wares-title {
  width: 100%;
  min-height: 40px;
  display: -webkit-box;
  overflow: hidden;
  /*超出隐藏*/
  text-overflow: ellipsis;
  /*隐藏后添加省略号*/
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.scroll {
  border-radius: 20px;
  overflow-x: scroll;
  display: flex;
  padding: 20px;
  background-color: white;

}
::-webkit-scrollbar {
  display: none;
}
</style>