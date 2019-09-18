import React, { PureComponent } from 'react';
import { BackTop, Button, Card, Carousel, Col, Icon, List, Row, Tooltip } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import styles from './styles.less';
import InfiniteScroll from 'react-infinite-scroller';

const ListItem = List.Item;
const ListItemMeta = List.Item.Meta;

@connect(({ userseting: { newNotify }, loading }) => ({
    newNotify,
    loading: loading.models.userseting,
}))
class Dynamic extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            //dotPosition: 'right',
            list: [],
            loadings: false,
            hasMore: true,
        }
    }

    componentDidMount() {
        this.getNewReportNotify();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.newNotify != this.props.newNotify) {
            this.setState({
                list: nextProps.newNotify,
            });
        }
    }

    getNewReportNotify() {
        const { dispatch } = this.props;
        dispatch({
            type: 'userseting/fetchNewReportNotify',
        });
    }

    //      <Carousel
    //     dotPosition={dotPosition}
    //     autoplay
    //     dots={false}
    //     // className={styles.Carousel} 
    //     style={{ background: '#B03060', minHeight: 200 }}
    //     effect="scrolly"
    // >
    //     <div style={{ height: 200 }}>
    //         <div style={{ height: 200, background: "#ccc" }}>
    //             <h3>123456789</h3>
    //         </div>

    //     </div>
    //     <div style={{ height: 200 }}>
    //         <div style={{ height: 200, background: "#ccc" }}>
    //             <h3 >23456789</h3>
    //         </div>
    //     </div>
    //     <div style={{ height: 200 }}>
    //         <div style={{ height: 200, background: "#ccc" }}>
    //             <h3 >3456789</h3>
    //         </div>
    //     </div>
    //     <div style={{ height: 200 }}>
    //         <div style={{ height: 200, background: "#ccc" }}>
    //             <h3 >456789</h3>
    //         </div>
    //     </div>
    // </Carousel>               

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

    render() {
        const { loading, newNotify } = this.props;
        const { dotPosition, list, loadings, hasMore } = this.state;
        return (
            <Card loading={loading} bordered={false} >
                <div style={{ overflow: 'auto', padding: '8px 24px', height: 300 }}>
                    <InfiniteScroll
                        initialLoad={false}
                        pageStart={0}
                        //hasMore={!loadings && hasMore}
                        useWindow={false}
                    >
                        <List
                            dataSource={list}
                            renderItem={item => (
                                <ListItem key={item.id}>
                                    <ListItemMeta
                                        title={
                                            <span>
                                                <span>{
                                                    item.message.split(/@\{([^{}]*)\}/gi).map(key => {
                                                        if (item[key]) {
                                                            return (<b style={{ color: 'dodgerblue' }}>{item[key]}</b>)
                                                        }
                                                        return (<span style={{ marginLeft: 5, marginRight: 5 }}>{key}</span>);
                                                    })
                                                }</span>
                                            </span>
                                        }
                                        description={
                                            <span>
                                                <span className={styles.datetime} title={item.operationTime}>
                                                    <i>{item.operationTime.slice(0, 16).replace('T', ' ')}</i>
                                                </span>
                                            </span>
                                        }
                                    />
                                </ListItem>
                            )}
                        ></List>
                    </InfiniteScroll>
                </div>

            </Card >
        )
    }
}

export default Dynamic;