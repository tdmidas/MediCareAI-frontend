import React, { useState } from 'react';
import { Row, Col, Card, Typography, Button, Form, message, Input } from 'antd';
import { CreditCardOutlined, DollarOutlined } from '@ant-design/icons';
import axios from 'axios';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';

const { Title } = Typography;

const Payment = ({ onNext, onPrev }) => {
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);
    const [creditCardDetails, setCreditCardDetails] = useState({
        number: '',
        expiryMonth: '',
        expiryYear: '',
        cvc: '',
        name: '',
        focus: '',
    });

    const handleInputChange = (evt) => {
        const { name, value } = evt.target;
        setCreditCardDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handleInputFocus = (evt) => {
        setCreditCardDetails((prev) => ({ ...prev, focus: evt.target.name }));
    };

    const handleConfirmPayment = async () => {
        setIsPaymentConfirmed(true);
        const userId = localStorage.getItem('userId');
        const patientInfo = JSON.parse(localStorage.getItem('patientInfo'));
        const selectedDoctor = JSON.parse(localStorage.getItem('selectedDoctor'));

        const appointmentInfo = {
            userId,
            userName: localStorage.getItem('displayName'),
            payMethod: paymentMethod,
            nameOnCard: creditCardDetails.name,
            cardNumber: creditCardDetails.number,
            expiryMonth: creditCardDetails.expiryMonth,
            expiryYear: creditCardDetails.expiryYear,
            cvv: creditCardDetails.cvc,
            isPaid: true,
            ...patientInfo,
            ...selectedDoctor,
        };
        localStorage.setItem('appointmentInfo', JSON.stringify(appointmentInfo));
        try {
            await axios.post('https://tdmidas.id.vn/api/appointments', appointmentInfo);
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
            <Col span={24} style={{ marginTop: 20, width: 800 }}>
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
                                {paymentMethod === 'creditCard' && (
                                    <div>
                                        <Cards
                                            number={creditCardDetails.number}
                                            expiry={`${creditCardDetails.expiryMonth}/${creditCardDetails.expiryYear}`}
                                            cvc={creditCardDetails.cvc}
                                            name={creditCardDetails.name}
                                            focused={creditCardDetails.focus}
                                        />
                                        <Form.Item label="Name on Card">
                                            <Input
                                                type="text"
                                                name="name"
                                                value={creditCardDetails.name}
                                                onChange={handleInputChange}
                                                onFocus={handleInputFocus}
                                            />
                                        </Form.Item>
                                        <Form.Item label="Card Number">
                                            <Input
                                                type="text"
                                                name="number"
                                                value={creditCardDetails.number}
                                                onChange={handleInputChange}
                                                onFocus={handleInputFocus}
                                            />
                                        </Form.Item>
                                        <Row gutter={16}>
                                            <Col span={8}>
                                                <Form.Item label="Expiry Month">
                                                    <Input
                                                        type="text"
                                                        name="expiryMonth"
                                                        placeholder="MM"
                                                        value={creditCardDetails.expiryMonth}
                                                        onChange={handleInputChange}
                                                        onFocus={handleInputFocus}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={8}>
                                                <Form.Item label="Expiry Year">
                                                    <Input
                                                        type="text"
                                                        name="expiryYear"
                                                        placeholder="YY"
                                                        value={creditCardDetails.expiryYear}
                                                        onChange={handleInputChange}
                                                        onFocus={handleInputFocus}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={8}>
                                                <Form.Item label="CVV">
                                                    <Input
                                                        type="text"
                                                        name="cvc"
                                                        value={creditCardDetails.cvc}
                                                        onChange={handleInputChange}
                                                        onFocus={handleInputFocus}
                                                    />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </div>
                                )}

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
