import React, { useState } from 'react';
import { Input, Button, Typography, Form, Flex, Card } from 'antd';
import './BMI.css';
import DefaultLayout from '../../../layout/DefaultLayout';

const { Title, Paragraph } = Typography;

const BMI_CATEGORIES = [
    { category: 'Underweight', range: '< 18.5', color: 'underweight' },
    { category: 'Healthy', range: '18.5 – 25', color: 'healthy' },
    { category: 'Overweight', range: '25 – 30', color: 'overweight' },
    { category: 'Obese', range: '≥ 30', color: 'obese' }
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

        // Determine BMI category
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
                        <Button type="primary" htmlType="submit" style={{ borderRadius: 20, fontSize: 14, textAlign: "center" }} >Submit</Button>
                        <Button htmlType="reset" style={{ borderRadius: 20 }}>Reset</Button>
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
        </DefaultLayout>

    );
};

export default BMI;
