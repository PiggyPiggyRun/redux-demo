/*增加一个参数 reducer*/
export default function (reducer, initState) {
  let state = initState;
  let listeners = [];

  function subscribe(listener) {
    listeners.push(listener);
  }

  function dispatch(action) {
    /*请按照我的计划修改 state*/
    state = reducer(state, action);
    listeners.forEach(listener => listener())
  }

  function getState() {
    return state;
  }

  return {
    subscribe,
    dispatch,
    getState
  }
}
