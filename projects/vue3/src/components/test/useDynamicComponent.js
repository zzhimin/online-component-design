import { ref, unref, computed, onMounted, defineComponent, inject, shallowReactive  } from "vue";
import useKeyDown from '@/use/useKeyDown'
// import testSFC from "./test";

export default function useDynamicComponent(widgetState) {
  const ctx = inject('ctx')

  const compProps = shallowReactive({
    widgetDescriptor: {
      template: `Math.random()`
    },
    comp: {}
  })
  const dynamicRenderFunc = (h, props) => {
    return h(props.comp);
  }

  const widgetDescriptor = computed(() => {
    return {
      htmlValue: widgetState.htmlValue,
      cssValue: widgetState.cssValue,
      settingsValue: widgetState.settingsValue,
      javaScriptValue: widgetState.javaScriptValue,
      resourceValue: widgetState.resourceValue,
    }
  })

  function createComponent() {

    const {
      htmlValue,
      cssValue,
      settingsValue,
      javaScriptValue,
      resourceValue
    } = widgetDescriptor.value;

    return defineComponent({
      template: htmlValue,
    })
  }

  useKeyDown('ctrl+s',async () => {
    // compProps.comp = await testSFC(widgetDescriptor)
    compProps.widgetDescriptor = createComponent();
  })

  return {
    dynamicRenderFunc,
    compProps,
    
  }
}