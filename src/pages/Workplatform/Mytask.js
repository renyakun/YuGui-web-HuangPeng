import { ChartCard, Pie, TagCloud } from '@/components/Charts';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import { BackTop, Button, Card, Col, Icon, List, Row, Tooltip, message, } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import React, { PureComponent } from 'react';
import Link from 'umi/link';
import { FormattedMessage } from 'umi/locale';
import { routerRedux } from 'dva/router';
import styles from './styles.less';
import InfiniteScroll from 'react-infinite-scroller';


const ListItem = List.Item;
const ListItemMeta = List.Item.Meta;

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
      loadings: false,
      hasMore: true,
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

  renderActivities() {
    const { list } = this.state;
    console.log(list)
    return list.map(item => {
      const events = item.message.split(/@\{([^{}]*)\}/gi).map(key => {
        if (item[key]) {
          return (<b style={{ color: 'dodgerblue' }}>{item[key]}</b>)
        }
        return (<span style={{ marginLeft: 5, marginRight: 5 }}>{key}</span>);
      });

      //let str = item.id;
      return (
        < ListItem key={item.id} >
          <ListItemMeta
            title={
              <span>
                <span className={styles.event}>{events}</span>
                <span className={styles.datetime} title={item.operationTime}>
                  {moment(item.operationTime).fromNow()}
                </span>
              </span>
            }
          />
        </ListItem >
      )
    })
  }

  fetchMore = () => {
    const { dispatch } = this.props;
    message.loading('加载更多', 2);
    setTimeout(() => {
      dispatch(
        routerRedux.push({
          pathname: '/workplatform/dynamic',
        })
      )
    }, 2500);
  };

  render() {
    const { loading, notifyinfo, todaynotify } = this.props;
    const { loadings, hasMore, list } = this.state;
    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 8,
      style: { marginBottom: 24 },
    };
    const BotmColResponsiveProps = {
      xs: 40,
      sm: 24,
      md: 24,
      lg: 24,
      xl: 16,
      style: { marginBottom: 24 },
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
              <ChartCard
                bordered={false}
                loading={loading}
                title='任务处理'
                action={
                  <Tooltip title='待办任务'>
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
                style={{ minHeight: 350 }}
              >
                <div style={{ marginTop: 50 }}>
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
              </ChartCard>
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
                style={{ minHeight: 250 }}
              >
                <TagCloud data={tags} />
              </Card>
            </Col> */}
          </Row>

          <Row gutter={50}>
            <Col {...BotmColResponsiveProps}>
              <ChartCard
                bordered={false}
                loading={loading}
                className={styles.activeCard}
                title="动态"
                action={
                  <Tooltip title='更多'>
                    <Icon type="plus-circle" theme="twoTone" twoToneColor="dodgerblue" onClick={this.fetchMore} />
                  </Tooltip>
                }
                style={{ minHeight: 350 }}
              >
                <List
                  loading={loading}
                  style={{ marginTop: 10 }}
                  size="small"
                >
                  <div className={styles.activitiesList}>{this.renderActivities()} </div>
                </List>
              </ChartCard>

            </Col>

          </Row>
        </GridContent>

        <BackTop />
      </div>
    )
  }
}

export default Mytask;