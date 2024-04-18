import React, { useState } from 'react';
import { Input, Button, Typography, Form, Card } from 'antd';
import DefaultLayout from '../../../layout/DefaultLayout';
import './DuongHuyet.css';
import axios from 'axios';
const { Title, Paragraph } = Typography;

const GLUCOSE_CATEGORIES = [
    { category: 'low', range: '< 72', color: 'low' },
    { category: 'normal', range: '72 – 140', color: 'healthy' },
    { category: 'high', range: '140 – 153', color: 'overweight' },
    { category: 'critical', range: '≥ 153', color: 'obese' }
];

const DuongHuyet = () => {
    const [glucose, setGlucose] = useState(0);
    const [glucoseCategory, setglucoseCategory] = useState('N/A');
    const [bloodSugarClassification, setBloodSugarClassification] = useState("");
    const [bloodSugarColor, setBloodSugarColor] = useState("");
    const handleReset = () => {
        setGlucose(0);
        setglucoseCategory('N/A');
    };

    const classifyBloodSugar = (glucose) => {
        if (glucose < 72) {
            return "Đường huyết thấp";
        } else if (glucose >= 72 && glucose <= 140) {
            return "Đường huyết bình thường";
        } else if (glucose >= 140 && glucose <= 153) {
            return "Tiền tiểu đường";
        } else if (glucose > 153) {
            return "Bệnh tiểu đường";
        }

        else {
            return "Không xác định";
        }
    };

    const classifyBloodSugarColor = (classification) => {
        switch (classification) {
            case "Đường huyết thấp":
                return "#0b5edb";
            case "Đường huyết bình thường":
                return "#069390";
            case "Tiền tiểu đường":
                return "#d2c63f";
            case "Bệnh tiểu đường":
                return "#f7a440";
            default:
                return "gray";
        }
    };

    const handleSubmit = async () => {
        const classification = classifyBloodSugar(glucose);
        const color = classifyBloodSugarColor(classification);
        setBloodSugarClassification(classification);
        setBloodSugarColor(color);
        const userId = localStorage.getItem("userId");
        await axios.post(`https://medicareai-backend.onrender.com/api/health/glucose/${userId}`, {
            glucose: parseFloat(glucose),
            status: classification,
        });
    };
    return (
        <DefaultLayout>

            <Card className="container">
                <Title level={1}>Nhập chỉ số đường huyết</Title>

                <Form className="calculator" onReset={handleReset}>
                    <Form.Item label="Glucose (mg/dl)" name="sugar-blood" style={{ justifyContent: "center" }}>
                        <Input type="number" min={18} max={630} step={0.1} value={glucose} onChange={(e) => setGlucose(parseFloat(e.target.value))}
                            style={{ borderRadius: 30, width: 200 }} />
                    </Form.Item>

                    <Form.Item style={{ justifyContent: "center" }}>
                        <Button type="primary" htmlType="submit" style={{ borderRadius: 20, fontSize: 14, textAlign: "center" }} onClick={handleSubmit} >Submit</Button>
                        <Button htmlType="reset" style={{ borderRadius: 20 }}>Reset</Button>
                    </Form.Item>
                </Form>

                <div className="output">
                    <Title level={3}>Chỉ số đường huyết của bạn là</Title>
                    <Paragraph id="bmi" style={{ color: `var(--${glucoseCategory.toLowerCase()})` }}>{glucose} mg/dl</Paragraph>
                    <Paragraph style={{ color: bloodSugarColor, paddingBottom: 30, fontWeight: 500, fontSize: 18 }} id="desc">Tình trạng: <b>{bloodSugarClassification}</b></Paragraph>
                </div>

                <div className="glucose-scale">
                    {GLUCOSE_CATEGORIES.map((item, index) => (
                        <div key={index} style={{ '--color': `var(--${item.category.toLowerCase()})` }}>
                            <Title level={4}>{item.category}</Title>
                            <Paragraph>{item.range}</Paragraph>
                        </div>
                    ))}
                </div>
            </Card>
        </DefaultLayout>

    );
};

export default DuongHuyet;
