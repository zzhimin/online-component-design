import { ref, onMounted } from 'vue';
import Split from 'split.js'

export default function useSplit() {
  onMounted(() => {
    initSplitLayout()
  })

  const topPanelRef = ref(null)
  const bottomPanelRef = ref(null)
  const topLeftPanelRef = ref(null)
  const topRightPanelRef = ref(null)
  const bottomLeftPanelRef = ref(null)
  const bottomRightPanelRef = ref(null)
  function initSplitLayout() {
    Split([topPanelRef.value, bottomPanelRef.value], {
      sizes: [35, 65],
      gutterSize: 8,
      cursor: 'row-resize',
      direction: 'vertical'
    });

    Split([topLeftPanelRef.value, topRightPanelRef.value], {
      sizes: [50, 50],
      gutterSize: 8,
      cursor: 'col-resize'
    });
    Split([bottomLeftPanelRef.value, bottomRightPanelRef.value], {
      sizes: [50, 50],
      gutterSize: 8,
      cursor: 'col-resize'
    });
  }

  return {
    topPanelRef,
    bottomPanelRef,
    topLeftPanelRef,
    topRightPanelRef,
    bottomLeftPanelRef,
    bottomRightPanelRef,
  }
}