<script setup>
import { onMounted, ref, watch, onUnmounted } from 'vue';
import * as ace from 'ace-builds';
import '@/utils/aceConfig';

const emit = defineEmits(['update:value'])

const isFullscreen = ref(false)

const props = defineProps({
  value: {
    type: String,
    required: false,
    default: ''
  },
  mode: {
    type: String,
    required: true,
    default: 'javascript'
  }
})

const codeEditRef = ref(null)

let editor;

watch(() => props.value, (newVal) => {
  editor.setValue(newVal);
})

function createEditor() {
  const editorElement = codeEditRef.value;
  let editorOptions = {
    mode: `ace/mode/${props.mode}`,
    // theme: 'ace/theme/github',
    fontSize: 16, // 编辑器内字体大小
    showGutter: true,
    showPrintMargin: false,
  };

  const advancedOptions = {
    enableSnippets: true,
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true
  };

  editorOptions = { ...editorOptions, ...advancedOptions };

  editor = ace.edit(editorElement, editorOptions);
  editor.session.setUseWrapMode(true);
  if (props.value) editor.setValue(props.value, -1);

  editor.on("change", () => {
    if (emit) {
      emit("update:value", editor.getValue());
    }
  });
}

onMounted(() => {
  createEditor()
})
onUnmounted(() => {
  if (editor) editor.destroy();
})

</script>

<template>
  <div class="code-edit-wraper" v-fullscreen="isFullscreen">
    <label class="label-wraper">
      <span class="mode">{{ props.mode }}</span>
      <span @click="isFullscreen = !isFullscreen" class="fullscreen">
        <img :src="`/online-component-design/${isFullscreen ? 'exitfullscreen' : 'fullscreen'}.png`">
      </span>
    </label>
    <div ref="codeEditRef" style="height: 100%;width: 100%;"></div>
  </div>
</template>

<style scoped lang="less">
.code-edit-wraper {
  position: relative;
  height: 100%;
  width: 100%;

  .label-wraper {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 10;
    display: flex;
    align-items: center;

    .mode {
      background-color: #f3f3f3;
      padding: 2px 5px;
      border-radius: 3px;
      color: #47acc4;
      margin-right: 5px;
    }

    .fullscreen {
      width: 25px;
      height: 25px;
      background-color: #f3f3f3;
      border-radius: 50%;
      cursor: pointer;

      img {
        height: 100%;
        width: 100%;
      }
    }
  }
}</style>
