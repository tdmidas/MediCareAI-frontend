import React from 'react';
import { Row, Col, Card, Typography, Button, Form, Input, Checkbox } from 'antd';

const { Title, Paragraph } = Typography;

const Payment = ({ onNext, onPrev, onSubmit, doctorInfo }) => {
    const handleNext = () => {
        onNext();
    };

    const handleSubmit = (values) => {
        // You can handle the form submission here
        onSubmit(values);
    };

    const handlePrev = () => {
        onPrev();
    };

    return (
        <Row gutter={[16, 16]}>
            {doctorInfo && (
                <>
                    <Col span={16}>
                        <Card title="Payment" className="payment-card">
                            <Title level={4}>Total Amount: $XX.XX</Title>
                            <Paragraph>Please proceed with your payment to confirm the appointment.</Paragraph>
                            <Button type="primary" size="large" onClick={handleNext}>Pay Now</Button>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="Booking Summary" className="booking-summary-card">
                            <Paragraph>
                                <strong>{doctorInfo.name}</strong><br />
                                {doctorInfo.education}<br />
                                {doctorInfo.hospital}<br />
                                Date: {doctorInfo.date}<br />
                                Time: {doctorInfo.time}<br />
                                Booking Fee: ${doctorInfo.bookingFee}<br />
                                VAT (Including 15%): ${doctorInfo.vat}<br />
                                <strong>Total: ${doctorInfo.total}</strong><br />
                            </Paragraph>
                        </Card>
                    </Col>
                </>
            )}
            <Col span={24}>
                <Card title="Payment Details">
                    <Form layout="vertical" onFinish={handleSubmit}>
                        <Form.Item name="paymentMethod" label="Payment Method">
                            <Checkbox.Group>
                                <Checkbox value="creditCard">Credit Card</Checkbox>
                                <Checkbox value="cash">Cash</Checkbox>
                                <Checkbox value="paypal">Paypal</Checkbox>
                                <Checkbox value="payoneer">Payoneer</Checkbox>
                            </Checkbox.Group>
                        </Form.Item>
                        <Form.Item name="nameOnCard" label="Name on Card">
                            <Input />
                        </Form.Item>
                        <Form.Item name="cardNumber" label="Card Number">
                            <Input />
                        </Form.Item>
                        <Row gutter={16}>
                            <Col span={8}>
                                <Form.Item name="expiryMonth" label="Expiry Month">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="expiryYear" label="Expiry Year">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="cvv" label="CVV">
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item name="termsAndConditions" valuePropName="checked">
                            <Checkbox>
                                I have read and accept Terms & Conditions
                            </Checkbox>
                        </Form.Item>
                        <Form.Item>
                            <Row justify="space-between">
                                <Button onClick={handlePrev}>Back</Button>
                                <Button type="primary" htmlType="submit">Submit</Button>
                            </Row>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>

        </Row>
    );
};

export default Payment;
