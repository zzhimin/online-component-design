import { ref, reactive, watch, onMounted, onUnmounted, toRefs } from "vue";
import { message } from 'ant-design-vue';

export default function useWidgetInfo(editorEles) {

  let widgetDescriptor = {};
  const widgetDescriptorStr = localStorage.getItem('widgetDescriptor')
  if (widgetDescriptorStr) {
    widgetDescriptor = JSON.parse(widgetDescriptorStr);
  }

  const widgetState = reactive({
    htmlValue: widgetDescriptor?.htmlValue || '',
    cssValue: widgetDescriptor?.cssValue || '',
    javaScriptValue: widgetDescriptor?.javaScriptValue || '',
    settingsValue: '["待开发：使用JSON Schema配置组件，在组件实例化时，通过此配置出不同的表现行为。"]',
    resourceValue: '["待开发: 引用一些第三方库"]',
  })

  function remove() {
    localStorage.removeItem('widgetDescriptor')
    editorEles.htmlRef.value.editor.setValue('')
    editorEles.cssRef.value.editor.setValue('')
    editorEles.jsRef.value.editor.setValue('')
    message.success('清除成功!');
  }

  function defaultTestData() {
    const obj = {
      "htmlValue": "<button @click=\"handleClick\">点击事件测试</button>\n<hr />\n<div>watch测试：</div>\n<input type=\"text\" name=\"inputVal\" id=\"inputVal\" v-model=\"inputVal\" />\n<div>inputVal: {{ inputVal }}</div>\n<hr /><div>computed测试：</div>\n<input type=\"text\" name=\"input2Val\" id=\"input2Val\" v-model=\"input2Val\" />\n<div>input2Val: {{ computedVal }}</div>\n<hr /><div>样式测试：</div>\n<div class=\"style-test\">\n    样式测试\n</div>\n<hr /><div>v-if测试：</div>\n<div v-if=\"testvif\">显示</div>\n<button @click=\"handlevif\">点击{{testvif ? '隐藏' : '显示'}}</button>\n<hr /><div>v-for测试：</div>\n<div v-for=\"item in 3\">{{item}}</div>\n",
      "cssValue": ".style-test {\n    width: 100px;\n    height: 100px;\n    background-color: #5ab4c9;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    color: red;\n    font-size: 18px;\n}",
      "settingsValue": "[\"待开发：使用JSON Schema配置组件，在组件实例化时，通过此配置出不同的表现行为。\"]",
      "javaScriptValue": "import { ref, watch, computed } from 'vue'\n\nfunction handleClick() {\n    console.log(123)\n    alert(123)\n}\nconst inputVal = ref('')\nconst input2Val = ref('')\nconst computedVal = computed(() => {\n    return input2Val.value + ' 哈哈哈'\n})\nconst testvif = ref(true)\nfunction handlevif() {\n    testvif.value = !testvif.value\n}",
      "resourceValue": "[\"待开发: 引用一些第三方库\"]"
    }
    editorEles.htmlRef.value.editor.setValue(obj.htmlValue)
    editorEles.cssRef.value.editor.setValue(obj.cssValue)
    editorEles.jsRef.value.editor.setValue(obj.javaScriptValue)
  }

  return {
    widgetState,
    remove,
    defaultTestData,
  }
}