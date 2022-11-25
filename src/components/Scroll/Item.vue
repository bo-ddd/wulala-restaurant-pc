<template>
    <div class="scroll-item">
      <slot name="image"></slot>
        <slot name="description"></slot>
    </div>
</template>
<style scoped>
  .scroll-item{
   width: 23%;
    border-radius: 30px;
    flex-shrink: 0;
    padding: 10px;
    border: 1px solid #fff;
}
.scroll-item:hover{
    border: 1px solid;
    /* box-sizing: content-box; */
  }
</style>