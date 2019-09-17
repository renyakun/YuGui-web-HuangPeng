import React, { PureComponent } from 'react';
import { BackTop, Button, Card, Carousel, Col, Icon, List, Row, Tooltip } from 'antd';
import { connect } from 'dva';
import styles from './styles.less';

@connect(({ userseting: { newNotify }, loading }) => ({
    newNotify,
    loading: loading.models.userseting,
}))
class Dynamic extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            dotPosition: 'right',
            list: [
                {
                    id: 'trend-1',
                    updatedAt: new Date(),
                    user: {
                        name: '曲丽丽',
                    },
                    group: {
                        name: '高逼格设计天团',
                        link: 'http://github.com/',
                    },
                    project: {
                        name: '六月迭代',
                        link: 'http://github.com/',
                    },
                    template: '在 @{group} 新建项目 @{project}',
                },
                {
                    id: 'trend-2',
                    updatedAt: new Date(),
                    user: {
                        name: '付小小',
                    },
                    group: {
                        name: '高逼格设计天团',
                        link: 'http://github.com/',
                    },
                    project: {
                        name: '六月迭代',
                        link: 'http://github.com/',
                    },
                    template: '在 @{group} 新建项目 @{project}',
                },
                {
                    id: 'trend-3',
                    updatedAt: new Date(),
                    user: {
                        name: '林东东',
                    },
                    group: {
                        name: '中二少女团',
                        link: 'http://github.com/',
                    },
                    project: {
                        name: '六月迭代',
                        link: 'http://github.com/',
                    },
                    template: '在 @{group} 新建项目 @{project}',
                },
                {
                    id: 'trend-4',
                    updatedAt: new Date(),
                    user: {
                        name: '周星星',
                    },
                    project: {
                        name: '5 月日常迭代',
                        link: 'http://github.com/',
                    },
                    template: '将 @{project} 更新至已发布状态',
                },
                {
                    id: 'trend-5',
                    updatedAt: new Date(),
                    user: {
                        name: '朱偏右',
                    },
                    project: {
                        name: '工程效能',
                        link: 'http://github.com/',
                    },
                    comment: {
                        name: '留言',
                        link: 'http://github.com/',
                    },
                    template: '在 @{project} 发布了 @{comment}',
                },
                {
                    id: 'trend-6',
                    updatedAt: new Date(),
                    user: {
                        name: '乐哥',
                    },
                    group: {
                        name: '程序员日常',
                        link: 'http://github.com/',
                    },
                    project: {
                        name: '品牌迭代',
                        link: 'http://github.com/',
                    },
                    template: '在 @{group} 新建项目 @{project}',
                },
                {
                    id: 'trend-7',
                    updatedAt: new Date(),
                    user: {
                        name: '肖哥',
                    },
                    group: {
                        name: '程序员日常',
                        link: 'http://github.com/',
                    },
                    project: {
                        name: '项目迭代',
                        link: 'http://github.com/',
                    },
                    template: '在 @{group} 新建项目 @{project}',
                },
                {
                    id: 'trend-8',
                    updatedAt: new Date(),
                    user: {
                        name: '陆哥',
                    },
                    group: {
                        name: '程序员日常',
                        link: 'http://github.com/',
                    },
                    project: {
                        name: '项目迭代',
                        link: 'http://github.com/',
                    },
                    template: '在 @{group} 新建项目 @{project}',
                }
            ],
        }
    }

    componentDidMount() {
        this.getNewReportNotify();
    }

    getNewReportNotify() {
        const { dispatch } = this.props;
        dispatch({
            type: 'userseting/fetchNewReportNotify',
        });
    }


    render() {
        const { loading, newNotify } = this.props;
        const { dotPosition,list } = this.state;

        // const loadMore =
        //   list.length > 0 ? (
        //     <div style={{ textAlign: 'center' }}>
        //       <Button onClick={this.fetchMore} style={{ paddingLeft: 48, paddingRight: 48, border: "none" }}>
        //         {loading ? (
        //           <span>
        //             <Icon type="loading" /> 加载中...
        //           </span>
        //         ) : (
        //             '加载更多'
        //           )}
        //       </Button>
        //     </div>
        //   ) : null;


        console.log(newNotify,list)
        return (
            <Card
                loading={loading}
                bordered={false}
            //style={{ background: '#ccc', height: 300 }}
            >
                {/* <Carousel
                    dotPosition={dotPosition}
                    autoplay
                    dots={false}
                    // className={styles.Carousel} 
                    style={{ background: '#B03060', minHeight: 200 }}
                    effect="scrolly"
                >
                    <div style={{ height: 200 }}>
                        <div style={{ height: 200, background: "#ccc" }}>
                            <h3>123456789</h3>
                        </div>

                    </div>
                    <div style={{ height: 200 }}>
                        <div style={{ height: 200, background: "#ccc" }}>
                            <h3 >23456789</h3>
                        </div>
                    </div>
                    <div style={{ height: 200 }}>
                        <div style={{ height: 200, background: "#ccc" }}>
                            <h3 >3456789</h3>
                        </div>
                    </div>
                    <div style={{ height: 200 }}>
                        <div style={{ height: 200, background: "#ccc" }}>
                            <h3 >456789</h3>
                        </div>
                    </div>   
                </Carousel> 
                
                 axes={ScrollAxes.Y} fastTrack={FastTrack.PAGING}
                
                */}



            </Card >
        )
    }
}

export default Dynamic;