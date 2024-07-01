import { onMounted, onUnmounted } from "vue";

export default function usekeyCombinations(keyStr, cb) {
  onMounted(() => {
    window.addEventListener('keydown', handleKeydown);
  });
  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown);
  });

  const keyCombinations = keyStr.split('+')

  const handleKeydown = (event) => {
      if (keyCombinations.includes('ctrl') && event.ctrlKey && keyCombinations.includes(event.key)) {
        event.preventDefault();
        cb(event);
      }
  };
}