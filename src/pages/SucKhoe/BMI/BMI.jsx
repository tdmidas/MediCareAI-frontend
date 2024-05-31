import React, { useState, useEffect } from 'react';
import { Input, Button, Typography, Form, Card, Flex, Row } from 'antd';
import './BMI.css';
import DefaultLayout from '../../../layout/DefaultLayout';
import axios from 'axios';

const { Title, Paragraph } = Typography;

const BMI_CATEGORIES = [
    { category: 'Thiếu cân', range: '< 18.5', color: 'thieu-can' },
    { category: 'Bình thường', range: '18.5 – 25', color: 'binh-thuong' },
    { category: 'Thừa cân', range: '25 – 30', color: 'thua-can' },
    { category: 'Béo phì', range: '≥ 30', color: 'beo-phi' }
];

const BMI = () => {
    const [weight, setWeight] = useState(0);
    const [height, setHeight] = useState(0);
    const [bmi, setBMI] = useState(0);
    const [bmiCategory, setBMICategory] = useState('');
    const [bmiColor, setBMIColor] = useState('');
    useEffect(() => {
        const sendBMItoServer = async () => {
            const userId = localStorage.getItem("userId");
            await axios.post(`https://medi-care-ai-backend-qjg1y3sxj-djais-projects.vercel.app/api/health/bmi/${userId}`, {
                weight: parseFloat(weight),
                height: parseFloat(height),
                bmi: parseFloat(bmi),
                status: bmiCategory
            });
        };

        if (bmi && bmiCategory) {
            sendBMItoServer();
        }
    }, [bmi, bmiCategory]);
    const calculateBMI = () => {
        const heightMeters = height / 100;
        const calculatedBMI = weight / (heightMeters * heightMeters);
        setBMI(calculatedBMI.toFixed(2));

        for (const category of BMI_CATEGORIES) {
            const [min, max] = category.range.split(' – ');
            if (max === '30') {
                if (calculatedBMI >= parseFloat(min)) {
                    setBMICategory(category.category);
                    setBMIColor(classifyBMIColor(category.category));
                    return;
                }
            } else {
                if (calculatedBMI >= parseFloat(min) && calculatedBMI < parseFloat(max)) {
                    setBMICategory(category.category);
                    setBMIColor(classifyBMIColor(category.category));
                    return;
                }
            }
        }
    };

    const classifyBMIColor = (category) => {
        switch (category) {
            case 'Thiếu cân':
                return 'orange';
            case 'Bình thường':
                return 'green';
            case 'Thừa cân':
                return 'lightcoral';
            case 'Béo phì':
                return 'crimson';
            default:
                return 'gray';
        }
    };

    const handleSubmit = async () => {
        calculateBMI();

    };

    const handleReset = () => {
        setWeight(0);
        setHeight(0);
        setBMI(0);
        setBMICategory('');
        setBMIColor('');
    };

    return (
        <DefaultLayout>
            <Flex vertical gap="large" align="center" wrap="wrap" justify='center'>
                <Card className="bmi-card" style={{ width: '100%', maxWidth: 700 }}>
                    <Title level={1} style={{ textAlign: 'center' }}>Tính chỉ số BMI của bạn</Title>
                    <Flex vertical gap="large" align="center" wrap="wrap" justify='center'>

                        <Form className="calculator" onFinish={calculateBMI}>
                            <Form.Item label="Cân nặng (kg)" name="weight">
                                <Input type="number" min={20} max={300} value={weight} onChange={(e) => setWeight(parseFloat(e.target.value))} style={{ borderRadius: 30, width: '200px' }} />
                            </Form.Item>
                            <Form.Item label="Chiều cao (cm)" name="height">
                                <Input type="number" min={20} max={300} value={height} onChange={(e) => setHeight(parseFloat(e.target.value))} style={{ borderRadius: 30, width: '200px' }} />
                            </Form.Item>
                        </Form>
                    </Flex >
                    <Row align="center" >
                        <Button type="primary" className="submit-btn" onClick={handleSubmit} style={{ justifyItems: 'center', borderRadius: 30, width: '100%', maxWidth: 150 }}>Submit</Button>
                    </Row>

                    <div className="output" style={{ paddingTop: 30 }}>
                        <Title level={3}>Chỉ số BMI</Title>
                        <Paragraph style={{ color: bmiColor, fontWeight: 500, fontSize: 45 }}>{bmi}</Paragraph>
                        <Title level={4}>Tình trạng</Title>
                        <Paragraph style={{ color: bmiColor, fontWeight: 500, fontSize: 25 }}>{bmiCategory}</Paragraph>
                    </div>

                    <div className="bmi-scale">
                        {BMI_CATEGORIES.map((item, index) => (
                            <div key={index} style={{ '--color': `var(--${item.color})` }}>
                                <Title level={4}>{item.category}</Title>
                                <Paragraph>{item.range}</Paragraph>
                            </div>
                        ))}
                    </div>
                </Card>
            </Flex>
        </DefaultLayout>
    );
};

export default BMI;
