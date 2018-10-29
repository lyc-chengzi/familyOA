/**
 * Created by liuyc14 on 2018/10/26.
 */
import React from 'react';

export interface IBase {
    title: string,
    pageKey: string
}


export default class Base<T extends IBase> extends React.Component<T, any>{
    constructor(props: Readonly<T>){
        super(props);
    }
}