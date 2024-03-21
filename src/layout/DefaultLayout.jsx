import { React, useState } from "react";
import { Button, Layout } from "antd";
import Sidebar from "../components/Sidebar/Sidebar";
import { MenuFoldOutlined } from "@ant-design/icons";
import CustomHeader from "../components/Header/CustomHeader";
import CustomFooter from "../components/Footer/Footer";
import "./DefaultLayout.css";
const { Header, Footer, Sider, Content } = Layout;
const DefaultLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Layout>
            <Sider theme="light" className="sider" trigger={null} collapsible collapsed={collapsed}>
                <Sidebar />
                <Button type="text" icon={collapsed ? <MenuFoldOutlined /> : <MenuFoldOutlined />} onClick={() => setCollapsed(!collapsed)} className="trigger-btn" />
            </Sider>
            <Layout>
                <Header className="header">
                    <CustomHeader />
                </Header>
                <Content className="content"></Content>
                <Footer className="footer">
                    <CustomFooter />

                </Footer>
            </Layout>
        </Layout>
    );
};

export default DefaultLayout;