import { ref, reactive, watch, onMounted, onUnmounted, toRefs } from "vue";

export default function useWidgetInfo() {

  const widgetState = reactive({
    htmlValue: `<button @click=handleClick class="btn">按钮</button>`,
    cssValue: `.btn {
      color: red;
    }`,
    settingsValue: '["待开发"]',
    javaScriptValue: `function handleClick() {
      console.log(11111111)
    }`,
    resourceValue: '',
  })

  return widgetState
}