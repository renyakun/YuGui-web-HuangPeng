import { Pie, TagCloud } from '@/components/Charts';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import { BackTop, Card, Col, List, message, Row } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import React, { PureComponent } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import Link from 'umi/link';
import styles from './styles.less';

const ListItem = List.Item;
const ListMeta = List.Item.Meta;

@connect(({ userseting: { notifyinfo, todaynotify, newNotify }, loading }) => ({
  notifyinfo,
  todaynotify,
  newNotify,
  loading: loading.models.userseting,
}))

class Mytask extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    }
  }

  componentDidMount() {
    this.getNotifyUser();
    this.getActivities();
    this.getTodayNotify();
    this.getNewReportNotify();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newNotify != this.props.newNotify) {
      this.setState({
        list: nextProps.newNotify,
      });
    }
  }

  getTodayNotify() {
    const { dispatch } = this.props;
    dispatch({
      type: 'userseting/fetchTodayNotify',
    });
  }

  getNewReportNotify() {
    const { dispatch } = this.props;
    dispatch({
      type: 'userseting/fetchNewReportNotify',
    });
  }

  getActivities() {
    const { dispatch } = this.props;
    dispatch({
      type: 'activities/fetchList',
    });
  }

  getNotifyUser() {
    const { dispatch } = this.props;
    dispatch({
      type: 'userseting/fetchUserNotifyInfo',
    });
  }

  handleInfiniteOnLoad = () => {
    console.log("loading...")
  }

  render() {
    const { loading, notifyinfo, todaynotify } = this.props;
    const { list } = this.state;
    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12,
      style: { marginBottom: 16 },
    };

    const tags = [];
    for (let i = 0; i < 50; i += 1) {
      tags.push({
        name: `yugui-2019-0010${i}`,
        value: Math.floor(Math.random() * 50) + 20,
      });
    }

    const salesPieData = [
      {
        x: '新建报告数',
        y: todaynotify.newReportNum,
      },
      {
        x: '审核报告数',
        y: todaynotify.checkReportNum,
      },
      {
        x: '审批报告数',
        y: todaynotify.aprroveReportNum,
      },
      {
        x: '归档报告数',
        y: todaynotify.fileReportNum,
      },
    ];

    return (
      <div>
        <GridContent>
          <Row gutter={50}>

            <Col {...topColResponsiveProps}>
              <Card
                bordered={false}
                loading={loading}
                title='任务处理'
                style={{ minHeight: 350 }}
              >
                <div style={{ marginTop: 35 }}>
                  <Link to={{ pathname: '/workplatform/waitcheckList' }}>
                    <b style={{ marginRight: 10, fontSize: 20, color: '#000' }}>待审核报告:</b><em style={{ marginRight: 10, fontSize: 30 }}>{notifyinfo['checkNum']}</em><span style={{ fontSize: 20, color: '#000' }}>份</span>
                  </Link>
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <Link to={{ pathname: '/workplatform/waitapprveList' }}>
                    <b style={{ marginRight: 10, fontSize: 20, color: '#000' }}>待审批报告:</b><em style={{ marginRight: 10, fontSize: 30 }}>{notifyinfo['proveNum']}</em><span style={{ fontSize: 20, color: '#000' }}>份</span>
                  </Link>
                </div>
              </Card>
            </Col>

            <Col {...topColResponsiveProps}>
              <Card
                loading={loading}
                className={styles.salesCard}
                bordered={false}
                title='今日报告记录'
                style={{ minHeight: 250 }}
              >
                <Pie
                  hasLegend
                  subTitle='今日报告'
                  total={() => <b>{salesPieData.reduce((pre, now) => now.y + pre, 0)}</b>}
                  data={salesPieData}
                  valueFormat={value => <i><b style={{ marginRight: 10 }}>{value}</b>份</i>}
                  lineWidth={4}
                />
              </Card>
            </Col>

          </Row>

          <Row gutter={50}>

            <Col {...topColResponsiveProps}>
              <Card
                bordered={false}
                loading={loading}
                className={styles.activeCard}
                title="最新动态"
                style={{ minHeight: 350 }}
              >
                <div style={{ overflow: 'auto', padding: '8px 24px', height: 300 }}>
                  <InfiniteScroll
                    initialLoad={false}
                    pageStart={0}
                    loadMore={this.handleInfiniteOnLoad}
                    useWindow={false}
                  >
                    <List
                      dataSource={list}
                      renderItem={item => (
                        <ListItem key={item.id}>
                          <ListMeta
                            key={item.id}
                            title={
                              <span>
                                <span>{
                                  item.message.split(/@\{([^{}]*)\}/gi).map(key => {
                                    if (item[key]) {
                                      if (key == "reportNo") {
                                        return (<Link to={{ pathname: '/report/handle/reportview', report: `${item[key]}` }}>{item[key]}</Link>)
                                      }
                                      return (<b style={{ color: 'dodgerblue' }}>{item[key]}</b>)
                                    }
                                    return (<span style={{ marginLeft: 5, marginRight: 5 }}>{key}</span>);
                                  })
                                }</span>
                              </span>
                            }
                            description={
                              <span>
                                <span className={styles.datetime} title={item.operationTime} >
                                  <em>{item.operationTime.slice(0, 16).replace('T', ' ')}</em>
                                </span>
                              </span>
                            }
                          />
                        </ListItem>
                      )}
                    ></List>
                  </InfiniteScroll>
                </div>
              </Card>
            </Col>

            {/* <Col {...topColResponsiveProps}>
              <Card
                title={
                  <FormattedMessage
                    id="app.monitor.popular-searches"
                    defaultMessage="Popular Searches"
                  />
                }
                //loading={loading} height={250} 
                bordered={false}
                bodyStyle={{ overflow: 'hidden' }}
                style={{ minHeight: 300 }}
              >
                <TagCloud data={tags} />
              </Card>
            </Col> */}

          </Row>

        </GridContent>
        <BackTop />
      </div >
    )
  }
}

export default Mytask;