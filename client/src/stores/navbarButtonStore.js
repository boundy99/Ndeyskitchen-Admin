let button;
const notifiers = new Set();

const navabarButtonStore = {
  subscribe(notify) {
    notifiers.add(notify);

    return () => notifiers.delete(notify);
  },

  setButton(name) {
    button = name;
  },

  getButton() {
    return button;
  },
};

export default navabarButtonStore;
