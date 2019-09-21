import StandardTable from '@/components/StandardTable';
import { BackTop, Button, Card, Col, Form, Icon, Input, Row, Select, Tag, Tooltip, DatePicker } from 'antd';
import { connect } from 'dva';
import React, { Fragment, PureComponent } from 'react';
import Link from 'umi/link';
import moment from 'moment';
import styles from './SearchReportList.less';

function createData(list, total, pageSize, current) {
  const newData = new Object();
  newData.list = list;
  newData.pagination = new Object();
  newData.pagination.total = total;
  newData.pagination.pageSize = pageSize;
  newData.pagination.current = current;
  return newData;
}

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker, } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const flag = ['录入报告', '待审核', '审核通过', '待审批', '审批通过', '报告归档', '', '', '', '', '', '', '审核不通过', '', '审批不通过'];
const flagcolor = ['#FF7F50', '#79CDCD', '#3CB371', '#8470FF', '#218868', '#CD00CD', '', '', '', '', '', '', '#FF6347', '', '#FF0000', ''];

@connect(({ SearchReport, SearchReport: { UserName }, loading }) => ({
  SearchReport,
  UserName,
  loading: loading.models.SearchReport,
}))

@Form.create()
class SearchReportList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedRows: [],
      formValues: {},
      UserName: [],
      expandForm: false,
    }
  }

  columns = [
    {
      title: '编号',
      dataIndex: 'reportNo',
      width: 200,
    },
    {
      title: '当前处理人',
      dataIndex: 'preUser',
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
      render: (text, record) => {
        return <Tag color={flagcolor[text]}>{flag[text]}</Tag>
      }
    },
    {
      title: '处理时间',
      dataIndex: 'createTime',
      width: 200,
    },
    {
      title: '操作',
      dataIndex: 'actions',
      width: 150,
      render: (text, record) => (
        <Fragment>
          <Link to={{ pathname: '/report/handle/reportview', report: `${record.reportNo}` }}>查看报告</Link>
        </Fragment>
      ),
    },
    {
      title: '备注',
      dataIndex: 'remarks',
      render: (text, record) => {
        if (record.flag == '12') {
          return <b>{record.valveHistory.checkReason}</b>
        } else if (record.flag == '14') {
          return <b>{record.valveHistory.approveReason}</b>
        } else {
          return <b>--</b>
        }

      }
    }
  ];

  componentWillReceiveProps(nextProps) {
    if (nextProps.UserName != this.props.UserName) {
      this.setState({
        UserName: nextProps.UserName,
      });
    }
  }

  componentDidMount() {
    this.fetchSearchList();
    this.fetchUserName();
  }

  fetchSearchList() {
    const { dispatch } = this.props;
    dispatch({
      type: 'SearchReport/fetchSearchList',
    });
  }

  fetchUserName() {
    const { dispatch } = this.props;
    dispatch({
      type: 'SearchReport/fetchUserName',
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
      pageNum: pagination.current,
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
      const values = {
        ...fieldsValue,
      };
      this.setState({
        formValues: values,
      });
      console.log(fieldsValue)
      dispatch({
        type: 'SearchReport/fetchSearchList',
        payload: values,
      });
    });
  };

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  renderSimpleForm() {
    const { form: { getFieldDecorator } } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="报告编号">
              {getFieldDecorator('reportNo')(<Input placeholder="请输入" allowClear />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="报告处理人">
              {getFieldDecorator('userName')(
                <Select allowClear
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {this.state.UserName.map((item, i) => (
                    <Option key={item} value={item}>{item}</Option>
                  ))}
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
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type="down" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderAdvancedForm() {
    const { form: { getFieldDecorator } } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="报告编号">
              {getFieldDecorator('reportNo')(<Input placeholder="请输入" allowClear />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="报告处理人">
              {getFieldDecorator('userName')(
                <Select allowClear
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {this.state.UserName.map((item, i) => (
                    <Option key={item} value={item}>{item}</Option>
                  ))}
                </Select>)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="状态">
              {getFieldDecorator('flag', { initialValue: '1' })(
                <Select allowClear>
                  <Option value="1">待审核</Option>
                  <Option value="2">审核通过</Option>
                  <Option value="3">待审批</Option>
                  <Option value="4">审批通过</Option>
                  <Option value="5">报告归档</Option>
                  <Option value="12">审核不通过</Option>
                  <Option value="14">审批不通过</Option>
                </Select>)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          {/* <Col md={8} sm={24}>
            <FormItem label="处理时间">
              {getFieldDecorator('createTime')(
                <RangePicker
                  defaultValue={[moment('2015/01/01', dateFormat), moment('2019/09/05', dateFormat)]}
                  format={dateFormat}
                />
              )}
            </FormItem>
          </Col> */}
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                收起 <Icon type="up" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    )
  }

  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  render() {
    const { SearchReport: { SearchList }, loading, } = this.props;
    const { selectedRows } = this.state;
    const data = createData(SearchList.list, SearchList.total, SearchList.pageSize, SearchList.pageNum)
    return (
      <div>
        <Card bordered={false} title="报表查询">
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.renderForm()}</div>
            <StandardTable
              selectedRows={selectedRows}
              onSelectRow={this.handleSelectRows}
              loading={loading}
              data={data}
              columns={this.columns}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <BackTop />
      </div>
    );
  }
}

export default SearchReportList;
