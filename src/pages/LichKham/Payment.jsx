import React, { useState } from 'react';
import { Row, Col, Card, Typography, Button, Form, message } from 'antd';
import { CreditCardOutlined, DollarOutlined } from '@ant-design/icons';
import CreditCard from '../../components/CreditCard/CrediCard';
import axios from 'axios';

const { Title } = Typography;

const Payment = ({ onNext, onPrev }) => {
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);

    const handleConfirmPayment = async () => {
        setIsPaymentConfirmed(true);
        const userId = localStorage.getItem('userId');
        const appointmentInfo = {
            userId: userId,

        };

        try {
            await axios.post('YOUR_API_URL_HERE', appointmentInfo);
            message.success('Appointment created successfully');
            onNext(appointmentInfo);
        } catch (error) {
            console.error('Error creating appointment:', error);
            message.error('Failed to create appointment');
        }
    };

    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
    };

    return (
        <Row gutter={[16, 16]}>
            <Col span={23}>
                <Card title="Payment Details">
                    {!isPaymentConfirmed ? (
                        <>
                            <Form layout="vertical">
                                <Form.Item name="paymentMethod" label="Payment Method">
                                    <Button
                                        icon={<CreditCardOutlined />}
                                        onClick={() => handlePaymentMethodChange('creditCard')}
                                        style={{ marginRight: '10px', backgroundColor: paymentMethod === 'creditCard' ? '#47c6c4' : '' }}
                                    >
                                        Credit Card
                                    </Button>
                                    <Button
                                        icon={<DollarOutlined />}
                                        onClick={() => handlePaymentMethodChange('cash')}
                                        style={{ backgroundColor: paymentMethod === 'cash' ? '#47c6c4' : '' }}
                                    >
                                        Tiền mặt
                                    </Button>
                                </Form.Item>
                                {paymentMethod === 'creditCard' && <CreditCard />}

                                <Form.Item>
                                    <Row justify="space-between">
                                        <Button onClick={onPrev}>Back</Button>
                                        <Button type="primary" onClick={handleConfirmPayment}>
                                            Confirm Payment
                                        </Button>
                                    </Row>
                                </Form.Item>
                            </Form>
                        </>
                    ) : null}
                </Card>
            </Col>
        </Row>
    );
};

export default Payment;
