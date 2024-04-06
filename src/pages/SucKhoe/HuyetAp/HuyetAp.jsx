import React, { useState } from "react";
import DefaultLayout from "../../../layout/DefaultLayout";
import "./HuyetAp.css";
import { Card, Flex, Typography, Row, Button, Form, Input } from "antd";
import axios from "axios";
const { Title, Paragraph } = Typography;

const HuyetAp = () => {
    const [tamTruong, setTamTruong] = useState(120);
    const [tamThu, setTamThu] = useState(80);
    const [nhipTim, setNhipTim] = useState(70);
    const [bloodPressureClassification, setBloodPressureClassification] = useState("");
    const [bloodPressureColor, setBloodPressureColor] = useState("");

    const classifyBloodPressure = (tamTruong, tamThu) => {
        if (tamTruong < 90 || tamThu < 60) {
            return "Huyết áp thấp";
        } else if (tamTruong >= 90 && tamTruong <= 119 && tamThu >= 60 && tamThu <= 79) {
            return "Huyết áp bình thường";
        } else if ((tamTruong >= 120 && tamTruong <= 129) && (tamThu >= 60 && tamThu <= 79)) {
            return "Huyết áp cao";
        } else if ((tamTruong >= 130 && tamTruong <= 139) || (tamThu >= 80 && tamThu <= 89)) {
            return "Tăng huyết áp giai đoạn 1";
        } else if ((tamTruong >= 140 && tamTruong <= 180) || (tamThu >= 90 && tamThu <= 120)) {
            return "Tăng huyết áp giai đoạn 2";
        } else if (tamTruong >= 180 || tamThu >= 120) {
            return "Tăng huyết áp";
        } else {
            return "Không xác định";
        }
    };

    const classifyBloodPressureColor = (classification) => {
        switch (classification) {
            case "Huyết áp thấp":
                return "#0b5edb";
            case "Huyết áp bình thường":
                return "#069390";
            case "Huyết áp cao":
                return "#d2c63f";
            case "Tăng huyết áp giai đoạn 1":
                return "#f7a440";
            case "Tăng huyết áp giai đoạn 2":
                return "#cd5e09";
            case "Tăng huyết áp":
                return "#a72420";
            default:
                return "gray";
        }
    };

    const handleSubmit = async () => {
        const classification = classifyBloodPressure(tamTruong, tamThu);
        const color = classifyBloodPressureColor(classification);
        setBloodPressureClassification(classification);
        setBloodPressureColor(color);
        const userId = localStorage.getItem("userId");
        await axios.post(`http://${process.env.REACT_APP_API_PORT}/api/health/bloodPressure/${userId}`, {
            sysBP: parseFloat(tamTruong),
            diaBP: parseFloat(tamThu),
            heartRate: parseFloat(nhipTim),
            status: bloodPressureClassification,
        });
    };

    const BloodPressureScale = [
        { category: "low", range: "< 90/60 mmHg" },
        { category: "normal", range: "90/60 - 120/80 mmHg" },
        { category: "high", range: "120/80 - 129/80 mmHg" },
        { category: "stage1", range: "130/80 - 139/89 mmHg" },
        { category: "stage2", range: "140/90 - 180/120 mmHg" },
        { category: "critical", range: "> 140/90 mmHg" },
    ];

    return (
        <DefaultLayout>
            <Flex vertical gap="large" align="center" wrap="wrap">
                <Card className="bp-card" style={{ width: "100%", maxWidth: 700 }}>
                    <Title level={1} style={{ textAlign: "center" }}>Nhập bản ghi huyết áp
                    </Title>

                    <Form className="calculator" onFinish={handleSubmit} style={{ justifyItems: "center" }}>
                        <Form.Item label="Tâm trương (mmHg)" name="tamTruong">
                            <Input type="number" min={20} max={300} value={tamTruong}
                                onChange={(e) => setTamTruong(parseFloat(e.target.value))} style={{ borderRadius: 30, width: "200px" }} />
                        </Form.Item>
                        <Form.Item label="Tâm thu (mmHg)" name="tamThu">
                            <Input type="number" min={20} max={300} value={tamThu} onChange={(e) => setTamThu(parseFloat(e.target.value))} style={{ borderRadius: 30, width: "200px" }} />
                        </Form.Item>
                        <Form.Item label="Nhịp tim (BPM)" name="bpm">
                            <Input type="number" min={0} max={300} value={nhipTim} onChange={(e) => setNhipTim(parseFloat(e.target.value))} style={{ borderRadius: 30, width: "200px" }} />
                        </Form.Item>

                    </Form>
                    <Row align="center">
                        <Button type="primary" className="submit-btn" onClick={handleSubmit} style={{ justifyItems: "center", borderRadius: 30, width: "100%", maxWidth: 150 }}>Submit</Button>

                    </Row>

                    <div className="output" style={{ paddingTop: 30 }}>
                        <Title level={3}>Tình trạng</Title>
                        <Paragraph style={{ color: bloodPressureColor, paddingBottom: 30, fontWeight: 500, fontSize: 18 }}>{bloodPressureClassification}</Paragraph>
                    </div>
                    <div className="bmi-scale">
                        {BloodPressureScale.map((item, index) => (
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

export default HuyetAp;
