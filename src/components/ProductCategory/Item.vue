<template >
    
   <div class="box-item" v-if="ProductCategory.direction == 'left'">
    <div class="box-img"><img :src="ProductCategory.imgUrl" alt=""></div>
    <div class="texts" >
        <div class="qqq">{{1}}</div>
        <el-button type="info" color="#000000" @click="toCategory( id,ProductCategory.id )" round>查看全部{{ProductCategory.name}}</el-button>
    </div>
   </div>
   <div class="box-items" v-else>
       <div class="texts" >
           <div class="qqq">{{1}}</div>
           <el-button type="info" color="#000000" @click="toCategory( id,ProductCategory.id )" round>查看全部{{ProductCategory.name}}</el-button>
        </div>
        <div class="box-imgs"><img :src="ProductCategory.imgUrl" alt=""></div>
   </div>
   
</template>
<script setup lang="ts">
import { useRouter } from "vue-router"
let router = useRouter()
console.log(router);

   const props = defineProps<{
    ProductCategory:{
        imgUrl:string,
        name:string,
        // text:string,
        direction:string,
        id :string
    }
    id : any
    }>();
    let{ ProductCategory , id } = props
    console.log(id);
    console.log(ProductCategory.id);
    let toCategory =function(id:string,CategoryId : string){
      sessionStorage.setItem('id',id)
      sessionStorage.setItem('CategoryId',CategoryId)
      router.push({ name: "mall" })
      
    }
    
</script>
<style scoped>
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
.box-items{
  border-radius: 30px;
  margin-bottom: 50px;
  background-color: white;
  display: flex;
  justify-content: space-between;
}
.box-items img{
  display: inline-block;
  width: 100%;
  height:100%;
  border-radius: 0px 30px 30px 0;
}
.box-img{
  width: 40%;
height: 450px;
}
.box-imgs{
  width: 60%;
height: 450px;
}
.texts{
  width: 30%;
  margin:0 120px 0 150px;
  padding-top: 150px;
}


.qqq {
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 60px;
}
</style>