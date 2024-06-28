<script setup>
import { watch, ref } from 'vue';
import Split from 'split.js'
import { onMounted } from 'vue';

const htmlValue = ref('')

const open = ref(false)

onMounted(() => {
  initSplitLayout()
})

const topPanelRef = ref(null)
const bottomPanelRef = ref(null)
const topLeftPanelRef = ref(null)
const topRightPanelRef = ref(null)
const bottomLeftPanelRef = ref(null)
const bottomRightPanelRef = ref(null)
function initSplitLayout() {
  Split([topPanelRef.value, bottomPanelRef.value], {
    sizes: [35, 65],
    gutterSize: 8,
    cursor: 'row-resize',
    direction: 'vertical'
  });

  Split([topLeftPanelRef.value, topRightPanelRef.value], {
    sizes: [50, 50],
    gutterSize: 8,
    cursor: 'col-resize'
  });
  Split([bottomLeftPanelRef.value, bottomRightPanelRef.value], {
    sizes: [50, 50],
    gutterSize: 8,
    cursor: 'col-resize'
  });
}

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
      <div class="absolute-fill">
        <div ref="topPanelRef" class="split">
          <div class="panel-content" ref="topLeftPanelRef">
            <!-- <CodeEditor class="" mode="html" v-model:value="htmlValue"></CodeEditor> -->
          </div>
          <div class="panel-content" ref="topRightPanelRef">

          </div>
        </div>
        <div ref="bottomPanelRef" class="split">
          <div class="panel-content" ref="bottomLeftPanelRef">
            <!-- <CodeEditor mode="javascript" v-model:value="htmlValue"></CodeEditor> -->
          </div>
          <div class="panel-content" ref="bottomRightPanelRef">

          </div>
        </div>
      </div>
    </a-layout-content>
  </a-layout>

  <a-drawer title="组件列表" placement="top" :open="open" @close="open = false">

    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-drawer>
</template>

<style scoped lang="less">
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
  position: relative;
  height: 100%;

  .panel-content {
    border: 1px solid #c0c0c0;
  }
}

.split {
  display: flex;
  flex-direction: row;
}</style>
