import Base, {IBase} from '../base';
import {Form} from 'antd';
import * as React from "react";

export interface IApplyPage extends IBase{

}

export default class ApplyPage extends Base<IApplyPage> {
    constructor(readonly props: IApplyPage) {
        super(props);
    }

    public render() {
        return (
            <div>记账页面</div>
        );
    }
}