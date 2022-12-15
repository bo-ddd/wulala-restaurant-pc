<template>
    <main>
        <el-col class="success" :sm="12" :lg="6">
          <el-result
            icon="success"
            title="提交成功"
            sub-title=""
          >
            <!-- <template #extra>
              a
            </template> -->
          </el-result>
        </el-col>
    </main>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
const router = useRouter();
setTimeout(() => {
    router.push({name:'orderview'})
}, 2000);
</script>

<style scoped>
main{
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>