import { routerRedux } from 'dva/router'
export default {

  namespace: 'IndexPage',

  state: {list: [{name:1},{name:2}],
    total: 3,
    page: 1},

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      console.log(1123123)
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      console.log(1223)
      yield put(routerRedux.push('/index/Users'))
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    }
  }
};
