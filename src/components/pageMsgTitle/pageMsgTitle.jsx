import React from 'react';
import {
  connect
} from 'dva';
import {
  Row, Col, Breadcrumb
} from 'antd';
import './pageMsgTitle.less';

let PageMsgTitle = React.createClass({
  shouldComponentUpdate(nextProps, nextState) {
    if(this.props.currentKey !== nextProps.currentKey || nextProps.currentKey === 'MAIN'){
      return true;
    }else{
      return false;
    }
  },
  render() {
    let pageMsg = undefined;
    let currentSels = currentMenus(this.props.menus, this.props.openKeys, this.props.currentKey);
    if(currentSels){
      pageMsg = currentSels.map((item, index) => {
        return (
          <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
        );
      });
    }
    return (
      <Row className="index-message-row">
        <Col>
          <Breadcrumb>
            {pageMsg}
          </Breadcrumb>
        </Col>
      </Row>
    );
  }
});

function mapStateToProps(state) {
  let {menus, currentKey, openKeys} = state.indexPage
  return {
    menus,
    currentKey,
    openKeys
  };
}

function currentMenus(menus, openKeys, currentKey) {
  let currentMenus = [];

  let menuLoop = (items, key) => {
    if(items){
      let menuItem = items.find((item) => {
        return item.menuCode === key;
      });

      if(menuItem){
        return {
          menuName: menuItem.menuName,
          children: menuItem.children
        };
      }
    } else {
      return undefined;
    }

  };

  if(menus){
    let keys = openKeys;
    if(currentKey === 'MAIN') {
      keys = ['MAIN'];
    }
    if(keys){
      let len = keys.length;
      let myMenus = menus;
      for(let i=len-1; i>=0; i--){
        let key = keys[i];
        let ret = menuLoop(myMenus, key);
        if(ret){
          currentMenus.push(ret.menuName);
          myMenus = ret.children;
        }
      }
    }
  }
  return currentMenus;
}

export default connect(mapStateToProps)(PageMsgTitle);
