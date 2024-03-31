import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Input, Button, Typography, Avatar, Flex, Card, Spin } from "antd";
import chatbotData from "../../data/chat";
import "./ChatDetail.css";
import defaultAvatar from "../../assets/patient-avatar.png";
import DefaultLayout from "../../layout/DefaultLayout";
import MainContentLayout from "../../layout/MainContentLayout";
import { useMediaQuery } from 'react-responsive';

const { TextArea } = Input;
const { Text } = Typography;

const ChatDetail = () => {
    const { slug } = useParams();
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState("");
    const [loading, setLoading] = useState(false);
    const chatbot = chatbotData.find((chatbot) => chatbot.name === slug);
    const isMobile = useMediaQuery({ maxWidth: 768 });

    const sendMessage = async () => {
        if (!userInput.trim()) return;

        const updatedMessages = [...messages, { sender: "User", content: userInput }];
        setMessages(updatedMessages);
        setUserInput("");

        setLoading(true); // Set loading to true when sending message

        try {
            const botResponse = await getBotResponse(userInput);
            const updatedMessagesWithBot = [...updatedMessages, { sender: "Bot", content: botResponse }];
            setMessages(updatedMessagesWithBot);
        } catch (error) {
            console.error("Error fetching bot response:", error);
            const errorMessage = "Sorry, I encountered an error.";
            const updatedMessagesWithError = [...updatedMessages, { sender: "Bot", content: errorMessage }];
            setMessages(updatedMessagesWithError);
        }

        setLoading(false); // Set loading to false after receiving response
    };

    const getBotResponse = async (userInput) => {
        const endpoint = "https://api.openai.com/v1/chat/completions";
        const apiKey = "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";
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

    return (
        <DefaultLayout>
            <MainContentLayout>
                <Flex vertical align="center" gap="large" wrap="wrap" justify="center">
                    <Card id="chat-container" className="chat-container" style={{ width: isMobile ? 300 : 800, height: 600 }}>
                        {loading ? ( // Conditionally render loading indicator
                            <div style={{ textAlign: "center", marginTop: 20 }}>
                                <Spin size="large" />
                                <Text type="secondary">Waiting for response...</Text>
                            </div>
                        ) : (
                            messages.map((message, index) => (
                                <div key={index} className={`message ${message.sender.toLowerCase()}`}>
                                    <Avatar src={message.sender === "Bot" ? chatbot.picture : defaultAvatar} />
                                    <div className="message-content">
                                        <Text strong>{message.sender}:</Text> <Text>{message.content}</Text>
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
                            style={{ width: isMobile ? 300 : 800, borderRadius: 50, marginBottom: 20, height: 50 }}
                            placeholder="Type your message..."
                        />
                        <Button type="primary" onClick={sendMessage}>
                            Send
                        </Button>
                    </Flex>
                </Flex>
            </MainContentLayout>
        </DefaultLayout>
    );
};

export default ChatDetail;
