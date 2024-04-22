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
const { Text, Title } = Typography;
const logo = require('../../assets/logo.png');
const CustomHeader = ({ toggleDrawer, submitHandler }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(null);
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const isSmallScreen = useMediaQuery({ maxWidth: 1024 });
    const [healthNotifications, setHealthNotifications] = useState([]);



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
    useEffect(() => {
        const fetchHealthData = async () => {
            try {
                const userId = localStorage.getItem('userId');
                const responses = await Promise.all([
                    fetch(`https://medicareai-backend.onrender.com/api/health/bmi/${userId}`),
                    fetch(`https://medicareai-backend.onrender.com/api/health/glucose/${userId}`),
                    fetch(`https://medicareai-backend.onrender.com/api/health/bloodPressure/${userId}`),
                ]);

                const notifications = [];

                for (let i = 0; i < responses.length; i++) {
                    if (responses[i].status === 200) {
                        // If successful response, do nothing
                    } else if (responses[i].status === 404) {
                        let text = '';
                        switch (i) {
                            case 0:
                                text = "Bạn có chỉ số BMI chưa kiểm tra";
                                break;
                            case 1:
                                text = "Bạn có chỉ số đường huyết chưa kiểm tra";
                                break;
                            case 2:
                                text = "Bạn có chỉ số huyết áp chưa kiểm tra";
                                break;
                            default:
                                text = `Bạn cần kiểm tra chỉ số sức khỏe ${i + 1}`;
                                break;
                        }
                        notifications.push({
                            id: `health-${i + 1}`,
                            text: text,
                            link: `/suckhoe/${i === 0 ? 'chi-so-bmi' : i === 1 ? 'duong-huyet' : 'huyet-ap'}`,
                        });
                    } else {
                        console.error(`Error fetching health data: ${responses[i].status}`);
                    }
                }

                setHealthNotifications(notifications);
            } catch (error) {
                console.error("Error fetching health data:", error);
            }
        };

        fetchHealthData();
    }, []);

    const notifications = [

    ];
    const combinedNotifications = [...notifications, ...healthNotifications];

    const handleLoginClick = () => {
        navigate('/login');
    };

    const markAllAsRead = () => {
        setHealthNotifications([]);
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
    const photoURL = localStorage.getItem('photoURL');
    const displayName = localStorage.getItem('displayName');
    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="userProfile" disabled>
                <Flex>
                    <Avatar src={photoURL || fallbackAvatar} size={50} />
                    <Flex vertical>
                        <Text style={{ marginLeft: '10px', fontWeight: 500 }}>{displayName || "user"}</Text>
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


    const notificationMenu = (
        <Menu style={{ overflowY: "scroll" }}>
            <Flex justify='left'>
                <Title level={5} strong style={{ padding: '10px' }}>Thông báo sức khỏe</Title>
                <Button type="link" className='mark-read' style={{ color: "#069390", padding: '10px', marginLeft: 40 }} onClick={markAllAsRead}>Đánh dấu đã đọc</Button>
            </Flex>
            {combinedNotifications.map(notification => (
                <Menu.Item key={notification.id} style={{ backgroundColor: "#d9f2f2", borderRadius: 20, marginBottom: 10 }} >
                    <Flex justify='left'>
                        <Avatar src={logo} size={50} />
                        <a href={notification.link} style={{ padding: 10, color: "black" }}>{notification.text}</a>
                    </Flex>
                </Menu.Item>
            ))}
        </Menu>
    );

    const handleGoBack = () => {
        navigate(-1);
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

                {!isMobile && (
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
                                        <Badge count={healthNotifications.length} dot>
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
