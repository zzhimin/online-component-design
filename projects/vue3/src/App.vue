<script setup>
import { watch, ref } from 'vue';

const htmlValue = ref('')

const open = ref(false)

watch(htmlValue, (newVal, oldVal) => {
  console.log('newVal >>:', newVal);
})
</script>

<template>
  <a-layout>
    <a-layout-header class="header">
      <a-space>
        <a-button type="primary">保存</a-button>
        <a-button @click="open = true">组件列表</a-button>
      </a-space>
    </a-layout-header>
    <a-layout-content class="content">
      <CodeEditor mode="javascript" v-model:value="htmlValue"></CodeEditor>
    </a-layout-content>
  </a-layout>

  <a-drawer title="组件列表" placement="top" :open="open" @close="open = false">
  
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-drawer>
</template>

<style scoped>
.header {
  display: flex;
  width: 100%;
  background-color: #7dbcea;
  align-items: center;
  justify-content: flex-end;
}

.content {
  width: 100%;
  min-height: calc(100vh - 64px);
  background-color: #fff;
}
</style>
