import { createApp, defineComponent, h, ref } from 'vue';
import { parse, compileTemplate, compileStyle, compileScript } from '@vue/compiler-sfc';
import { generateID, getBlobURL } from "@/utils";

export default async function testSFC(widgetDescriptor) {
  return new Promise((rv) => {



    const {
      htmlValue,
      cssValue,
      settingsValue,
      javaScriptValue,
      resourceValue
    } = widgetDescriptor.value;
    const sfcContent = `
    <template>
      ${htmlValue}
    </template>

    <script setup>
      ${javaScriptValue}
    <\/script>

    <style scoped>
      ${cssValue}
    <\/style>
  `

    // console.log(' sfcContent>>:', sfcContent);

    // 编译过程
    function compile(code) {
      const { descriptor } = parse(code, {
        filename: 'test.vue',
      });
      console.log("🚀 ~ descriptor:", descriptor)

      const id = generateID();
      console.log("🚀 ~ id:", id)
      const hasScoped = descriptor.styles.some(e => e.scoped);
      const scopeId = hasScoped ? `data-v-${id}` : undefined;
      const templateOptions = {
        id,
        source: descriptor.template.content,
        filename: descriptor.filename,
        scoped: hasScoped,
        slotted: descriptor.slotted,
        compilerOptions: {
          scopeId: hasScoped ? scopeId : undefined,
          mode: 'module',
          id,
        },
      };

      let scriptContent = '';
      let styles = [];

      // const template = compileTemplate({...templateOptions});
      // console.log("🚀 ~ template:", template)

      // 编译脚本。
      if (descriptor.script || descriptor.scriptSetup) {
        const script = compileScript(descriptor, {
          inlineTemplate: true,
          scopeId,
          id,
          ...templateOptions,
          sourceMap: true
        });
        if(script.map) {
          script.content = `${script.content}\n//# sourceMappingURL=data:application/json;base64,${btoa(JSON.stringify(script.map.mappings))}`;
        }
        console.log('script >>:', script);
        scriptContent = script.content
      }

      // 编译 css 样式。
      if (descriptor.styles?.length) {
        styles = descriptor.styles.map((style) => {
          return compileStyle({
            source: style.content,
            scoped: style.scoped,
            id: id,
          }).code;
        });
      }

      return { scriptContent, styles };
    }


    // 处理需要执行的代码
    function handleEval(code) {
      return new Promise((resolve, reject) => {


        const map = { imports: {}, scopes: {} };

        window.inlineImport = async (moduleID) => {
          const { imports } = map;
          let blobURL = null;
          if (moduleID in imports) blobURL = imports[moduleID];
          else {
            const module = document.querySelector(`script[type="inline-module"]${moduleID}`);
            if (module) {
              blobURL = getBlobURL(module);
              imports[moduleID] = blobURL;
            }
          }
          if (blobURL) {
            const result = await import(blobURL);
            return result;
          }
          return null;
        };

        // 创建新的脚本元素
        const script = document.createElement("script");
        script.setAttribute("type", "inline-module");
        script.id = 'foo'
        script.innerHTML = code;
        document.body.appendChild(script);

        const script2 = document.createElement("script");
        script2.src = 'https://unpkg.com/inline-module/index.js';
        document.body.appendChild(script2);


        // const script3 = document.createElement("script");
        // script3.setAttribute("type", "module");
        // script3.innerHTML = `  const foo = (await inlineImport('#foo')).default;
        // window.comp = foo`;
        // document.body.appendChild(script3);
        inlineImport('#foo').then(m => {
          resolve(m.default)
        });
      })
    }


    const { scriptContent, styles } = compile(sfcContent)
    console.log("🚀 ~ styles:", styles)
    console.log("🚀 ~ scriptContent:", scriptContent)
    handleEval(scriptContent).then(res => {
      rv(res)
    })

    const cssCode = styles.join('\n');
    const el = document.createElement('style');
    el.innerHTML = `${cssCode}`;
    document.body.appendChild(el);
  })
}