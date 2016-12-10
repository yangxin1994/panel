import requestAnimationFrame from 'raf';

function addOrRemoveClass(el, className, add) {
  el.classList[add ? 'add' : 'remove'](className);
}

function nextFrame(fn) {
  requestAnimationFrame(function() {
    requestAnimationFrame(fn);
  });
}

function changeClassNextFrame(el, className, add) {
  nextFrame(function() {
    addOrRemoveClass(el, className, add);
  });
}

function updateClass(oldVnode, newVnode) {
  const el = newVnode.elm;
  let oldClass = oldVnode.data.class;
  let newClass = newVnode.data.class;

  if (!oldClass && !newClass) {
    return;
  }
  oldClass = oldClass || {};
  newClass = newClass || {};

  // remove classes which are no longer on node
  for (const name in oldClass) {
    if (!(name in newClass)) {
      el.classList.remove(name);
    }
  }

  // handle new classes, taking into account special delayed classes
  const oldHasDelay = 'delayed' in oldClass;
  for (const name in newClass) {
    const val = newClass[name];

    if (name === 'delayed') {

      // add or remove classes next frame
      for (const delayedName in val) {
        const delayedVal = val[delayedName];
        if (!oldHasDelay || delayedVal !== oldClass.delayed[delayedName]) {
          changeClassNextFrame(el, delayedName, delayedVal);
        }
      }

    } else if (name !== 'remove' && val !== oldClass[name]) {

      // handle immediately
      addOrRemoveClass(el, name, val);

    }
  }
}

export default {
  create: updateClass,
  update: updateClass,
};
