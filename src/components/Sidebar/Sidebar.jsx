import { Flex, Menu, Image, Typography, Dropdown } from 'antd';
import { React, useState, useEffect } from 'react';
import { FaRegHeart } from "react-icons/fa6";
import { LuNewspaper } from "react-icons/lu";
import { FaRegCalendarAlt } from "react-icons/fa";
import { RiHome6Line, RiNurseLine } from "react-icons/ri";
import { IoChatbubbleOutline } from "react-icons/io5";
import { NavLink, useLocation } from 'react-router-dom';
import { FaRegPenToSquare } from "react-icons/fa6";

import './Sidebar.css';
const logo = require("../../assets/logo-3.png")
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
            case '/blog/write':
                return '6';
            case '/blog':
                return '7';
            default:
                return '1';
        }
    }

    return (

        <>
            <Flex justify="center">
                <div className="logo">
                    <Image preview={false} src={logo} style={{
                        width: "60px", height: "60px"
                    }} />
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
                    <FaRegPenToSquare />
                    <NavLink to="/blog/write" className="nav-text">
                        Viết Blog
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="7">
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