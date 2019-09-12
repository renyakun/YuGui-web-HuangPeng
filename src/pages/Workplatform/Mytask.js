import { ChartCard, TagCloud, Pie, } from '@/components/Charts';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import { BackTop, Card, Col, Icon, List, Row, Tooltip, Button } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import React, { PureComponent } from 'react';
import Link from 'umi/link';
import { FormattedMessage } from 'umi/locale';
import styles from './styles.less';

const ListItem = List.Item;
const ListItemMeta = List.Item.Meta;

@connect(({ userseting: { notifyinfo, todaynotify }, activities, loading }) => ({
  notifyinfo,
  todaynotify,
  activities,
  loading: loading.models.userseting,
  activitiesLoading: loading.effects['activities/fetchList'],
}))

class Mytask extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.getNotifyUser();
    this.getActivities();
    this.getTodayNotify();
  }

  getTodayNotify() {
    const { dispatch } = this.props;
    dispatch({
      type: 'userseting/fetchTodayNotify',
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
    const { activities: { list }, } = this.props;
    return list.map(item => {
      const events = item.template.split(/@\{([^{}]*)\}/gi).map(key => {
        if (item[key]) {
          return (
            <a href={item[key].link} key={item[key].name}>
              {item[key].name}
            </a>
          );
        }
        return key;
      });
      return (
        <ListItem key={item.id}>
          <ListItemMeta
            title={
              <span>
                <a className={styles.username}>{item.user.name}</a>
                &nbsp;
                <span className={styles.event}>{events}</span>
                <span className={styles.datetime} title={item.updatedAt}>
                  {moment(item.updatedAt).fromNow()}
                </span>
              </span>
            }
          />
        </ListItem>
      );
    });
  }

  fetchMore = () => {
    // const { dispatch } = this.props;
    // dispatch({
    //   type: 'list/appendFetch',
    //   payload: {
    //     count: pageSize,
    //   },
    // });
    alert("加载更多！")
  };

  render() {
    const { loading, notifyinfo, activitiesLoading, activities: { list }, todaynotify } = this.props;
    console.log(todaynotify);
    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 8,
      style: { marginBottom: 24 },
    };
    const tags = [];
    for (let i = 0; i < 50; i += 1) {
      tags.push({
        name: `yugui-2019-0010${i}`,
        value: Math.floor(Math.random() * 50) + 20,
      });
    }

    const loadMore =
      list.length > 0 ? (
        <div style={{ textAlign: 'center' }}>
          <Button onClick={this.fetchMore} style={{ paddingLeft: 48, paddingRight: 48, border: "none" }}>
            {loading ? (
              <span>
                <Icon type="loading" /> 加载中...
              </span>
            ) : (
                '加载更多'
              )}
          </Button>
        </div>
      ) : null;

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
                <br />
                <br />
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
              </ChartCard>
            </Col>
            <Col {...topColResponsiveProps}>
              <Card
                bodyStyle={{ padding: 0 }}
                bordered={false}
                className={styles.activeCard}
                title="动态"
                loading={activitiesLoading}
                style={{ minHeight: 350 }}
              >
                <List
                  loading={activitiesLoading}
                  loadMore={loadMore}
                  size="small">
                  <div className={styles.activitiesList}>{this.renderActivities()}</div>
                </List>
              </Card>
            </Col>
            <Col {...topColResponsiveProps}>
              {/* <Card
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
              </Card>*/}
            </Col>
          </Row>
          <Row gutter={50}>
            <Col {...topColResponsiveProps}>
              {/* <Card
                loading={loading}
                className={styles.salesCard}
                bordered={false}
                title='报告记录'
                style={{ marginTop: 24, minHeight: 509 }}
              >
                <Pie
                  hasLegend
                  //subTitle={<FormattedMessage id="app.analysis.sales" defaultMessage="Sales" />}
                  //total={() => <Yuan>{salesPieData.reduce((pre, now) => now.y + pre, 0)}</Yuan>}
                  //data={salesPieData}
                  //valueFormat={value => <Yuan>{value}</Yuan>}
                  height={248}
                  lineWidth={4}
                />
              </Card> */}
            </Col>
          </Row>
        </GridContent>

        <BackTop />
      </div>
    )
  }
}

export default Mytask;