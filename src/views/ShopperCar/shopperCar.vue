<template>
    <main>
        <div  class="warp">
            <!-- 搜索框 -->
            <el-input v-model="input" class="w-300 m-20 input" size="large" placeholder="请输入您想要了解的美食" :suffix-icon="Search"/>
            <div class="nav pd-10">
                <p>全部商品 {{ 1 }}</p>
            </div>
            <el-table
                ref="multipleTableRef"
                :data="tableData"
                style="width: 100%"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" />
                <el-table-column label="商品" width="">
                <template #default="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <el-table-column property="name" label="单价" width="120" />
                <el-table-column property="address" label="数量" show-overflow-tooltip />
                <el-table-column property="name" label="小计" width="100" />
                <el-table-column property="name" label="操作" width="100" />
            </el-table>
        </div>
    </main>
</template>

<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue'
import {ref } from 'vue';
import { ElTable } from 'element-plus'

let input = ref();

interface User {
  date: string
  name: string
  address: string
}

const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<User[]>([])
const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val
}

const tableData: User[] = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
</script>

<style scoped>
main{
    background:#fff;
    overflow: hidden;
}
.input{
    float: right;
}
.nav p{
    clear: both;
    font-size: 16px;
    color: #f7d347;
    font-weight: 550;
}
</style>