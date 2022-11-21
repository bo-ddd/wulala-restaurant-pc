<template>
  <div>
    <div class="wraps">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="名称" width="180" />
        <el-table-column prop="name" label="单价" width="180" />
        <el-table-column prop="name" label="数量" width="180" />
        <el-table-column prop="name" label="总价 m" width="180" />
        <el-table-column prop="address" label="Address" />
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
const tableData = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
];
</script>

<style scoped>
</style>