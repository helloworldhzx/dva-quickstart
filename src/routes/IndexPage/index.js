import React from 'react';
import {connect} from 'dva';
import styles from './IndexPage.css';
import { Layout, Menu, Breadcrumb, Icon ,Button,Row,Col,Badge ,Dropdown} from 'antd';
import logo from '../../public/logo.jpg'
import {getSession,getLocalStore} from '../../utils/sessionStore';
import Constant from '../../utils/constant';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;


class IndexPage extends React.Component{
  constructor(props) {
    super(props);
    // Operations usually carried out in componentWillMount go here
    this.state ={
      collapsed: false,
      userName:'黄证监会呢些'
    };
    let user = getSession(Constant.systemUser);
    console.log(user)
    this.handleAddClick= this.handleAddClick.bind(this);
    this.onCollapse= this.onCollapse.bind(this);
  }
   handleAddClick(){
    console.log(this.props)
    this.props.dispatch({
      type: 'IndexPage/fetch'
    })
  }
  onCollapse(collapsed){
    console.log(collapsed)
    this.setState({ collapsed });
  }
  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st menu item</a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">2nd menu item</a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">3rd menu item</a>
        </Menu.Item>
      </Menu>
    );
    return (
      <Layout style={{height: document.body.offsetHeight+ 'px'}}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className={styles.logo}><img alt={'logo'} src={logo} /></div>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <Icon type="pie-chart" />
              <span>Option 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="desktop" />
              <span>Option 2</span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={<span><Icon type="user" /><span>User</span></span>}
            >
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={<span><Icon type="team" /><span>Team</span></span>}
            >
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9">
              <Icon type="file" />
              <span>File</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header>
            <Row type="flex" justify="end">
              <Col>
                <Badge count={0} showZero>
                  <Dropdown overlay={menu}>
                    <a className="ant-dropdown-link" href="#">
                      {this.state.userName}<Icon type="down" />
                    </a>
                  </Dropdown>
                </Badge>
              </Col>
            </Row>
          </Header>
          <Content className={styles.content}><Button onClick={this.handleAddClick}>不要碰我</Button></Content>
          <Footer className={styles.footer}><Row type="flex" justify="center">渣滓有限公司渣滓有限公司@所属2017-12-13</Row></Footer>
        </Layout>
      </Layout>
    );
  }
}
function mapStateToProps(state) {
  console.log(state)
  return state
}
export default connect(mapStateToProps)(IndexPage);
