import { Flex, Menu, Image, Typography } from 'antd';
import { React, useState, useEffect } from 'react';
import { FaRegHeart } from "react-icons/fa6";
import { LuNewspaper } from "react-icons/lu";
import { FaRegCalendarAlt } from "react-icons/fa";
import { RiHome6Line, RiNurseLine } from "react-icons/ri";
import { IoChatbubbleOutline } from "react-icons/io5";
import { NavLink, useLocation } from 'react-router-dom';
import './Sidebar.css';
const logo = require("../../assets/logo-final.png")
const Sidebar = () => {
    const location = useLocation();
    const [isCollapsed, setIsCollapsed] = useState(false);



    const getActiveTabKey = () => {
        switch (location.pathname) {
            case '/':
                return '1';
            case '/suckhoe':
                return '2';
            case '/lichkham':
                return '3';
            case '/doctors':
                return '4';
            case '/chat':
                return '5';
            case '/blog':
                return '6';

            default:
                return '1';
        }
    }
    return (
        <>
            <Flex justify="center">
                <div className="logo">
                    <Image src={logo} style={{
                        width: "30px", height: "25px"
                    }} />

                    <Typography.Title level={4} strong style={{ color: "#036e6c", textAlign: "center", marginLeft: 10, display: isCollapsed ? "none" : "none" }}>MediCareAI</Typography.Title>
                </div>

            </Flex >
            <Menu mode="inline" defaultSelectedKeys={[getActiveTabKey()]} className="menu-bar" inlineCollapsed={isCollapsed} >
                <Menu.Item key="1">
                    <RiHome6Line />
                    <NavLink to="/" className="nav-text">
                        Trang chủ
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="2">
                    <FaRegHeart />
                    <NavLink to="/suckhoe" className="nav-text">
                        Sức khỏe
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="3">
                    <FaRegCalendarAlt />
                    <NavLink to="/lichkham" className="nav-text">
                        Lịch khám
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="4">
                    <RiNurseLine />
                    <NavLink to="/doctors" className="nav-text">
                        Bác sĩ
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="5">
                    <IoChatbubbleOutline />
                    <NavLink to="/chat" className="nav-text">
                        Chat
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="6">
                    <LuNewspaper />
                    <NavLink to="/blog" className="nav-text">
                        Blog
                    </NavLink>
                </Menu.Item>

            </Menu>
        </>
    );
}

export default Sidebar;