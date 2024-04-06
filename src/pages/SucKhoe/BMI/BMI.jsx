import React, { useState } from 'react';
import { Input, Button, Typography, Form, Card } from 'antd';
import './BMI.css';
import DefaultLayout from '../../../layout/DefaultLayout';
import axios from 'axios';
const { Title, Paragraph, Text } = Typography;

const BMI_CATEGORIES = [
    { category: 'Thiếu cân', range: '< 18.5', color: 'underweight' },
    { category: 'Bình thường', range: '18.5 – 25', color: 'healthy' },
    { category: 'Thừa cân', range: '25 – 30', color: 'overweight' },
    { category: 'Béo phì', range: '≥ 30', color: 'obese' }
];

const BMI = () => {
    const [weight, setWeight] = useState(0);
    const [height, setHeight] = useState(0);
    const [bmi, setBMI] = useState(0);
    const [bmiCategory, setBMICategory] = useState('N/A');

    const calculateBMI = () => {
        const heightMeters = height / 100;
        const calculatedBMI = weight / (heightMeters * heightMeters);
        setBMI(calculatedBMI.toFixed(2));

        for (const category of BMI_CATEGORIES) {
            const [min, max] = category.range.split(' – ');
            if (max === '30') {
                if (calculatedBMI >= parseFloat(min)) {
                    setBMICategory(category.category);
                    return;
                }
            } else {
                if (calculatedBMI >= parseFloat(min) && calculatedBMI < parseFloat(max)) {
                    setBMICategory(category.category);
                    return;
                }
            }
        }
        return calculatedBMI;

    };
    const handleSubmit = async () => {

        const userId = localStorage.getItem("userId");

        await axios.post(`http://localhost:5000/api/health/bmi/${userId}`, {
            bmi: parseFloat(bmi),
            status: bmiCategory

        });

    };
    const handleReset = () => {
        setWeight(0);
        setHeight(0);
        setBMI(0);
        setBMICategory('N/A');
    };

    return (
        <DefaultLayout>

            <Card className="container">
                <Title level={1}>Tính chỉ số BMI của bạn</Title>

                <Form className="calculator" onFinish={calculateBMI} onReset={handleReset}>
                    <Form.Item label="Weight (kg)" name="weight" style={{ justifyContent: "center" }}>
                        <Input type="number" min={0} step={0.01} value={weight} onChange={(e) => setWeight(parseFloat(e.target.value))}
                            style={{ borderRadius: 30 }} />
                    </Form.Item>
                    <Form.Item label="Height (cm)" name="height" style={{ justifyContent: "center" }}>
                        <Input type="number" min={0} step={0.01} value={height} onChange={(e) => setHeight(parseFloat(e.target.value))}
                            style={{ borderRadius: 30 }} />
                    </Form.Item>
                    <Form.Item style={{ justifyContent: "center" }}>
                        <Button type="primary" htmlType="submit" style={{ borderRadius: 20 }} onClick={handleSubmit} >
                            <Text style={{ color: "white", paddingBottom: 16, fontSize: 14 }}>
                                Submit
                            </Text>
                        </Button>
                        <Button htmlType="reset" style={{ borderRadius: 20 }}>
                            <Text strong style={{ color: "white", paddingBottom: 16, fontSize: 14 }}>
                                Reset
                            </Text></Button>
                    </Form.Item>
                </Form>

                <div className="output">
                    <Title level={3}>Your BMI is</Title>
                    <Paragraph id="bmi" style={{ color: `var(--${bmiCategory.toLowerCase()})` }}>{bmi}</Paragraph>
                    <Paragraph id="desc">You are <b>{bmiCategory}</b></Paragraph>
                </div>

                <div className="bmi-scale">
                    {BMI_CATEGORIES.map((item, index) => (
                        <div key={index} style={{ '--color': `var(--${item.category.toLowerCase()})` }}>
                            <Title level={4}>{item.category}</Title>
                            <Paragraph>{item.range}</Paragraph>
                        </div>
                    ))}
                </div>
            </Card>
        </DefaultLayout >

    );
};

export default BMI;
