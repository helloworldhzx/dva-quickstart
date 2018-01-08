import React from 'react';
import {connect} from 'dva';
import styles from './Login.less';
import {config} from '../utils'
import logo from '../public/didid.jpg'
import PropTypes from 'prop-types'
import DataTable from '../components/other/other'
import {Form, Input, Icon, Checkbox, Button, Row, Col} from 'antd'
const FormItem = Form.Item
function Login({
  dispatch,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
  },
}) {
  function handleSubmit() {
    console.log(1123)
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      dispatch({type: 'login/login', payload: values})
    })
  }

  return (
    <div className={styles.form}>
      <DataTable/>
      <div className={styles.logo}><img alt={'logo'} src={logo}/></div>
      <form>
        <FormItem hasFeedback>
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
                message: '用户名是hzxSB'
              }
            ]
          })(<Input size="large" onPressEnter={handleSubmit} placeholder="Username"/>)}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: '密码是wetoo'
              }
            ]
          })(<Input size="large" type="password" onPressEnter={handleSubmit} placeholder="Password"/>)}
        </FormItem>
        <Row>
          <Button type="primary" size="large" onClick={handleSubmit}>
            Sign in
          </Button>
        </Row>
      </form>
    </div>
  );
}

function mapStateToProps(state) {
  console.log(state)
  return state.login;
}

export default connect(mapStateToProps)(Form.create()(Login));
