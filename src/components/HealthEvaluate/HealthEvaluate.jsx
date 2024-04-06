import React, { useState, useEffect } from 'react';
import { Card, Flex, Progress, Typography, Col, Row } from 'antd';
import './HealthEvaluate.css';
import axios from 'axios';

const { Title, Text } = Typography;

const HealthEvaluate = () => {
    const [healthData, setHealthData] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const userId = localStorage.getItem("userId");
            await axios.post(`http://localhost:5000/api/health/overall/${userId}`);
            const response = await axios.get(`http://localhost:5000/api/health/overall/${userId}`);
            setHealthData(response.data);
        } catch (error) {
            console.error("Error fetching health data:", error);
        }
    };

    return (
        <Card style={{ maxWidth: 500, height: 400, borderRadius: 20, marginBottom: 30 }}>
            <Flex align="center" justify="center">
                <Progress type="circle" percent={100} format={() => healthData ? healthData.predict : '0'}
                    className={healthData ? (healthData.predict === 'Great' ? 'green-progress' : 'red-progress') : ''} />
            </Flex>
            <Title level={3} strong style={{ textAlign: "center" }}>
                Sức khỏe tổng thể
            </Title>
            <Flex wrap='wrap' gap="large" justify='center' >
                <Col>
                    <Row style={{ backgroundColor: "#fc9375", borderRadius: 20, height: 40, width: "250px", alignContent: "center", marginBottom: "20px" }}>
                        <Text type="secondary" style={{ fontWeight: 600, color: "white", marginLeft: 30 }}> {healthData ? healthData.bloodStatus : 'Đang tải...'}</Text>
                    </Row>
                    <Row style={{ backgroundColor: "#f4b152", borderRadius: 20, height: 40, width: "250px", alignContent: "center", marginBottom: "20px" }}>
                        <Text type="secondary" style={{ fontWeight: 600, color: "white", marginLeft: 30 }}>  {healthData ? healthData.glucoseStatus : 'Đang tải...'}</Text>
                    </Row>
                    <Row style={{ backgroundColor: "#1ddadd", borderRadius: 20, height: 40, width: "250px", alignContent: "center", marginBottom: "20px" }}>
                        <Text type="secondary" style={{ fontWeight: 600, color: "white", marginLeft: 30 }}>  {healthData ? healthData.bmiStatus : 'Đang tải...'}</Text>
                    </Row>
                </Col>
            </Flex>
        </Card>
    );
}

export default HealthEvaluate;
