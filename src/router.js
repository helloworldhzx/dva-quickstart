import React from 'react';
import {Router} from 'dva/router';

const cached = {};
function registerModel(app, model) {
  if (!cached[model.namespace]) {
    app.model(model);
    cached[model.namespace] = 1;
  }
}

function RouterConfig({history, app}) {
  const routes = [
    {
      path: '/',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('./models/login'));
          cb(null, require('./routes/Login'));
        });
      }
    },
    {
      path: '/index(/:pageCode)',
      getComponent(nextState, cb) {
        let pageCode = nextState.params.pageCode;
        console.log(pageCode)
        require.ensure([], (require) => {
          //registerModel(app, require('./models/Users'));
          //registerPageModel(app, pageCode);
          //cb(null, require('./routes/Users/'));
          switch (pageCode) {
            case 'IndexPage':
              registerModel(app, require('./models/IndexPage'));
              cb(null, require('./routes/IndexPage/'));
              break;
            case 'Users':
              registerModel(app, require('./models/Users'));
              cb(null, require('./routes/Users/'));
              break;
            default:
              break;
          }
        });
      },
    },
  ];
  return <Router history={history} routes={routes}/>;
}

function registerPageModel(app, pageCode) {
  switch (pageCode) {
    case 'IndexPage':
      registerModel(app, require('./models/IndexPage'));
      break;
    case 'users':
      registerModel(app, require('./models/Users'));
      break;
    default:
      break;
  }
}

export default RouterConfig;
