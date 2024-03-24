import { React, useState } from "react";
import { Button, Layout } from "antd";
import Sidebar from "../components/Sidebar/Sidebar";
import { MenuFoldOutlined } from "@ant-design/icons";
import CustomHeader from "../components/Header/CustomHeader";

import "./DefaultLayout.css";
const { Header, Sider, Content } = Layout;
const DefaultLayout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Layout style={{ maxHeight: "100vh", overflowY: "scroll" }} >

            <Sider theme="light" className="sider" trigger={null} collapsible collapsed={collapsed} >
                <Sidebar />
                <Button type="text" icon={collapsed ? <MenuFoldOutlined /> : <MenuFoldOutlined />} onClick={() => setCollapsed(!collapsed)} className="trigger-btn" />
            </Sider>
            <Layout >
                <Header className="header">
                    <CustomHeader />
                </Header>
                <Content className="content"  >
                    {children}

                </Content>

            </Layout>

        </Layout>
    );
};

export default DefaultLayout;
