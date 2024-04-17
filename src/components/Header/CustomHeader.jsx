import React, { useState, useEffect } from 'react';
import { Flex, Badge, Avatar, Typography } from 'antd';
import { Button } from 'antd';
import { Input } from 'antd';
import './CustomHeader.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth, db } from '../../firebaseConfig';
import { Menu, Dropdown } from 'antd';
import { BellOutlined, SearchOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { MenuFoldOutlined } from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";
import { doc, setDoc, collection, getDoc } from "firebase/firestore";
const fallbackAvatar = require("../../assets/fallback-avatar.jpg")
const { Text } = Typography;
const CustomHeader = ({ toggleDrawer, submitHandler }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(null);
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const isSmallScreen = useMediaQuery({ maxWidth: 1024 });
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            const userId = localStorage.getItem('userId');

            if (user || userId) {
                setUser(user);
                const userDocRef = doc(collection(db, 'users'), userId);
                const userDocSnapshot = await getDoc(userDocRef);
                if (userDocSnapshot.exists()) {
                    await setDoc(userDocRef, { lastLogin: new Date() }, { merge: true });
                    setUser(userDocSnapshot.data());
                    console.log("user", user);

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
            setUser(null);
            await auth.signOut();
            localStorage.clear();
            navigate('/');
        } catch (error) {
            console.error("Logout Error:", error.message);
        }
    };

    const handleMenuClick = (event) => {
        if (event.key === 'profile') {
            navigate('/profile');
        }
        else if (event.key === 'my-post') {
            navigate('/me/blog');
        }
        else if (event.key === 'my-appointment') {
            navigate('/me/appointment');

        } else if (event.key === 'logout') {
            handleLogout();
        }
    };

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="userProfile" disabled>
                <Flex>
                    <Avatar src={user?.photoURL || fallbackAvatar} size={50} />
                    <Flex vertical>
                        <Text style={{ marginLeft: '10px', fontWeight: 500 }}>{user?.displayName || "user"}</Text>
                        <Text style={{ marginLeft: '10px' }}>{user?.email || "email"}</Text>
                    </Flex>
                </Flex>
            </Menu.Item>
            <Menu.Divider />

            <Menu.Item key="my-appointment" >
                Lịch khám của tôi
            </Menu.Item>
            <Menu.Item key="my-post" >
                Bài viết của tôi
            </Menu.Item>
            <Menu.Divider />

            <Menu.Item key="profile" >
                Cài đặt tài khoản
            </Menu.Item>
            <Menu.Item key="logout" >
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

    const handleGoBack = () => {
        navigate(-1); // Go back to previous page
    };

    return (
        <Flex align="center" >
            <Flex align="center" gap={isSmallScreen ? "1rem" : "14rem"}>
                {isMobile && (
                    <Button
                        type="text"
                        icon={<MenuFoldOutlined />}
                        onClick={toggleDrawer}
                        className="drawer-toggle-btn"
                    />
                )}

                {!isMobile && ( // Check if not home page
                    <Button
                        type="text"
                        icon={<ArrowLeftOutlined />}
                        onClick={handleGoBack}

                    >
                        Quay lại
                    </Button>
                )}
                <Input placeholder="Tìm kiếm bác sĩ, blog,..." prefix={<SearchOutlined />} style={{ borderRadius: 30, minWidth: 150, marginLeft: isSmallScreen ? 0 : 300 }} />
                <Flex align="center" gap="10px" style={{ marginLeft: 'auto' }}>
                    {user ? (
                        <>
                            {location.pathname === '/blog/write' ? (
                                <Button type="primary" onClick={submitHandler}>Xuất bản</Button>
                            ) : (
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
                            )}
                        </>
                    ) : (
                        <Button type="primary" className='login-btn' onClick={handleLoginClick}>Đăng nhập</Button>
                    )}
                </Flex>

            </Flex >
        </Flex >
    );
};

export default CustomHeader;
