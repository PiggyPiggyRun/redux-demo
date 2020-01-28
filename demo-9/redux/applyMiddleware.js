import compose from './compose';

 export default function applyMiddleware (...middlewares) {
  return oldCreateStore => (...args) => {
      /*1. 生成store*/
      const store = oldCreateStore(...args);
      /*给每个 middleware 传下store，相当于 const logger = loggerMiddleware(store);*/
      /* const chain = [exception, time, logger]*/
      const simpleStore = { 
        getState: store.getState, 
        dispatch: (...args) => store.dispatch(...args) 
      };
      const chain = middlewares.map(middleware => middleware(simpleStore));
      // let dispatch = store.dispatch;
      // /* 实现 exception(time((logger(dispatch))))*/
      // chain.reverse().map(middleware => {
      //   dispatch = middleware(dispatch);
      // });

      // /*2. 重写 dispatch*/
      // store.dispatch = dispatch;

      const dispatch = compose(...chain)(store.dispatch);
      
      return {
        ...store,
        dispatch
      }
    }
}
