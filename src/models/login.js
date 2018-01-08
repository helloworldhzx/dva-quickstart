import { routerRedux } from 'dva/router'
import {message} from 'antd'
import {getSession} from '../utils/sessionStore';
export default {
  namespace: 'login',
  state: {},
  reducers: {},
  effects: {
    *login(opt,{select,call,put}){
      let payload = opt.payload
      console.log(opt.payload)
      if(payload.password=='1'&&payload.username=='1'){
        yield put(routerRedux.push('/index/IndexPage'))
      }else if(payload.password=='wetoo'&&payload.username=='hzxSB'){
        message.info('你是傻逼吗？我说啥就是啥？username:1,password:1');
      }
    }
  },
  subscriptions: {

  },
};
