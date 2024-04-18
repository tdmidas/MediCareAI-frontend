import React, { useState, useEffect } from 'react';
import { Card, Flex, Progress, Typography, Col, Row } from 'antd';
import './HealthEvaluate.css';
import axios from 'axios';
import { ExclamationCircleOutlined } from '@ant-design/icons';

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
            await axios.post(`https://${process.env.REACT_APP_API_PORT}/api/health/overall/${userId}`);
            const response = await axios.get(`https://${process.env.REACT_APP_API_PORT}/api/health/overall/${userId}`);
            setHealthData(response.data);
        } catch (error) {
            console.error("Error fetching health data:", error);
        }
    };

    return (
        <Card style={{ maxWidth: 500, height: 440, borderRadius: 20, marginBottom: 30 }} className={dataComplete ? "complete-card" : "incomplete-card"}>

            <Flex align="center" justify="center">
                <Progress type="circle" percent={100} format={() => healthData ? healthData.predict : '0'}
                    className={healthData ? (healthData.predict === 'Great' ? 'green-progress' : 'red-progress') : ''} />
            </Flex>
            <Title level={3} strong style={{ textAlign: "center" }}>
                Sức khỏe tổng thể
            </Title>
            <Flex wrap='wrap' gap="large" justify='center' >
                <Col>
                    <Row className="health-info" style={{ backgroundColor: "#fc9375" }}>
                        <Text className="health-info-text"> {healthData ? healthData.bloodStatus : 'Đang tải...'}</Text>
                    </Row>
                    <Row className="health-info" style={{ backgroundColor: "#f4b152" }}>
                        <Text className="health-info-text">  {healthData ? healthData.glucoseStatus : 'Đang tải...'}</Text>
                    </Row>
                    <Row className="health-info" style={{ backgroundColor: "#1ddadd" }}>
                        <Text className="health-info-text">  {healthData ? healthData.bmiStatus : 'Đang tải...'}</Text>
                    </Row>

                </Col>

            </Flex>
            {!dataComplete && (
                <Flex align="center" justify="center" style={{ marginTop: 20 }}>
                    <ExclamationCircleOutlined style={{ fontSize: 24, marginRight: 10 }} />
                    <Text style={{ fontWeight: 'bold' }}>Cập nhật đủ thông tin sức khỏe bạn nhé !</Text>
                </Flex>
            )}
        </Card>
    );
}

export default HealthEvaluate;
