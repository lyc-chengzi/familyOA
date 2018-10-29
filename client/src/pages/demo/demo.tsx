/**
 * Created by liuyc14 on 2018/10/25.
 */
import Base, {IBase} from '../base';
import * as React from "react";

export interface IDemo extends IBase{
    name: string
}

export default class Demo extends Base<IDemo>{
    render(){
        return (
            <div>{this.props.name}</div>
        );
    }
}