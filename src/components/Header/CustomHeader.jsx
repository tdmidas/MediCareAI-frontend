import React, { useState, useEffect } from 'react';
import { Flex, Badge, Typography, Image } from 'antd';
import { Button } from 'antd';
import { Input } from 'antd';
import './CustomHeader.css';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebaseConfig';
import { Menu, Dropdown } from 'antd';
import { BellOutlined, SearchOutlined } from '@ant-design/icons';
import { MenuFoldOutlined } from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";
import { doc, setDoc, collection, getDoc } from "firebase/firestore";

const fallbackAvatar = require("../../assets/fallback-avatar.jpg")
const CustomHeader = ({ toggleDrawer }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const isSmallScreen = useMediaQuery({ maxWidth: 1024 });

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                setUser(user);

                const userDocRef = doc(collection(db, 'users'), user.email);
                const userDocSnapshot = await getDoc(userDocRef);
                if (userDocSnapshot.exists()) {
                    await setDoc(userDocRef, { lastLogin: new Date() }, { merge: true });
                    setUser(user);

                }

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
        <Flex align="center" >
            <Flex align="center" gap={isSmallScreen ? "1rem" : "38rem"}>
                {isMobile && (
                    <Button
                        type="text"
                        icon={<MenuFoldOutlined />}
                        onClick={toggleDrawer}
                        className="drawer-toggle-btn"
                    />

                )}
                <Input placeholder="Tìm kiếm bác sĩ, blog,..." prefix={<SearchOutlined />} style={{ borderRadius: 30, minWidth: 150, marginLeft: isSmallScreen ? 0 : 300 }} />

                <Flex align="center" gap="10px">
                    {user ? (
                        <>
                            <Dropdown overlay={notificationMenu} trigger={['click']}>
                                <Badge count={notifications.length} dot>
                                    <BellOutlined style={{ fontSize: '20px' }} />
                                </Badge>
                            </Dropdown>
                            <Dropdown overlay={menu}>
                                <img src={user.photoURL ? user.photoURL : fallbackAvatar} alt="Profile" className="profile-photo" style={{ borderRadius: 30, width: 90, height: 35, marginRight: 10 }} />
                            </Dropdown>
                        </>
                    ) : (
                        <Button type="primary" className='login-btn' onClick={handleLoginClick}>Đăng nhập</Button>
                    )}
                </Flex>
            </Flex>
        </Flex>
    );
};

export default CustomHeader;
