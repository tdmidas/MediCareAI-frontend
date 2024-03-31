import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Input, Button, Typography, Avatar, Flex, Card, Spin } from "antd";
import chatbotData from "../../data/chat";
import "./ChatDetail.css";
import defaultAvatar from "../../assets/patient-avatar.png";
import DefaultLayout from "../../layout/DefaultLayout";
import MainContentLayout from "../../layout/MainContentLayout";
import { useMediaQuery } from 'react-responsive';
import { SendOutlined } from '@ant-design/icons';
import { LoadingOutlined } from '@ant-design/icons';
const { TextArea } = Input;
const { Text } = Typography;

const ChatDetail = () => {
    const { slug } = useParams();
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [chatbot, setChatbot] = useState(null);
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const getFormattedName = (slug) => {
        switch (slug) {
            case "bac-si-tim-mach":
                return "Bác sĩ tim mạch";
            case "bac-si-noi-khoa":
                return "Bác sĩ nội khoa";
            case "bac-si-noi-tiet":
                return "Bác sĩ nội tiết";
            case "bac-si-dinh-duong":
                return "Bác sĩ dinh dưỡng";
            default:
                return slug; // Return slug as is if no match found
        }
    };
    useEffect(() => {
        const bot = chatbotData.find((chatbot) => chatbot.name === getFormattedName(slug));
        setChatbot(bot);
        setMessages([{ sender: bot.name, content: "Xin chào, bạn cần hỗ trợ gì về sức khỏe ạ? Hãy chia sẻ thêm thông tin để mình có thể hỗ trợ bạn tốt hơn nhé." }]);
    }, [slug]);

    const sendMessage = async () => {
        if (!userInput.trim()) return;

        const updatedMessages = [...messages, { sender: "User", content: userInput }];
        setMessages(updatedMessages);
        setUserInput("");

        setLoading(true); // Set loading to true when sending message

        try {
            const botResponse = await getBotResponse(userInput);
            const updatedMessagesWithBot = [...updatedMessages, { sender: chatbot.name, content: botResponse }];
            setMessages(updatedMessagesWithBot);
        } catch (error) {
            console.error("Error fetching bot response:", error);
            const errorMessage = "Xin lỗi bạn, tôi đang gặp chút sự cố.";
            const updatedMessagesWithError = [...updatedMessages, { sender: chatbot.name, content: errorMessage }];
            setMessages(updatedMessagesWithError);
        }

        setLoading(false); // Set loading to false after receiving response
    };

    const getBotResponse = async (userInput) => {
        const endpoint = "https://api.openai.com/v1/chat/completions";
        const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
        const requestData = {
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userInput }],
            temperature: 0.7,
        };

        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify(requestData),
        });

        const data = await response.json();
        return data.choices[0].message.content;
    };

    if (!chatbot) {
        return null; // Render nothing until chatbot data is loaded
    }

    return (
        <DefaultLayout>
            <MainContentLayout>
                <Flex vertical align="center" gap="large" wrap="wrap" justify="center">
                    <Card id="chat-container" className="chat-container" style={{ width: isMobile ? 300 : 800, height: 600 }}>
                        {loading ? ( // Conditionally render loading indicator
                            <div style={{ textAlign: "center", marginTop: 20 }}>
                                <Spin size="large"
                                    indicator={
                                        <LoadingOutlined
                                            style={{
                                                fontSize: 24,
                                            }}
                                            spin
                                        />
                                    }
                                />
                                <Text type="secondary">Waiting for response...</Text>
                            </div>
                        ) : (
                            messages.map((message, index) => (
                                <div key={index} className={`message ${message.sender.toLowerCase()}`}>
                                    <Avatar src={message.sender === chatbot.name ? chatbot.picture : defaultAvatar} style={{ marginBottom: 20 }} />
                                    <div className="message-content">
                                        <Flex vertical gap="small">
                                            <Text strong>{message.sender}:</Text>
                                            <div className="message-bubble" style={{
                                                backgroundColor: message.sender === chatbot.name ? "#069390" : "white", borderRadius: 30, padding: 20,
                                            }}>
                                                <Text color="white" style={{ color: message.sender === chatbot.name ? "white" : "black" }}>{message.content}</Text>
                                            </div>
                                        </Flex>
                                    </div>
                                </div>
                            ))
                        )}
                    </Card>
                    <Flex className="input-container" justify="center" gap={10} wrap="wrap">
                        <TextArea
                            rows={3}
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            wrap="wrap"
                            style={{ width: isMobile ? 300 : 750, borderRadius: 50, marginBottom: 20, height: 50, overflow: "hidden" }}
                            placeholder="Nhập tin nhắn của bạn..."
                            onPressEnter={sendMessage}
                            className="textarea-container"
                        >

                        </TextArea>
                        <Button className="send-btn" type="primary" icon={<SendOutlined />} onClick={sendMessage} />

                    </Flex>
                </Flex>
            </MainContentLayout>
        </DefaultLayout>
    );
};

export default ChatDetail;
