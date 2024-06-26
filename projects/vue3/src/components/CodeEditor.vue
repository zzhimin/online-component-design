<script setup>
import { onMounted, ref } from 'vue';
import * as ace from 'ace-builds';
import '@/utils/aceConfig';

const emit = defineEmits(['update:value'])

const props = defineProps({
  content: {
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
  if (props.content) editor.setValue(props.content, -1);

  editor.on("change", () => {
    if (emit) {
      emit("update:value", editor.getValue());
    }
  });
}

onMounted(() => {
  createEditor()
})

</script>

<template>
  <div class="code-edit-wraper">
    <div ref="codeEditRef" style="width: 100%;height: 100%;min-width: 500px;min-height: 500px;border: 1px solid #D7D2CC;">
    </div>
  </div>
</template>

<style scoped>
:host {
  display: block;
  height: 100%;
}
</style>
