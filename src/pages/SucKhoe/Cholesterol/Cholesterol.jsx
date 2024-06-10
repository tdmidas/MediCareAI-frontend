import React from "react";
import DefaultLayout from "../../../layout/DefaultLayout";
import { Card, Flex, Typography, Row, Button, Form, Input } from "antd";
import axios from "axios";
import { useState } from "react";
import "./Cholesterol.css";

const { Title, Paragraph } = Typography;

const Cholesterol = () => {
    const [totalCholesterol, setTotalCholesterol] = useState(200);
    const [hdlCholesterol, setHdlCholesterol] = useState(50);
    const [ldlCholesterol, setLdlCholesterol] = useState(100);
    const [cholesterolClassification, setCholesterolClassification] = useState("");
    const [cholesterolColor, setCholesterolColor] = useState("");

    const classifyCholesterol = (totalCholesterol, hdlCholesterol, ldlCholesterol) => {
        if (totalCholesterol < 200 && hdlCholesterol >= 40 && ldlCholesterol < 100) {
            return "Cholesterol tốt";
        } else if (totalCholesterol >= 200 && totalCholesterol <= 239 || ldlCholesterol >= 100 && ldlCholesterol <= 159) {
            return "Cholesterol cao vừa";
        } else if (totalCholesterol >= 240 || ldlCholesterol >= 160) {
            return "Cholesterol cao";
        } else {
            return "Không xác định";
        }
    };

    const classifyCholesterolColor = (classification) => {
        switch (classification) {
            case "Cholesterol tốt":
                return "#069390";
            case "Cholesterol cao vừa":
                return "#f7a440";
            case "Cholesterol cao":
                return "#a72420";
            default:
                return "gray";
        }
    };

    const handleSubmit = async () => {
        const classification = classifyCholesterol(totalCholesterol, hdlCholesterol, ldlCholesterol);
        const color = classifyCholesterolColor(classification);
        setCholesterolClassification(classification);
        setCholesterolColor(color);
        const userId = localStorage.getItem("userId");
        await axios.post(`http://medicare-ai-backend-env.eba-wt2prnnx.ap-southeast-1.elasticbeanstalk.com/api/health/cholesterol/${userId}`, {
            totalCholesterol: parseFloat(totalCholesterol),
            hdlCholesterol: parseFloat(hdlCholesterol),
            ldlCholesterol: parseFloat(ldlCholesterol),
            status: classification,
        });
    };

    const CholesterolScale = [
        { category: "good", range: "< 200 mg/dL" },
        { category: "high", range: "200 - 239 mg/dL" },
        { category: "critical", range: "≥ 240 mg/dL" },
    ];

    return (
        <DefaultLayout>
            <Flex vertical gap="large" align="center" wrap="wrap">
                <Card className="cholesterolCard" style={{ width: "100%", maxWidth: 700 }}>
                    <Title level={1} style={{ textAlign: "center" }}>Nhập bản ghi cholesterol
                    </Title>

                    <Form className="calculator" onFinish={handleSubmit} style={{ justifyItems: "center" }}>
                        <Form.Item label="Cholesterol toàn phần (mg/dL)" name="totalCholesterol">
                            <Input type="number" min={100} max={400} value={totalCholesterol}
                                onChange={(e) => setTotalCholesterol(parseFloat(e.target.value))} style={{ borderRadius: 30, width: "200px" }} />
                        </Form.Item>
                        <Form.Item label="HDL Cholesterol (mg/dL)" name="hdlCholesterol">
                            <Input type="number" min={20} max={100} value={hdlCholesterol} onChange={(e) => setHdlCholesterol(parseFloat(e.target.value))} style={{ borderRadius: 30, width: "200px" }} />
                        </Form.Item>
                        <Form.Item label="LDL Cholesterol (mg/dL)" name="ldlCholesterol">
                            <Input type="number" min={50} max={200} value={ldlCholesterol} onChange={(e) => setLdlCholesterol(parseFloat(e.target.value))} style={{ borderRadius: 30, width: "200px" }} />
                        </Form.Item>

                    </Form>
                    <Row align="center">
                        <Button type="primary" className="submit-btn" onClick={handleSubmit} style={{ justifyItems: "center", borderRadius: 30, width: "100%", maxWidth: 150 }}>Submit</Button>

                    </Row>

                    <div className="output" style={{ paddingTop: 30 }}>
                        <Title level={3}>Tình trạng</Title>
                        <Paragraph style={{ color: cholesterolColor, paddingBottom: 30, fontWeight: 500, fontSize: 18 }}>{cholesterolClassification}</Paragraph>
                    </div>
                    <div className="cholesterol-scale">
                        {CholesterolScale.map((item, index) => (
                            <div key={index} style={{ '--color': `var(--${item.category.toLowerCase()})` }}>
                                <Title level={4}>{item.category}</Title>
                                <Paragraph>{item.range}</Paragraph>
                            </div>
                        ))}
                    </div>

                </Card>

            </Flex>

        </DefaultLayout >
    );
}

export default Cholesterol;
