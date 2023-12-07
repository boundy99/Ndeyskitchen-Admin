let token = null;
let notifiers = new Set();

const AuthStore = {
  subscribe(notify) {
    notifiers.add(notify);

    return () => notifiers.delete(notify);
  },

  setToken(token) {
    token = token;
  },

  getToken() {
    return token;
  },
};

export default AuthStore;
