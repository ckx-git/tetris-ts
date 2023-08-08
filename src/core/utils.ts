/**
 * 根据min和max返回该范围内的随机整数(无法取到最大值)
 * @param min 
 * @param max 
 */
export function getRandom(min: number, max: number) {
  const dec = max - min
  return Math.floor(Math.random() * dec + min)
}