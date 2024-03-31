import React from 'react';
import { Card, Flex, Progress, Typography, Col, Row } from 'antd';
import './HealthEvaluate.css';
import { LuHeart } from "react-icons/lu";
import { LiaWeightSolid } from "react-icons/lia";
import { MdOutlineBloodtype } from "react-icons/md";

const { Title, Text } = Typography;
const HealthEvaluate = () => {
    return (
        <Card style={{ maxWidth: 500, height: 400, borderRadius: 20, marginBottom: 30 }}>
            <Flex align="center" justify="center">
                <Progress type="circle" percent={100} format={() => '100'} />
            </Flex>
            <Title level={3} strong style={{ textAlign: "center" }}>
                Sức khỏe tổng thể
            </Title>
            <Flex wrap='wrap' gap="large" justify='center' >
                <Col>
                    <Row style={{ backgroundColor: "#fc9375", borderRadius: 20, height: 40, width: "250px", alignContent: "center", marginBottom: "20px" }}>
                        <Text type="secondary" style={{ fontWeight: 600, color: "white", marginLeft: 60 }}> Huyết áp: Bình thường</Text>
                    </Row>
                    <Row style={{ backgroundColor: "#f4b152", borderRadius: 20, height: 40, width: "250px", alignContent: "center", marginBottom: "20px" }}>
                        <Text type="secondary" style={{ fontWeight: 600, color: "white", marginLeft: 60 }}> Đường huyết: Bình thường</Text>
                    </Row>
                    <Row style={{ backgroundColor: "#1ddadd", borderRadius: 20, height: 40, width: "250px", alignContent: "center", marginBottom: "20px" }}>
                        <Text type="secondary" style={{ fontWeight: 600, color: "white", marginLeft: 60 }}> BMI: Bình thường</Text>
                    </Row>
                </Col>
            </Flex>
        </Card>

    );
}

export default HealthEvaluate;