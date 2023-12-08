let button = 'earnings';
const notifiers = new Set();

const navabarButtonStore = {
  subscribe(notify) {
    notifiers.add(notify);

    return () => notifiers.delete(notify);
  },

  setButton(name) {
    button = name;
    notifiers.forEach(notify => notify());
  },

  getButton() {
    return button;
  },
};

export default navabarButtonStore;
