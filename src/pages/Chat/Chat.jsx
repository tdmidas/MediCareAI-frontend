import React, { useState, useEffect } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import LoginRequired from '../LoginRequired/LoginRequired';
import { auth } from '../../firebaseConfig';
import { Link } from "react-router-dom";
import "./Chat.css";
import { Flex, Typography, Image, Card, Pagination, Button } from "antd";
import MainContentLayout from "../../layout/MainContentLayout";
import chatbotData from '../../data/chat';
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';
import slug from 'slug';
const Chat = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const handleClick = (destination) => {
        if (destination === 'healthCheck') {
            navigate('/suckhoe');
        } else if (destination === 'support') {
            navigate('/chat');
        }
    };
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <DefaultLayout>
            {isLoggedIn ? (
                <>

                    <Flex gap="large" >
                        <MainContentLayout>
                            <Flex gap="large" wrap="wrap">
                                <Card className="banner-card" style={{ marginTop: 20, marginBottom: 20, padding: "20px", backgroundColor: "#069390", width: isMobile ? 300 : 800, height: isMobile ? 400 : 180 }} cover={
                                    <Image style={{
                                        float: isMobile ? "none" : "right", width: isMobile ? "100%" : "40%", objectFit: "cover", height: 260, marginTop: "-100px"
                                    }}
                                        src='https://d1xjlj96to6zqh.cloudfront.net/chat-3.png'>

                                    </Image>
                                }>
                                    <Flex vertical gap="30px"   >
                                        <Flex vertical aligh="flex-start">
                                            <Typography.Title level={4} strong style={{ color: "white" }}>
                                                Bạn có câu hỏi nào cho bác sĩ không?
                                            </Typography.Title>

                                        </Flex>
                                        <Flex gap="large" wrap="wrap">
                                            <Link to="/chat/bac-si-noi-khoa">
                                                <Button className="banner-btn" size="large" onClick={() => handleClick('support')}>
                                                    Cần hỗ trợ
                                                </Button>
                                            </Link>
                                        </Flex>


                                    </Flex>
                                </Card>
                            </Flex>
                            <Flex align="center" justify="space-between" >
                                <Typography.Title level={3} strong>
                                    Bác sĩ AI đề cử
                                </Typography.Title>
                            </Flex>

                            <Flex wrap="wrap" align="center" gap="large">

                                {chatbotData.map((chatbot, index) => (
                                    <Link to={`/chat/${slug(chatbot.name)}`} key={index}>
                                        <Card
                                            key={index}
                                            className="chat-card"
                                            hoverable
                                            cover={
                                                <Image
                                                    preview={false}
                                                    alt="chatbot avatar"
                                                    src={chatbot.picture}
                                                    style={{ display: "block", height: "250px", maxWidth: "100%", objectFit: "cover", borderRadius: 120, backgroundColor: "#ccfefd" }}
                                                />
                                            }
                                            style={{ flex: "0 1 300px", height: "450px", width: "310px", padding: "20px", marginBottom: "20px" }}
                                        >
                                            <Flex >
                                                <Flex vertical aligh="center" >
                                                    <Typography.Title level={3} strong>
                                                        {chatbot.name}
                                                    </Typography.Title>
                                                    <Typography.Text type="secondary" >
                                                        {chatbot.description}
                                                    </Typography.Text>



                                                </Flex>
                                            </Flex>
                                        </Card>
                                    </Link>))

                                }
                            </Flex>
                            <Flex justify="center">
                                <Pagination className="blog-pagination" defaultCurrent={1} total={1} style={{ marginBottom: 30 }} />
                            </Flex>

                        </MainContentLayout>
                    </Flex>
                </>
            ) : (
                <LoginRequired /> // Render LoginRequired component for users not logged in
            )}
        </DefaultLayout>
    );
}

export default Chat;
