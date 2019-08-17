import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import StandardTable from '@/components/StandardTable';
import { BackTop, Button, Card, Col, Dropdown, Form, Icon, Input, Menu, Row, Tag, Select } from 'antd';
import moment from 'moment';
import { connect } from 'dva';
import React, { Fragment, PureComponent } from 'react';
import Link from 'umi/link';
import styles from './SearchReportList.less';



const FormItem = Form.Item;
const MenuItem = Menu.Item;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const flag = ['录入报告', '提交审核', '审核通过', '提交审批', '审批通过', '报告归档', '', '', '', '', '', '', '审核不通过', '', '审批不通过'];
const flagcolor = ['#FF7F50', '#8B0A50', '#FF6A6A', '#20B2AA', '#CD5C5C', '#CD00CD', '', '', '', '', '', '', '#CD0000', '', '#EE0000', ''];



/* eslint react/no-multi-comp:0 */
// , 
@connect(({ SearchReport, SearchReport: { RealName }, loading }) => ({
  SearchReport,
  RealName,
  loading: loading.models.SearchReport,
}))

@Form.create()
class SearchReportList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedRows: [],
      formValues: {},
      RealName: [],
    }
  }

  columns = [
    {
      title: '报告编号',
      dataIndex: 'reportNo',
      width: 100,
    },
    {
      title: '报告处理人',
      dataIndex: 'realName',
      width: 150,
    },
    {
      title: '状态',
      dataIndex: 'flag',
      width: 150,
      filters: [
        {
          text: flag[1],
          value: 1,
        },
        {
          text: flag[2],
          value: 2,
        },
        {
          text: flag[3],
          value: 3,
        },
        {
          text: flag[4],
          value: 4,
        },
        {
          text: flag[5],
          value: 5,
        },
        {
          text: flag[12],
          value: 12,
        },
        {
          text: flag[14],
          value: 14,
        },

      ],
      render(val) {
        return <Tag color={flagcolor[val]}>{flag[val]}</Tag>;
      },
    },
    {
      title: '报告处理时间',
      dataIndex: 'createTime',//
      // sorter: true,
      // render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '操作',
      dataIndex: 'actions',
      width: 150,
      render: (text, record) => (
        <Fragment>
          <Link to={{ pathname: '/' }}>查看报告</Link>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    this.fetchSearchList();
    this.fetchUserRealName();
  }

  fetchSearchList() {
    const { dispatch } = this.props;
    dispatch({
      type: 'SearchReport/fetchSearchList',
    });
  }

  fetchUserRealName() {
    const { dispatch } = this.props;
    dispatch({
      type: 'SearchReport/fetchUserRealName',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});


    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'SearchReport/fetchSearchList',
      payload: params,
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'SearchReport/fetchSearchList',
      payload: {},
    });
  };

  // handleMenuClick = e => {
  //   const { dispatch } = this.props;
  //   const { selectedRows } = this.state;

  //   if (!selectedRows) return;
  //   switch (e.key) {
  //     case 'remove':
  //       dispatch({
  //         type: 'rule/remove',
  //         payload: {
  //           key: selectedRows.map(row => row.key),
  //         },
  //         callback: () => {
  //           this.setState({
  //             selectedRows: [],
  //           });
  //         },
  //       });
  //       break;
  //     default:
  //       break;
  //   }
  // };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearch = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      if (!err) { console.log(fieldsValue); }
      const values = {
        ...fieldsValue,
        //updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
        createTime: fieldsValue.createTime && fieldsValue.createTime.valueOf(),
      };
      console.log(values);
      this.setState({
        formValues: values,
      });
      dispatch({
        type: 'SearchReport/fetchSearchList',
        payload: values,
      });
    });
  };

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
      RealName,
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="报告编号">
              {getFieldDecorator('reportNo')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="报告处理人">
              {getFieldDecorator('realName',{initialValue:RealName[0] })(
              <Select>
                <Option value={RealName[0]}>{RealName[0]}</Option>
                <Option value={RealName[1]}>{RealName[1]}</Option>
                <Option value={RealName[2]}>{RealName[2]}</Option>
              </Select>)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const {
      SearchReport: { data },
      loading,
    } = this.props;
    const { selectedRows } = this.state;
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <MenuItem key="remove">删除</MenuItem>
        <MenuItem key="approval">批量审批</MenuItem>
      </Menu>
    );


    return (
      <PageHeaderWrapper>
        <Card bordered={false} title="报表查询">
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <div className={styles.tableListOperator}>
              {selectedRows.length > 0 && (
                <span>
                  <Button>批量操作</Button>
                  <Dropdown overlay={menu}>
                    <Button>
                      更多操作 <Icon type="down" />
                    </Button>
                  </Dropdown>
                </span>
              )}
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <BackTop />
      </PageHeaderWrapper>
    );
  }
}

export default SearchReportList;
