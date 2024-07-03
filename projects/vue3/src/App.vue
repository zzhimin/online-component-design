<script setup>
import { provide, ref } from 'vue';
import useSplit from '@/use/useSplit'
import useWidgetInfo from '@/use/useWidgetInfo'
import ctx from '@/utils/widgetCtx'
import Widget from '@/components/widget/Widget.vue'

const widgetContainerRef = ref(null)
provide('ctx', {
  ...ctx,
  $container: widgetContainerRef.value,
})

const {
  topPanelRef,
  bottomPanelRef,
  topLeftPanelRef,
  topRightPanelRef,
  bottomLeftPanelRef,
  bottomRightPanelRef,
} = useSplit();

const widgetState = useWidgetInfo();

const activeKey1 = ref('2')
const activeKey2 = ref('1')

</script>

<template>
  <a-layout>
    <a-layout-header class="header">
      <a-space>
        <a-button type="primary">ctrl + s 渲染</a-button>
      </a-space>
    </a-layout-header>
    <a-layout-content class="content">
      <div class="absolute-fill">
        <div ref="topPanelRef" class="split">
          <div class="panel-content" ref="topLeftPanelRef">
            <a-tabs v-model:activeKey="activeKey1" centered>
              <a-tab-pane key="1" tab="资源">
                <div>待开发</div>
              </a-tab-pane>
              <a-tab-pane key="2" tab="HTML" force-render>
                <CodeEditor mode="html" v-model:value="widgetState.htmlValue"></CodeEditor>
              </a-tab-pane>
            </a-tabs>
          </div>
          <div class="panel-content" ref="topRightPanelRef">
            <a-tabs v-model:activeKey="activeKey2" centered>
              <a-tab-pane key="1" tab="CSS">
                <CodeEditor mode="css" v-model:value="widgetState.cssValue"></CodeEditor>
              </a-tab-pane>
              <a-tab-pane key="2" tab="组件设置" force-render>
                <CodeEditor mode="json" v-model:value="widgetState.settingsValue"></CodeEditor>
              </a-tab-pane>
            </a-tabs>
          </div>
        </div>
        <div ref="bottomPanelRef" class="split">
          <div class="panel-content" ref="bottomLeftPanelRef">
            <CodeEditor mode="javascript" v-model:value="widgetState.javaScriptValue"></CodeEditor>
          </div>
          <div class="panel-content" ref="bottomRightPanelRef">
            <div class="widget-container" ref="widgetContainerRef">
              <Widget :widgetDescriptor="widgetState"></Widget>
            </div>
          </div>
        </div>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<style scoped lang="less">
.header {
  display: flex;
  width: 100%;
  background-color: #001529;
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
    .widget-container {
      width: 100%;
      height: 100%;
    }
  }
}

.split {
  display: flex;
  flex-direction: row;
}

::v-deep {
  .ant-tabs {
    height: 100%;
  }

  .ant-tabs-content {
    height: 100%;
  }
}
</style>
