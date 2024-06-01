import React, { useState, useEffect } from 'react';
import { Card, Flex, Progress, Typography, Col, Row, Image, Button, Spin } from 'antd';
import './HealthEvaluate.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DefaultLayout from '../../layout/DefaultLayout';
import MainContentLayout from '../../layout/MainContentLayout';
import SideContentLayout from '../../layout/SideContentLayout';
import { LoadingOutlined } from '@ant-design/icons';
import slug from 'slug';
import ReactMarkdown from 'react-markdown';
import { useMediaQuery } from 'react-responsive';

const heartLine = require('../../assets/heart-line.png');

const { Title, Text } = Typography;

const HealthEvaluate = () => {
    const [healthData, setHealthData] = useState(null);
    const [dataComplete, setDataComplete] = useState(false);
    const [loading, setLoading] = useState(true);
    const [chatbotLoading, setChatbotLoading] = useState(false);
    const [blogData, setBlogData] = useState(null);
    const [chatbotResponse, setChatbotResponse] = useState("");
    const isMobile = useMediaQuery({ maxWidth: 768 });

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (healthData && healthData.bloodStatus && healthData.glucoseStatus && healthData.bmiStatus && healthData.cholesterolStatus) {
            setDataComplete(true);
        } else {
            setDataComplete(false);
        }
    }, [healthData]);

    const fetchChatbotResponse = async (userInput) => {
        try {
            setChatbotLoading(true);
            const response = await axios.post('https://medi-care-ai-backend-qjg1y3sxj-djais-projects.vercel.app/api/chat/message', { userInput });
            setChatbotResponse(response.data.message);
            setChatbotLoading(false);
        } catch (error) {
            console.error("Error fetching chatbot response:", error);
            setChatbotLoading(false);
        }
    };

    useEffect(() => {
        if (healthData && healthData.bmiStatus && healthData.bloodStatus && healthData.glucoseStatus && healthData.cholesterolStatus) {
            const userInput = `Bạn có lời khuyên gì về sức khỏe hiện tại của tôi không:BMI ${healthData.bmiStatus}, Blood ${healthData.bloodStatus}, Glucose ${healthData.glucoseStatus}, Cholesterol ${healthData.cholesterolStatus}`;
            fetchChatbotResponse(userInput);
        }
    }, [healthData]);
    const fetchData = async () => {
        try {
            const userId = localStorage.getItem("userId");
            setLoading(true);
            await axios.post(`http://localhost:5000/api/health/overall/${userId}`);
            const response = await axios.get(`http://localhost:5000/api/health/overall/${userId}`);
            setHealthData(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching health data:", error);
            setLoading(false);
        }
    };
    const fetchBlogData = async (tag) => {
        try {
            const response = await axios.get(`https://medi-care-ai-backend-qjg1y3sxj-djais-projects.vercel.app/api/blogs?tag=${tag}`);
            setBlogData(response.data);
        } catch (error) {
            console.error("Error fetching blog data:", error);
        }
    }

    useEffect(() => {
        fetchBlogData('Ăn uống');
    }, []);
    return (
        <DefaultLayout>
            <Flex gap="large" wrap="wrap">

                <MainContentLayout>
                    {loading ? (
                        <Flex justify="center" align="center" style={{ minHeight: '400px' }}>
                            <Spin indicator={<LoadingOutlined />} size="large" tip="Loading..." />
                        </Flex>
                    ) : (
                        <Flex vertical wrap='wrap' gap={30} style={{ padding: 20 }} >
                            <Title level={2}>Đánh giá sức khỏe</Title>
                            {healthData ? (
                                <>
                                    <Flex gap={20}>
                                        <Image preview={false} src={localStorage.getItem("photoURL")} style={{ borderRadius: 50, width: 80, height: 80 }} />
                                        <Title level={3}>{localStorage.getItem("displayName")}</Title>
                                    </Flex>
                                    <Flex align="left" justify="left" gap={100} wrap='wrap'>
                                        <Flex vertical>
                                            <Title level={2}>{healthData.age}</Title>
                                            <Text>Tuổi</Text>
                                        </Flex>


                                        <Flex vertical>
                                            <Title level={2}>{healthData.height}</Title>
                                            <Text>Cao, cm</Text>
                                        </Flex>
                                        <Flex vertical>
                                            <Title level={2}>{healthData.weight}</Title>
                                            <Text>Nặng, kg</Text>
                                        </Flex>
                                        <Flex vertical>
                                            <Title level={2} style={{ color: healthData.predict === "Great" ? "#069390" : "red" }}>
                                                {healthData.predict === "Great" ? "Tốt" : "Tệ"}
                                            </Title>
                                            <Text>Chẩn đoán sức khỏe</Text>
                                        </Flex>
                                    </Flex>
                                </>
                            ) : (
                                <Text style={{ fontSize: 18 }}>Chưa có dữ liệu về sức khỏe</Text>
                            )}

                            <Flex gap={30} wrap='wrap'>
                                <Card hoverable className="blood-card" style={{ width: "250px", height: 230, borderRadius: 40 }}>
                                    <Title level={4} style={{ color: 'white' }}>Huyết áp</Title>
                                    {healthData ? (
                                        <Flex vertical justify="left">
                                            <Text type='secondary' style={{ fontWeight: 500, marginTop: 30, color: 'white' }}>mmhg</Text>
                                            <Text style={{ fontWeight: 500, fontSize: 40, color: 'white' }}>{healthData.sysBP}/{healthData.diaBP}</Text>
                                            <Text style={{ fontWeight: 500, fontSize: 15, color: 'white' }}>{healthData.bloodStatus}</Text>
                                        </Flex>
                                    ) : (
                                        <Text style={{ color: 'white' }}>Chưa có dữ liệu</Text>
                                    )}
                                </Card>

                                <Card hoverable className="bmi-card" style={{ width: "250px", height: 230, borderRadius: 40 }}>
                                    <Title level={4}>BMI</Title>
                                    {healthData ? (
                                        <Flex vertical justify="left">
                                            <Text type='secondary' style={{ fontWeight: 500, marginTop: 30 }}>cm/kg</Text>
                                            <Text style={{ fontWeight: 500, fontSize: 40 }}>{healthData.BMI}</Text>
                                            <Text style={{ fontWeight: 500, fontSize: 15 }}>{healthData.bmiStatus}</Text>
                                        </Flex>
                                    ) : (
                                        <Text>Chưa có dữ liệu</Text>
                                    )}
                                </Card>

                                <Card hoverable className="glucose-card" style={{ width: "250px", height: 230, borderRadius: 40 }}>
                                    <Title level={4} style={{ color: 'white' }}>Đường huyết</Title>
                                    {healthData ? (
                                        <Flex vertical justify="left">
                                            <Text type='secondary' style={{ fontWeight: 500, marginTop: 30, color: 'white' }}>mmol/l</Text>
                                            <Text style={{ fontWeight: 500, fontSize: 40, color: 'white' }}>{healthData.glucose}</Text>
                                            <Text style={{ fontWeight: 500, fontSize: 15, color: 'white' }}>{healthData.glucoseStatus}</Text>
                                        </Flex>
                                    ) : (
                                        <Text style={{ color: 'white' }}>Chưa có dữ liệu</Text>
                                    )}
                                </Card>
                            </Flex>
                            <Flex gap={30} wrap='wrap'>
                                <Card hoverable className="cholesterol-card" style={{ width: "250px", height: 230, borderRadius: 40 }}>
                                    <Title level={4} style={{ color: 'white' }}>Cholesterol</Title>
                                    {healthData ? (
                                        <Flex vertical justify="left">
                                            <Text type='secondary' style={{ fontWeight: 500, marginTop: 30, color: 'white' }}>mg/dl</Text>
                                            <Text style={{ fontWeight: 500, fontSize: 40, color: 'white' }}>{healthData.totChol}</Text>
                                            <Text style={{ fontWeight: 500, fontSize: 15, color: 'white' }}>{healthData.cholesterolStatus}</Text>
                                        </Flex>
                                    ) : (
                                        <Text style={{ color: 'white' }}>Chưa có dữ liệu</Text>
                                    )}
                                </Card>

                                <Card hoverable className="heart-card"
                                    cover={<Image src={heartLine} style={{ maxWidth: '300px', height: 200, float: 'right', objectFit: 'cover' }} />}
                                    style={{ width: isMobile ? 250 : 500, height: isMobile ? 400 : 230, borderRadius: 40 }}>
                                    <Title level={2} style={{ color: 'white' }}>Nhịp tim</Title>
                                    {healthData ? (
                                        <Flex vertical justify="left">
                                            <Text type='secondary' style={{ fontWeight: 500, marginTop: 30, fontSize: 25, color: 'white' }}>bpm</Text>
                                            <Text style={{ fontWeight: 500, fontSize: 50, color: 'white' }}>{healthData.heartRate}</Text>
                                        </Flex>
                                    ) : (
                                        <Text style={{ color: 'white' }}>Chưa có dữ liệu</Text>
                                    )}
                                </Card>
                            </Flex>

                            <Title level={2}>Đề xuất đọc</Title>
                            {healthData ? (
                                <Flex wrap='wrap' gap={20}>
                                    {blogData.slice(0, 2).map((blog, index) => (
                                        <Card
                                            hoverable
                                            cover={<img alt="example" src={blog.photo} style={{ objectFit: 'cover', maxWidth: '100%', height: 150 }} />}
                                            style={{ borderRadius: 20, maxWidth: 300 }}
                                        >
                                            <Card.Meta title={blog.title} />
                                            <Link to={`/blog/${slug(blog.title)}`}>
                                                <Flex justify='center'>
                                                    <Button type="primary" style={{ marginTop: 10 }}>Đọc thêm</Button>
                                                </Flex>
                                            </Link>
                                        </Card>
                                    ))}
                                </Flex>
                            ) : (
                                <Text style={{ fontSize: 18 }}>Bạn vẫn chưa có dữ liệu sức khỏe nào</Text>
                            )
                            }
                            <Title level={2}>Lời khuyên từ bác sĩ AI</Title>
                            {healthData ? (
                                <>
                                    {chatbotLoading ? (
                                        <Flex justify="center">
                                            <Spin indicator={<LoadingOutlined />} />
                                            <Text style={{ marginLeft: 10 }}>Đang nhận lời khuyên...</Text>

                                        </Flex>
                                    ) : (
                                        <Card style={{ borderRadius: 20, padding: 10, maxWidth: 500, marginBottom: 30 }}>
                                            <Text>
                                                <ReactMarkdown>
                                                    {chatbotResponse}
                                                </ReactMarkdown>
                                            </Text>
                                        </Card>
                                    )}
                                </>
                            ) : (
                                <Text style={{ fontSize: 18 }}>Bạn vẫn chưa có dữ liệu sức khỏe nào</Text>
                            )}
                        </Flex>
                    )}
                </MainContentLayout>
                <SideContentLayout>
                    <Image preview={false} src="https://d1xjlj96to6zqh.cloudfront.net/doctor-4.png" style={{ width: "110%", padding: 20 }} alt='side doctor image vector 1' />
                    <Image preview={false} src="https://d1xjlj96to6zqh.cloudfront.net/doctor-3.png" style={{ width: "100%", padding: 20 }} alt='side doctor image vector 2' />
                </SideContentLayout>
            </Flex>
        </DefaultLayout >
    );
}

export default HealthEvaluate;
