import { parse, compileTemplate, compileStyle, compileScript } from '@vue/compiler-sfc';

export default function compilerWidgetDescriptor(widgetDescriptor, id) {
  return new Promise((resolve, reject) => {
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

      <style>
        ${cssValue}
      <\/style>
    `

    
    const compile = (code) => {
      const filename = `widget-design-${id}`;
      const { descriptor } = parse(code, {
        filename
      });
      console.log("🚀 ~ descriptor:", descriptor)

      const templateOptions = {
        id,
        source: descriptor.template.content,
        filename: descriptor.filename,
        slotted: descriptor.slotted,
        compilerOptions: {
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
          id,
          inlineTemplate: true,
          ...templateOptions,
          sourceMap: true
        });
        if (script.map) {
          script.content = `${script.content}\n//# sourceMappingURL=data:application/json;base64,${btoa(JSON.stringify(script.map.mappings))}`;
        }
        // console.log('script >>:', script);
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

    const { scriptContent, styles } = compile(sfcContent)


    resolve({ scriptContent, styles })
  })
}