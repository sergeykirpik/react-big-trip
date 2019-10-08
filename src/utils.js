export const KeyCode = {
  ESC: 27,
  ENTER: 13,
};

export const Position = {
  BEFORE_BEGIN: `beforeBegin`,
  AFTER_BEGIN: `afterBegin`,
  BEFORE_END: `beforeEnd`,
  AFTER_END: `afterEnd`
};

export const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

export const createElement = (template) => {
  const div = document.createElement(`div`);
  div.innerHTML = template;
  return div.firstElementChild;
};

export const die = (msg) => {
  throw new Error(msg);
};

export const groupBy = (arr, test) => {
  if (!test) {
    test = (a, b) => a === b;
  }
  const result = [];
  arr.forEach((e) => {
    const g = result[result.length - 1] || [];
    if (g.length > 0 && test(g[g.length - 1], e)) {
      g.push(e);
    } else {
      result.push([e]);
    }
  });
  return result;
};

export const render = (container, component, place = Position.BEFORE_END) => {
  switch (place) {
    case Position.BEFORE_BEGIN:
    case Position.AFTER_BEGIN:
    case Position.BEFORE_END:
    case Position.AFTER_END:
      container.insertAdjacentElement(place, component.element);
      break;
    default:
      throw new Error(`Invalid insertion point: ${place}`);
  }
};

export const replaceComponent = (oldComponent, newComponent) => {
  oldComponent.element.parentNode.replaceChild(newComponent.element, oldComponent.element);
};

export const rerender = (component, parentNode) => {
  if (component) {
    const container = parentNode || component.element.parentNode;
    unrender(component);
    render(container, component);
  }
};

export const unrender = (component, needRemoveElement = true) => {
  if (component) {
    component.element.remove();
    if (needRemoveElement) {
      component.removeElement();
    }
  }
};

export const getRandom = (n) => Math.floor(Math.random() * n);
export const getRandomBool = () => [true, false][getRandom(2)];
export const getRandomDate = () => new Date(Date.now() + getRandom(daysToMSec(6)) - getRandom(daysToMSec(3)));
export const hoursToMSec = (h) => h * 1000 * 3600;
export const daysToMSec = (d) => hoursToMSec(24 * d);
export const shuffle = (array) => array.sort(() => Math.random() - 0.5);

