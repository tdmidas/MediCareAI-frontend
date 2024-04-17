import React, { useState } from 'react';
import { Row, Col, Card, Typography, Button, Form, Checkbox } from 'antd';
import { CreditCardOutlined, DollarOutlined } from '@ant-design/icons';
import CreditCard from '../../components/CreditCard/CrediCard';
import 'react-credit-cards-2/dist/es/styles-compiled.css';

const { Title } = Typography;

const Payment = ({ onNext, onPrev }) => {
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);

    const handleConfirmPayment = () => {
        setIsPaymentConfirmed(true);

        // Prepare payment info
        const paymentInfo = {
            paymentMethod,
        };

        // Pass paymentInfo to the next step
        onNext(paymentInfo);
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
