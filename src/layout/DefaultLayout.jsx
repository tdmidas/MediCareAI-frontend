import React, { useState } from "react";
import { Layout, Button, Drawer, Menu } from "antd";
import { MenuFoldOutlined } from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";
import Sidebar from "../components/Sidebar/Sidebar";
import CustomHeader from "../components/Header/CustomHeader";
import "./DefaultLayout.css";

const { Header, Sider, Content } = Layout;

const DefaultLayout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const isMobile = useMediaQuery({ maxWidth: 768 });

    const toggleDrawer = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Layout style={{ maxHeight: "100vh", overflowY: "scroll", overflowX: "hidden" }}>
            {isMobile ? (
                <Drawer
                    placement="left"
                    closable={false}
                    onClose={toggleDrawer}
                    open={collapsed}

                    width={200}
                >
                    <Sidebar />
                </Drawer>
            ) : (
                <Sider
                    theme="light"
                    className="sider"
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                >
                    <Sidebar />
                    <Button
                        type="text"
                        icon={<MenuFoldOutlined />}
                        onClick={toggleDrawer}
                        className="trigger-btn"
                    />
                </Sider>
            )}
            <Layout>
                <Header className="header">
                    <CustomHeader toggleDrawer={toggleDrawer} />
                </Header>
                <Content className="content">{children}</Content>
            </Layout>
        </Layout>
    );
};

export default DefaultLayout;
