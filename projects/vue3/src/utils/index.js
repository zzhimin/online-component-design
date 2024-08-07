/**
 * 判断是否为空对象
 * @param {*} obj js对象
 * @returns boolean
 */
export function isEmptyObj(obj) {
  for (const key of Object.keys(obj)) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }
  return true;
}

export function generateID() {
  return Math.random().toString(36).slice(2, 12);
}