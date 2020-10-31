import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Table, Button } from 'antd';
import emitter from "../../../utils/events";
import {baseState, doPreUpdate} from "../../../utils/commonUtils";

@connect(({ dbConfig: { table: { data, pagination } } }) => ({ data, pagination }))
export default class DataTable extends PureComponent {

  state = baseState("dbConfig", "WDC配置") || {};

  handleChange = (pagination) => {
    emitter.emit(this.state.commons.emitName, pagination);
  };

  parseModel = (val) => {
    const model = String(val);
    if( model === '0'){
      return "特征值方式";
    }
    if( model === '1'){
      return "抽样方式";
    }
    if( model === '2'){
      return "最大值";
    }
    if( model === '3'){
      return "最小值";
    }
    if( model === '4'){
      return "平均值";
    }
    return "无";
  }

 
  parseType = (val) => {
    const type = String(val);
    if(type === '1'){
      return "实时数据(测点名称)";
    }
    if(type === '2'){
      return "实时数据(测点名称)";
    }
    if(type === '3'){
      return "历史数据(测点名称)";
    }
    if(type === '4'){
      return "宽表数据";
    }
    if(type === '5'){
      return "增量数据";
    }
    if(type === '6'){
      return "增量数据(tableau)";
    }
    if(type === '7'){
      return "增量数据(js)";
    }
    return '-';
  }

  render() {
    const { data, loading } = this.props;
    const columns = [
      {
        title: '配置标识',
        dataIndex: 'cid',
        key: 'cid',
        width: 100,
        fixed: 'left',
      },
      {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
        width: 150,
        render: val => this.parseType(val),
        fixed: 'left',
      },
      {
        title: '测点标识',
        dataIndex: 'tagIds',
        key: 'tagIds',
        width: 150,
      },
      {
        title: '测点名称',
        dataIndex: 'tagName',
        key: 'tagName',
        width: 200,
      },
      {
        title: '开始时间',
        dataIndex: 'beginTime',
        key: 'beginTime',
        render: val => val,
        width: 150,
      },
      {
        title: '结束时间',
        dataIndex: 'endTime',
        key: 'endTime',
        render: val => val,
        width: 150,
      },
      {
        title: '间隔(秒)',
        dataIndex: 'gapTime',
        key: 'gapTime',
        width: 100,
      },
      {
        title: '步长(秒)',
        dataIndex: 'step',
        key: 'step',
        width: 100,
      },
      {
        title: '模式',
        dataIndex: 'model',
        key: 'model',
        render: val => this.parseModel(val),
        width: 200,
      },
      {
        title: '描述',
        dataIndex: 'msg',
        key: 'msg',
        render: val => this.parseModel(val),
        width: 200,
      },
      {
        title: '创建人',
        dataIndex: 'userName',
        key: 'userName',
        width: 100,
      },
      {
        title: '操作人',
        dataIndex: 'operateUser',
        key: 'operateUser',
        width: 100,
      },
      {
        title: '创建时间',
        dataIndex: 'createdDate',
        key: 'createdDate',
        width: 150,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '更新时间',
        dataIndex: 'updateDate',
        key: 'updateDate',
        width: 150,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        fixed: 'right',
        width: 120,
        render: (_, record) => (
          <div>
            <Button type="primary" ghost size="small" onClick={() => doPreUpdate(this.props, record)}>编辑</Button>
            &nbsp;
            <Button type="primary" ghost size="small" onClick={() => doPreUpdate(this.props, record)}>删除</Button>
          </div>
        ),
      },
    ];

    return (
      <div >
        <Table
          loading={loading}
          rowKey="cid"
          dataSource={data}
          columns={columns}
          pagination={false}
          onChange={this.handleChange}
          size="small"
          scroll={{ x: 2100 }}
        />
      </div>
    );
  }
}
