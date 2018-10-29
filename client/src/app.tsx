/**
 * Created by liuyc14 on 2018/10/23.
 */
import * as React from 'react';
import * as ReactDom from 'react-dom';
// @ts-ignore
import styles from './pages/layout.less';
import { Layout, Menu, Icon, Tabs, LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';

import routes, {IRoute} from './routers/index';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;

let tabs: IRoute[] = new Array(routes[0]);

const loopMenu = (routes: IRoute[]) => {
    return routes.map(c=>{

        if(c.child){
            return (
                <SubMenu key={c.key} title={c.Icon ? <span><Icon type={c.Icon} /><span>{c.title}</span></span> : <span>{c.title}</span>}>
                    {loopMenu(c.child)}
                </SubMenu>
            );
        }else{
            return c.Icon
                ? <Menu.Item key={c.key} item={c}><Icon type={c.Icon}/><span>{c.title}</span></Menu.Item>
                : <Menu.Item key={c.key} item={c}><span>{c.title}</span></Menu.Item>
        }
    });
};

class App extends React.Component<any, any> {
    constructor(props: any){
        super(props);
    }

    state = {
        collapsed: false,
        tabs: tabs,
        activeTabKey: routes[0].key,
        selectedMenuKeys: [routes[0].key]
    };

    render() {
        return (
            <LocaleProvider locale={zh_CN}>
                <Layout style={{height: '100%'}}>
                    <Header style={{background: '#e87766', padding: 0 }}>
                        <div className={styles.cc}>logo</div>
                    </Header>
                    <Layout style={{height: 'calc(100% - 66px)'}}>
                        <Sider
                            collapsible
                            collapsed={this.state.collapsed}
                            onCollapse={this.onCollapse}
                            style={{background: '#fff', overflow: 'auto'}}
                        >
                            <Menu
                                defaultSelectedKeys={['1']}
                                selectedKeys={this.state.selectedMenuKeys}
                                mode="inline"
                                style={{ height: '100%', borderRight: 0 }}
                                onClick={this.menuClick}
                            >
                                {loopMenu(routes)}
                            </Menu>
                        </Sider>
                        <Layout style={{height: '100%'}}>
                            <Content id="layout_tabs" style={{margin: '0 16px', display: 'flex', flexDirection: 'column', paddingTop:10}}>
                                <Tabs
                                    style={{flex: 1, display: 'flex', flexDirection: 'column'}}
                                    onChange={this.pageChanged}
                                    activeKey={this.state.activeTabKey}
                                    type="editable-card"
                                    tabBarStyle={{marginBottom: 0}}
                                    onEdit={this.closeMenuTab}
                                >
                                    {this.state.tabs.map(c => <TabPane tab={c.title} key={c.key} closable={c.closable}>{c.content}</TabPane>)}
                                </Tabs>
                            </Content>
                            <Footer style={{ textAlign: 'center' }}>
                                Ant Design ©2018 Created by Ant UED
                            </Footer>
                        </Layout>
                    </Layout>
                </Layout>
            </LocaleProvider>
        );
    }

    onCollapse = (collapsed: boolean) => {
        this.setState({ collapsed });
    };

    /**
     * 页面选项卡切换事件
     * @param key
     */
    pageChanged = (key: string) => {
        this.setState({
            activeTabKey: key,
            selectedMenuKeys: [key]
        });
    };

    closeMenuTab = (targetKey: any, action: any) => {
        if(action === 'remove'){
            this.removeTab(targetKey);
        }
    };

    removeTab = (targetKey: any) => {
        let activeKey = this.state.activeTabKey;
        let lastIndex = 0;
        this.state.tabs.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.state.tabs.filter(pane => pane.key !== targetKey);
        if (lastIndex >= 0 && activeKey === targetKey) {
            activeKey = panes[lastIndex].key;
        }
        this.setState({ tabs: panes, activeTabKey: activeKey, selectedMenuKeys: [activeKey] });
    }

    /**
     * 菜单跳转加载
     * @param params
     */
    menuClick = (params: any): void => {
        const {item, key} = params;
        const {tabs} = this.state;
        console.log(item, key);
        const results = tabs.filter(c=>c.key === key);

        //如果菜单已经打开
        if(results && results.length == 1){
            this.setState({
                activeTabKey: key,
                selectedMenuKeys: [key]
            });
        }
        //如果菜单还没打开
        else{
            const route = item.props.item;
            tabs.push(route);

            this.setState({
                tabs: tabs,
                activeTabKey: key,
                selectedMenuKeys: [key]
            });
        }
    }
}

ReactDom.render(<App />, document.getElementById('root'));