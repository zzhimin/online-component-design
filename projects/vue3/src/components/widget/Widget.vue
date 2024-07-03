<script setup>
import { onMounted, ref, computed, watch } from 'vue';
import widgetHtml from "./widget.html?raw";
import useKeyDown from '@/use/useKeyDown';
import compilerWidgetDescriptor from './widget.js'
import { generateID } from "@/utils";

const props = defineProps({
  widgetDescriptor: {
    type: Object,
    default(rawProps) {
      return {}
    }
  },
})

const widgetDescriptor = computed(() => {
  return {
    htmlValue: props.widgetDescriptor.htmlValue,
    cssValue: props.widgetDescriptor.cssValue,
    settingsValue: props.widgetDescriptor.settingsValue,
    javaScriptValue: props.widgetDescriptor.javaScriptValue,
    resourceValue: props.widgetDescriptor.resourceValue,
  }
})

// watch(widgetDescriptor, (newVal) => {
//   console.log('newVal >>:', newVal);
// })

const widgetContainerRef = ref(null)

function createIframe() {
  const iframe = document.createElement('iframe');
  iframe.setAttribute('frameborder', '0');
  iframe.style = 'width: 100%; height:100%';
  iframe.srcdoc = widgetHtml;
  widgetContainerRef.value.appendChild(iframe);

  iframe.onload = () => {

  };

  return iframe;
}

function saveWidgetDescriptor() {
  localStorage.setItem('widgetDescriptor', JSON.stringify(widgetDescriptor.value))
}


let _iframe = null;
const id = generateID();
useKeyDown('ctrl+s', async () => {
  saveWidgetDescriptor()
  const { scriptContent, styles } = await compilerWidgetDescriptor(widgetDescriptor, id);
  // console.log("🚀 ~ styles:", styles)
  // console.log("🚀 ~ scriptContent:", scriptContent)
  _iframe.contentWindow.postMessage(
    { scriptContent, styles, id },
    "*"
  );
})
onMounted(() => {
  _iframe = createIframe();
})

</script>

<template>
  <div class="widget-container" ref="widgetContainerRef">

  </div>
</template>
