function updateClass(oldVnode, newVnode) {
  const el = newVnode.elm;
  let oldClass = oldVnode.data.class;
  let newClass = newVnode.data.class;

  if (!oldClass && !newClass) {
    return;
  }
  oldClass = oldClass || {};
  newClass = newClass || {};

  for (const name in oldClass) {
    if (!newClass[name]) {
      el.classList.remove(name);
    }
  }
  for (const name in newClass) {
    const val = newClass[name];
    if (val !== oldClass[name]) {
      el.classList[val ? 'add' : 'remove'](name);
    }
  }
}

export default {
  create: updateClass,
  update: updateClass,
};
