export function createStore(rootReducer, initialState = {}) {
  let state = {...initialState};
  let listeners = [];

  return {
    subscribe(fn) {
      this.listeners.push(fn);

      return {
        unsubscribe() {
          listeners = listeners.filter((listener) => {
            return listener !== fn;
          });
        },
      };
    },

    dispatch(action) {
      state = rootReducer(state, action);

      this.listeners.forEach((listener) => {
        listener(state);
      });
    },

    getState() {
      return state;
    },
  };
}
