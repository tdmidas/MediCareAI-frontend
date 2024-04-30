import React, { useState, useEffect } from 'react';
import { Card, Flex, Progress, Typography, Col, Row, Image, Button } from 'antd';
import './HealthEvaluate.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DefaultLayout from '../../layout/DefaultLayout';
import MainContentLayout from '../../layout/MainContentLayout';
const { Title, Text } = Typography;

const HealthEvaluate = () => {
    const [healthData, setHealthData] = useState(null);
    const [dataComplete, setDataComplete] = useState(false);
    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (healthData && healthData.bloodStatus && healthData.glucoseStatus && healthData.bmiStatus) {
            setDataComplete(true);
        } else {
            setDataComplete(false);
        }
    }, [healthData]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const userId = localStorage.getItem("userId");
            await axios.post(`https://medicareai-backend.onrender.com/api/health/overall/${userId}`);
            const response = await axios.get(`https://medicareai-backend.onrender.com/api/health/overall/${userId}`);
            setHealthData(response.data);
        } catch (error) {
            console.error("Error fetching health data:", error);
        }
    };

    return (
        <DefaultLayout>
            <MainContentLayout>
                <div className="health-evaluate">
                    <Title level={2}>Đánh giá sức khỏe</Title>

                    <Flex align="center" justify="center">
                        <Image preview={false} src="https://d1xjlj96to6zqh.cloudfront.net/profile-ava.png" style={{
                            maxWidth: 230,
                            maxHeight: 230,
                        }} />
                        <Progress type="circle" percent={100} format={() => healthData ? healthData.predict : '0'}
                            className={healthData ? (healthData.predict === 'Great' ? 'green-progress' : 'red-progress') : ''} />
                    </Flex>
                    <Flex gap={0} wrap='wrap'>
                        <Card title="Blood Pressure" className="health-card">
                            <Flex justify="center">
                                <Progress
                                    type="circle"
                                    percent={healthData ? healthData.bloodStatus : 0}
                                    format={percent => `${percent}%`}
                                    width={100}
                                />
                            </Flex>
                        </Card>
                        <Card title="Blood Glucose" className="health-card">
                            <Flex justify="center">
                                <Progress
                                    type="circle"
                                    percent={healthData ? healthData.glucoseStatus : 0}
                                    format={percent => `${percent}%`}
                                    width={100}
                                />
                            </Flex>
                        </Card>
                        <Card title="BMI" className="health-card" >
                            <Flex justify="center">
                                <Progress
                                    type="circle"
                                    percent={healthData ? healthData.bmiStatus : 0}
                                    format={percent => `${percent}%`}
                                    width={100}
                                />
                            </Flex>
                        </Card>
                    </Flex>
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Card title="Overall Health" className="health-card">
                                <Flex justify="center">
                                    <Progress
                                        type="circle"
                                        percent={healthData ? healthData.overallStatus : 0}
                                        format={percent => `${percent}%`}
                                        width={100}
                                    />
                                </Flex>
                            </Card>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Card title="Health Recommendations" className="health-card">
                                <Text>
                                    {dataComplete ? healthData.recommendations : "Please complete all health data to get recommendations."}
                                </Text>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Link to="/health">
                                <Button type="primary">Update Health Data</Button>
                            </Link>
                        </Col>
                    </Row>
                </div>

            </MainContentLayout>
        </DefaultLayout>
    );
}

export default HealthEvaluate;
