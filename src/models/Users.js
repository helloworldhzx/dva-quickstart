import * as usersService from '../services/users';

export default {
  namespace: 'Users',
  state: {
    list: [{name: 1}, {name: 2}],
    total: 3,
    page: 1
  },
  reducers: {
    save(state, {data: list, total, page}) {
      console.log(list)
      return {...state, list, total, page};
    },
    addTable(state, {}){
      let list = state.list.push({name: 'sb'})
      return {...state, list}
    }
  },
  effects: {
    *fetch({payload: {page = 1}}, {call, put}) {
      let param = {
        companyId: 2
      }
      let res = yield call(usersService.fetchData, {param: param, pageIndex: 1})
      yield put({
        type: 'save',
        //data,
        data: [{name: 1}],
        total: 3,//parseInt(headers['x-total-count'], 10),
        page: 1//parseInt(page, 10),
      });
    },
  },
  subscriptions: {
    setup({dispatch}) {
      dispatch({type: 'fetch', payload: {}});
    }
  }
};
