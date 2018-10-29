/**
 * Created by liuyc14 on 2018/10/26.
 */
import Base, {IBase} from "../pages/base";
import React, {ReactElement} from 'react';
import Pages from "../pages/index";

export interface IRoute{
    key: string
    title: string,
    content: ReactElement<IBase> | string | null,
    closable: boolean,
    child?: IRoute[],
    Icon?: string
}

const routes: IRoute[] = [
    {key: '000', title: '首页', content: <Pages.Demo name="haha" title={'首页'} pageKey={'000'} />, closable: false, Icon: 'home'},
    {
        key: '001', title: '基础数据管理', content: null, closable: true, Icon: 'setting',
        child: [
            {
                key: '001_1', title: '用户管理', content: null, closable: true, Icon: 'team',
                child: [
                    {key: '001_1_1', title: '用户列表', content: null, closable: true},
                    {key: '001_1_2', title: '添加用户', content: null, closable: true}
                ]
            },
            {
                key: '001_2', title: '银行管理', content: null, closable: true, Icon: 'dollar',
                child: [
                    {key: '001_2_1', title: '银行主数据', content: null, closable: true},
                    {key: '001_2_2', title: '用户开户银行列表', content: null, closable: true}
                ]
            },
            {
                key: '001_3', title: '权限管理', content: null, closable: true, Icon: 'key',
                child: [
                    {key: '001_3_1', title: '权限管理列表', content: null, closable: true},
                    {key: '001_3_2', title: '菜单列表', content: null, closable: true}
                ]
            },
            {
                key: '001_4', title: '附加功能', content: null, closable: true, Icon: 'tool',
                child: [
                    {key: '001_4_1', title: '账户记录列表', content: null, closable: true, Icon: ''}
                ]
            }
        ]
    },
    {
        key: '002', title: '财务管理', content: null, closable: true, Icon: 'book',
        child: [
            {
                key: '002_1', title: '记账', content: <Pages.ApplyPage title={'记账'} pageKey={'002_1'}/>, closable: true
            },
            {
                key: '002_2', title: '收支列表', content: <Pages.ApplyList title={"收支列表"} pageKey={"002_2"}/>, closable: true
            }
        ]
    },
    {
        key: '003', title: '报表统计', content: null, closable: true, Icon: 'bar-chart',
        child: [
            {
                key: '003_1', title: '费用支出报表', content: null, closable: true, Icon: 'line-chart',
                child: [
                    {
                        key: '003_1_1', title: '费用支出统计', content: null, closable: true
                    },
                    {
                        key: '003_1_2', title: '年度同期对比', content: null, closable: true
                    }
                ]
            }
        ]
    }
];

export default routes;