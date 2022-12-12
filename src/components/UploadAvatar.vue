<template>
    <el-upload
        class="avatar-uploader"
        :action="upadteAvatarApi"
        :show-file-list="false"
        :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
</template>
<script setup lang="ts">
import { upadteAvatarApi } from '@/api/api';
import type { UploadProps } from 'element-plus';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
import { Plus } from '@element-plus/icons-vue';

const imageUrl = ref('');

const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
    imageUrl.value = response.data.url;
}
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.type !== 'image/png') {
      ElMessage.error('Avatar picture must be JPG format!')
      return false
    } else if (rawFile.size / 1024 / 1024 > 2) {
      ElMessage.error('Avatar picture size can not exceed 2MB!')
      return false
    }
    return true
}
</script>
<style scoped>
.avatar-uploader .avatar {
    width: 60px;
    height: 60px;
    display: block;
}
</style>
<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}
  
.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}
  
.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 60px;
    height: 60px;
    text-align: center;
}
</style>