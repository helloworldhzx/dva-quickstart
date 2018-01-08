import React from 'react';
import { connect } from 'dva';
import styles from './Users.css';
import {Button} from 'antd'
import UsersComponent from '../../components/Users/Users';

function Users(users) {
	console.log('zaijian')
  return (
    <div className={styles.normal}>
      <UsersComponent
        list={users.list}
        total={users.total}
        pageIndex={users.pageIndex}
      />
    </div>
  );
}
function mapStateToProps(state) {
  return state.Users
}
export default connect(mapStateToProps)(Users);
