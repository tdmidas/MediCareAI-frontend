import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Input, Button, Typography, Avatar, Flex, Card, Spin, message } from "antd";
import chatbotData from "../../data/chat";
import "./ChatDetail.css";
import DefaultLayout from "../../layout/DefaultLayout";
import MainContentLayout from "../../layout/MainContentLayout";
import { useMediaQuery } from 'react-responsive';
import { UploadOutlined, AudioOutlined, SendOutlined } from '@ant-design/icons';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import BouncingDotsLoader from "../../components/BouncingDot/BouncingDot";
const { TextArea } = Input;
const { Text } = Typography;

const ChatDetail = () => {
    const { transcript, resetTranscript, listening } = useSpeechRecognition();

    const { slug } = useParams();
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [chatbot, setChatbot] = useState(null);
    const isMobile = useMediaQuery({ maxWidth: 768 });

    useEffect(() => {
        const bot = chatbotData.find((chatbot) => chatbot.name === getFormattedName(slug));
        setChatbot(bot);
        setMessages([{ sender: bot.name, content: "Xin chào, bạn cần hỗ trợ gì về sức khỏe ạ? Hãy chia sẻ thêm thông tin để mình có thể hỗ trợ bạn tốt hơn nhé." }]);
    }, [slug]);

    const getFormattedName = (slug) => {
        switch (slug) {
            case "bac-si-suc-khoe-ai":
                return "Bác sĩ sức khỏe AI";
            case "bac-si-tim-mach":
                return "Bác sĩ tim mạch";
            case "bac-si-noi-khoa":
                return "Bác sĩ nội khoa";
            case "bac-si-noi-tiet":
                return "Bác sĩ nội tiết";
            case "bac-si-dinh-duong":
                return "Bác sĩ dinh dưỡng";
            default:
                return slug;
        }
    };

    const sendMessage = async () => {
        if (!userInput.trim()) return;

        const updatedMessages = [...messages, { sender: "User", content: userInput }];
        setMessages(updatedMessages);
        setUserInput("");
        setLoading(true);

        try {
            const response = await axios.post('https://medicareai-backend.onrender.com/api/chat/message', { userInput });
            const { message: botResponse } = response.data;
            const updatedMessagesWithBot = [...updatedMessages, { sender: chatbot.name, content: botResponse }];
            setMessages(updatedMessagesWithBot);
        } catch (error) {
            console.error("Error fetching bot response:", error);
            const errorMessage = "Xin lỗi bạn, tôi đang gặp chút sự cố.";
            const updatedMessagesWithError = [...updatedMessages, { sender: chatbot.name, content: errorMessage }];
            setMessages(updatedMessagesWithError);
        }

        setLoading(false);
    };

    const handleVoice = () => {
        if (SpeechRecognition.browserSupportsSpeechRecognition()) {
            if (listening) {
                SpeechRecognition.stopListening();
            } else {
                SpeechRecognition.startListening({ continuous: true });
            }
        } else {
            alert("Browser doesn't support speech recognition");
        }
    };
    const handleTranscript = () => {
        setUserInput(userInput + transcript + ' ');
        resetTranscript();
    };

    if (transcript !== '') {
        handleTranscript();
    }
    const sendPromoMessage = async (buttonName) => {
        const updatedMessages = [...messages, { sender: "User", content: buttonName }];
        setMessages(updatedMessages);
        setLoading(true);
        try {
            const response = await axios.post('https://medicareai-backend.onrender.com/api/chat/message', { userInput: buttonName });
            const { message: botResponse } = response.data;
            const updatedMessagesWithBot = [...messages, { sender: chatbot.name, content: botResponse }];
            setMessages(updatedMessagesWithBot);
        }
        catch (error) {
            console.error("Error fetching bot response:", error);
            const errorMessage = "Xin lỗi bạn, tôi đang gặp chút sự cố.";
            const updatedMessagesWithError = [...updatedMessages, { sender: chatbot.name, content: errorMessage }];
            setMessages(updatedMessagesWithError);
        }
        setLoading(false);

    };

    return (
        <DefaultLayout>
            <MainContentLayout>
                <Flex vertical align="center" gap="large" wrap="wrap" justify="center" style={{ minHeight: "100vh" }}>
                    <Card id="chat-container" className="chat-container" style={{ width: isMobile ? 300 : 800, height: 600, borderRadius: 20 }}>


                        {messages.map((message, index) => (
                            <div key={index} className={`message ${message.sender.toLowerCase()}`}>
                                <Avatar src={message.sender === chatbot.name ? chatbot.picture : "https://d1xjlj96to6zqh.cloudfront.net/patient-avatar.png"} style={{ marginBottom: 20 }} alt="chatbot avatar message" />
                                <div className="message-content">
                                    <Flex vertical gap="small">
                                        <Text strong>{message.sender}:</Text>
                                        {message.sender === chatbot.name ? (
                                            <div className="message-bubble" style={{
                                                backgroundColor: "#069390", borderRadius: 30, padding: 20, color: "white"
                                            }}>
                                                <ReactMarkdown>{message.content}</ReactMarkdown>
                                            </div>
                                        ) : (
                                            <div className="message-bubble" style={{
                                                backgroundColor: "white", borderRadius: 30, padding: 20, color: "black"
                                            }}>
                                                <ReactMarkdown>{message.content}</ReactMarkdown>
                                            </div>
                                        )}
                                    </Flex>
                                </div>
                            </div>
                        ))}

                        {loading && (
                            <div className="message chatbot">
                                <Avatar src={chatbot ? chatbot.picture : "https://d1xjlj96to6zqh.cloudfront.net/patient-avatar.png"} style={{ marginBottom: 20 }} alt="chatbot avatar" />
                                <div className="message-content">
                                    <Flex vertical gap="small">
                                        <Text strong>{chatbot ? chatbot.name : "Chatbot"}:</Text>
                                        <div className="message-bubble" style={{
                                            backgroundColor: "#069390", borderRadius: 30, padding: 20, color: "white"
                                        }}>
                                            <BouncingDotsLoader />
                                        </div>
                                    </Flex>
                                </div>
                            </div>
                        )}

                    </Card>
                    <Flex gap="large" align="center" wrap="wrap">
                        <Button className="promo-prompt" type="primary" onClick={() => sendPromoMessage("Tôi muốn hỏi về bệnh tim mạch?")}>
                            Tôi muốn hỏi về bệnh tim mạch?
                        </Button>
                        <Button className="promo-prompt" type="primary" onClick={() => sendPromoMessage("Triệu chứng bệnh sổ mũi")}>
                            Triệu chứng bệnh sổ mũi
                        </Button>
                        <Button className="promo-prompt" type="primary" onClick={() => sendPromoMessage("Bữa ăn thế nào là tốt?")}>
                            Bữa ăn thế nào là tốt?
                        </Button>
                    </Flex>
                    <Flex className="input-container" justify="center" gap={10} wrap="wrap">

                        <TextArea
                            classNames="input-chat"
                            rows={3}
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            wrap="wrap"
                            style={{
                                width: isMobile ? 300 : 650, borderRadius: 50, marginBottom: 20, overflow: "hidden", lineHeight: "normal",  // Reset line-height
                                paddingTop: "15px",
                                paddingBottom: "10px"
                            }}
                            placeholder="Nhập tin nhắn của bạn..."
                            onPressEnter={sendMessage}
                            className="textarea-container"
                            autoSize={{ minRows: 2, maxRows: 10 }}

                        >

                        </TextArea>
                        <Button type="default" className="voice-btn" icon={<AudioOutlined />} onClick={handleVoice} />
                        <Button className="send-btn" type="default" icon={<SendOutlined />} onClick={sendMessage} />

                    </Flex>
                </Flex>
            </MainContentLayout>
        </DefaultLayout>
    );
};

export default ChatDetail;
