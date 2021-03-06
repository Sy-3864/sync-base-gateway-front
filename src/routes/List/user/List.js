import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Button } from 'antd';
import DataTable from './DataTable';
import SearchForm from './SearchForm';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import {baseState, doAdd} from "../../../utils/commonUtils";
import styles from '../TableList.less';
import AddOrUpdateModal from './AddOrUpdateModal';



@connect()
export default class List extends PureComponent {

  state = baseState("userConfig", "用户") || {};
  render() {
    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              <SearchForm size="small" />
            </div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => doAdd(this.props, true, false)} size="small">添加</Button>
            </div>
            <DataTable />
          </div>
        </Card>
        <AddOrUpdateModal />
      </PageHeaderLayout>
    );
  }
}
