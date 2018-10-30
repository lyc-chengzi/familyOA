import * as React from "react";
import Base, {IBase} from '../base';
import {Table, Form, Row, Col, Button, Pagination, DatePicker} from 'antd';
// @ts-ignore
import styles from './list.less';
import moment from 'moment';
import service from '../../service/applyService';

const FormItem = Form.Item;
const formItemLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 }
};

interface IQueryJson {
    startTime: string,
    endTime: string
}

let queryJSON: IQueryJson = {
    startTime: '',
    endTime: ''
};

class SearchForm extends React.Component<any> {
    public handleSearch = (e:any) => {
        e.preventDefault();
        this.props.form.validateFields((err: any, values: any[]) => {
            this.props.SearchCallback(values);
        });
    };

    public handleReset = () => {
        this.props.form.resetFields();
    };

    // To generate mock Form.Item
    public render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form
                className={styles.searchForm}
                onSubmit={this.handleSearch}
            >
                <Row gutter={40}>
                    <Col span={6} key="startTime">
                        <FormItem {...formItemLayout} label="开始日期">
                            {getFieldDecorator(`startTime`)(
                                <DatePicker locale={'zh-cn'} placeholder="开始日期" />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={6} key="endTime">
                        <FormItem {...formItemLayout} label="结束日期">
                            {getFieldDecorator(`endTime`)(
                                <DatePicker placeholder="结束日期" />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={12} style={{ textAlign: 'left', paddingTop:3 }}>
                        <Button type="primary" htmlType="submit">查询</Button>
                        <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                            重置
                        </Button>
                    </Col>
                </Row>
            </Form>
        );
    }
}

const WrappedSearchForm = Form.create()(SearchForm);

interface IApplyList extends IBase{

}

export default class ApplyList extends Base<IApplyList>{
    constructor(readonly props: IApplyList){
        super(props);
        this.state = {
            data: [],
            selectedRowsCount:0,
            selectedRowKeys: [],
            total: 0,
            page: 1,
            pageSize: 10,
            loading: false
        };
    }

    public column: object[] = [
        {dataIndex: 'applyDate', title: '记账日期'},
        {dataIndex: 'userName', title: '用户'},
        {dataIndex: 'amomey', title: '金额'},
        {dataIndex: 'cash', title: '现金余额'},
        {dataIndex: 'addDate', title: '添加日期'},
    ];

    public render() {
        return (
            <div>
                <WrappedSearchForm SearchCallback={this.searchHandler}/>
                <div>
                    <Table
                        loading={this.state.loading}
                        dataSource={this.state.data}
                        columns={this.column}
                        rowKey={"id"}
                        rowSelection={{
                            selectedRowKeys: this.state.selectedRowKeys,
                            onChange: (selectedRowKeys, selectedRows) => {
                                this.setState({selectedRowsCount: selectedRows.length, selectedRowKeys: selectedRowKeys});
                            }
                        }}
                        pagination={false}
                    />
                    <Pagination
                        className="ant-table-pagination"
                        showTotal={(total, range) => `当前${range[0]}-${range[1]}条， 共 ${total} 条信息`}
                        total={this.state.total}
                        current={this.state.page}
                        pageSize={this.state.pageSize}
                        onChange={this.pageChange.bind(this)}
                    />
                </div>
            </div>
        );
    }

    public query = async (page: number, pageSize: number = 10) => {
        const response = await service.getApplyMainList({userID: '13',page, pageSize, ...queryJSON});
        console.log(response);
    };

    public pageChange = (page: number) => {
        console.log(page);
    };

    public searchHandler = (values: any) => {
        const queryJson = {
            startTime: values.startTime ? moment(values.startTime).format('YYYY-MM-DD') : '',
            endTime: values.endTime ? moment(values.endTime).format('YYYY-MM-DD') : '',
        };

        queryJSON = {...queryJson, ...queryJson};
        this.query(1);
    };
}