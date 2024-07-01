import { defineComponent, h } from 'vue';

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
    }
  },
  setup(props) {
    return () => props.renderFunc(h, props.widgetDescriptor);
  }
});

export default DyamicComponent;
