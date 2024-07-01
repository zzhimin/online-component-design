import { ref, unref, computed, onMounted, onUnmounted, inject, shallowReactive  } from "vue";
import useKeyDown from '@/use/useKeyDown'

export default function useDynamicComponent(widgetState) {

  const compProps = shallowReactive({
    widgetDescriptor: {
      template: `Math.random()`
    }
  })
  const dynamicRenderFunc = (h, props) => {
    return h(props.widgetDescriptor);
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

    // console.log('htmlValue >>:', htmlValue);
    // console.log('cssValue >>:', cssValue);
    // console.log('javaScriptValue >>:', javaScriptValue);
    // console.log(' settingsValue>>:', settingsValue);

    return {
      template: htmlValue
    }
  }

  useKeyDown('ctrl+s', () => {
    compProps.widgetDescriptor = createComponent();
  })

  return {
    dynamicRenderFunc,
    compProps
  }
}