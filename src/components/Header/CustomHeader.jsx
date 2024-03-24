import React, { useState, useEffect } from 'react';
import { Flex, Typography, Badge } from 'antd';
import { Button } from 'antd';
import { Input } from 'antd';
import './CustomHeader.css';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebaseConfig';
import { Menu, Dropdown } from 'antd';
import { BellOutlined } from '@ant-design/icons';
const { Search } = Input;
const { Title } = Typography;

const CustomHeader = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {

        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleLogout = async () => {
        try {
            await auth.signOut();
            navigate('/');
        } catch (error) {
            console.error("Logout Error:", error.message);
        }
    };

    const menu = (
        <Menu>
            <Menu.Item key="profile">
                Cài đặt tài khoản
            </Menu.Item>
            <Menu.Item key="logout" onClick={handleLogout}>
                Đăng xuất
            </Menu.Item>

        </Menu>
    );
    const notifications = [
        {
            id: 1,
            text: 'Notification 1',
            link: '/notification-1',
        },
        {
            id: 2,
            text: 'Notification 2',
            link: '/notification-2',
        },
        // Add more notifications as needed
    ];

    const notificationMenu = (
        <Menu>
            {notifications.map(notification => (
                <Menu.Item key={notification.id}>
                    <a href={notification.link}>{notification.text}</a>
                </Menu.Item>
            ))}
        </Menu>
    );
    return (
        <Flex align="center" justify="space-between">
            <Title className="welcome-title" level={4}>Great to see you</Title>
            <Flex align="center" gap="20rem">
                <Search className="search-btn" placeholder="Tìm kiếm bác sĩ, blog,..." allowClear />
                <Flex align="center" gap="10px">
                    <Dropdown overlay={notificationMenu} trigger={['click']}>
                        <Badge count={notifications.length} dot>
                            <BellOutlined style={{ fontSize: '20px' }} />
                        </Badge>
                    </Dropdown>

                    {user ? (
                        <Dropdown overlay={menu}>
                            <img src={user.photoURL} alt="Profile" className="profile-photo" style={{ borderRadius: 30, width: 80, height: 40 }} />
                        </Dropdown>
                    ) : (
                        <Button type="primary" className='login-btn' onClick={handleLoginClick}>Đăng nhập</Button>
                    )}
                </Flex>
            </Flex>
        </Flex>
    );
};

export default CustomHeader;
