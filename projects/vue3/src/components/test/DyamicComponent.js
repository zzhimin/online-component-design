import { defineComponent, h, watch } from 'vue';

const DyamicComponent = defineComponent({
  props: {
    renderFunc: {
      type: Function,
      required: true
    },
    widgetDescriptor: {
      type: Object,
      default(rawProps) {
        return {}
      }
    },
    comp: {
      type: Object
    }
  },
  setup(props) {
    // watch(() => props.comp, () => {
    //   console.log('112 >>:', 112);
    // })
    return () => props.renderFunc(h, props.widgetDescriptor)
  }
});

export default DyamicComponent;
