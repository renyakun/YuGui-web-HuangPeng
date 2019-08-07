import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Button, Card, Form, Input, Menu, Select, Tabs } from 'antd';
import React, { PureComponent } from 'react';
import AdminInfo from "./AdminInfo";
import AddAdmin from "./AddAdmin";
import Security from "./Security";

const { TabPane } = Tabs;




class Info extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            power: true,
        }
    }

    render() {

        return (
            <Card style={{ marginTop: 24 }}>
                <Tabs tabPosition='left' style={{ minHeight: 150 }}>
                    <TabPane tab="管理员信息" key="1">
                        <AdminInfo />
                    </TabPane>
                    <TabPane tab="安全设置" key="3">
                        <Security />
                    </TabPane>
                    {this.state.power ? (
                        <TabPane tab="添加管理员" key="2">
                            <AddAdmin />
                        </TabPane>
                    ) : null}

                </Tabs>
            </Card>
        )
    }
}

export default Info;
