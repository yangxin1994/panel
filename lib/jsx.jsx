import {h} from './dom-patcher';

const defaultModule = `attrs`;
const modules = new Set(`attrs`, `props`, `dataset`, `class`, `style`, `hooks`);
const specialKeys = new Set(`sel`, `key`);

export function jsx(tag, props, children) {
  const vnodeData = {};
  const vnodeChildren = [];

  return h(tag, vnodeData, children);
}
