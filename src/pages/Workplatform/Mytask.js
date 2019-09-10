import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { ChartCard, } from '@/components/Charts';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import { BackTop, Card, Row, Col, Tooltip, Icon } from 'antd';
import { connect } from 'dva';
import React, { PureComponent } from 'react';
import Link from 'umi/link';

@connect(({ userseting: { notifyinfo },  loading }) => ({
  notifyinfo,
  loading: loading.effects['userseting/fetchUserNotifyInfo'],
}))

class Mytask extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.getNotifyUser();
    this.props.dispatch({
      type: 'activities/fetchList',
    });
  }

  getNotifyUser() {
    const { dispatch } = this.props;
    dispatch({
      type: 'userseting/fetchUserNotifyInfo',
    });
  }

  render() {
    const { loading, notifyinfo, activitiesLoading, } = this.props;
    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 8,
      style: { marginBottom: 24 },
    };
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
              >
                <br />
                <Link to={{ pathname: '/workplatform/waitcheckList' }}>
                  待审核报告:{notifyinfo['checkNum']}份
                </Link>
                <br />
                <br />
                <br />
                <Link to={{ pathname: '/workplatform/waitapprveList' }}>
                  待审批报告:{notifyinfo['proveNum']}份
               </Link>
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