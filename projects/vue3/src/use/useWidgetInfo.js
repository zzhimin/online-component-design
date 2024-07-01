import { ref, reactive, watch, onMounted, onUnmounted, toRefs } from "vue";

export default function useWidgetInfo() {

  const widgetState = reactive({
    htmlValue: '11',
    cssValue: '',
    settingsValue: '',
    javaScriptValue: '',
    resourceValue: '',
  })

  return widgetState
}