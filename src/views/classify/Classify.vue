<template>
    <div class="box">

        <div class="tapbox wrap">
            <ul class="tapqiehuan">
                <li v-for="(item, index) in tapli" :key="index" :class="[index == idxon ? 'on' : '']"
                    @click="tapqie(index)">
                    {{ item }}
                </li>
            </ul>
            <div class="tapbombox">
                <div class="bombox" v-for="(item, index) in bomtxt" :key="item.id" v-show="index == idxon">
                    {{ item.txt }}
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue'
import { getCCategoryListApi } from '@/api/api'
let tapli = ref(["全部", "川菜", "东北菜", '粤菜'])
let idxon = ref(0)
let bomtxt = ref([
    {
        txt: "切换的内容切换的内容切换的内容01",
        id: 0
    },
    {
        txt: "切换的内容切换的内容切换的内容02",
        id: 1
    },
    {
        txt: "切换的内容切换的内容切换的内容03",
        id: 2
    },
    {
        txt: "切换的内容切换的内容切换的内容04",
        id: 3
    },
])
getCCategoryListApi({}).then(res => {
    console.log(res);
})
const tapqie = (index: number) => {
    idxon.value = index
}
</script>
  
<style scoped >
.box {
    padding: 20px;
    background-color: #fff;
}

.tapbox {
    position: relative;
    width: 100%;
    margin: 0 auto;
}

.tapqiehuan {
    padding: 0 0.3rem;
    display: flex;
    justify-content: space-between;
}

ul li {
    list-style: none
}

li {
    padding: 10px 20px;
    border: 1px solid #d9ecff;
    cursor: pointer;
}

li:hover {
    color: #409eff;
}

.on {
    background: #ecf5ff;
    color: #409eff;
}

.tapbombox {
    position: relative;
    padding: 0 0.3rem;
    font-size: 0.28rem;
    line-height: 0.6rem;
    text-align: center;
    border: 1px solid #666;
}

.bombox {
    width: 100%;
    height: 6rem;
}
</style>
  
  