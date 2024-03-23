import { Flex, Menu } from 'antd';
import { React, useState, useEffect } from 'react';
import { FaHandHoldingMedical, FaRegHeart } from "react-icons/fa6";
import { LuNewspaper } from "react-icons/lu";
import { FaRegCalendarAlt } from "react-icons/fa";
import { RiHome6Line } from "react-icons/ri";
import { IoPersonOutline, IoChatbubbleOutline } from "react-icons/io5";
import { NavLink, useLocation } from 'react-router-dom';
import './Sidebar.css';
const Sidebar = () => {
    const location = useLocation();
    const [isCollapsed, setIsCollapsed] = useState(false);
    useEffect(() => {
        setIsCollapsed(false); // Reset collapse state when navigating to a new page
    }, [location, setIsCollapsed]);

    const getActiveTabKey = () => {
        switch (location.pathname) {
            case '/':
                return '1';
            case '/suckhoe':
                return '2';
            case '/lichkham':
                return '3';
            case '/chat':
                return '4';
            case '/blog':
                return '5';
            case '/profile':
                return '6';
            default:
                return '1'; // Default to 'Trang chủ'
        }
    }
    return (
        <>
            <Flex align="center" justify="center">
                <div className="logo">
                    <FaHandHoldingMedical />
                </div>
            </Flex>
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
                    <IoChatbubbleOutline />
                    <NavLink to="/chat" className="nav-text">
                        Chat
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="5">
                    <LuNewspaper />
                    <NavLink to="/blog" className="nav-text">
                        Blog
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="6">
                    <IoPersonOutline />
                    <NavLink to="/profile" className="nav-text">
                        Cá nhân
                    </NavLink>
                </Menu.Item>
            </Menu>
        </>
    );
}

export default Sidebar;