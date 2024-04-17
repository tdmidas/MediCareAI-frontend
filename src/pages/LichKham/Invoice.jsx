import React from 'react';
import { Row, Col, Card, Typography, Button, Divider } from 'antd';
import './Invoice.css';
import { useNavigate } from 'react-router-dom';
import { CheckCircleOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;

const Invoice = ({ doctorInfo, patientInfo, paymentInfo }) => {
    const navigate = useNavigate();
    const goHome = () => {
        navigate("/");
    };
    return (
        <Row gutter={[16, 16]} justify="center" className="invoice-container">
            <Col xs={24} sm={22} md={20} lg={18} xl={16}>
                <Card className="invoice-card">
                    <Row justify="center" align="middle" style={{ marginBottom: '20px' }}>
                        <Col>
                            <CheckCircleOutlined className='check-icon' style={{ fontSize: '48px', color: '#069390', marginRight: '15px' }} />
                        </Col>
                        <Col>
                            <Title level={2} className="invoice-title" style={{ color: "#069390" }}>Book appointment successfully</Title>
                        </Col>
                    </Row>
                    <Row justify="space-between" align="middle">
                        <Col>
                            <Title level={2} className="invoice-title">Invoice</Title>
                        </Col>
                        <Col>
                            <Text strong>Date:</Text> {new Date().toLocaleDateString()}
                        </Col>
                    </Row>
                    <Divider className="invoice-divider" />

                    <Row>
                        <Col span={24}>
                            <Title level={4}>Doctor Information</Title>
                            {doctorInfo ? (
                                <>
                                    <Text><strong>Name:</strong> {doctorInfo.name}</Text><br />
                                    <Text><strong>Education:</strong> {doctorInfo.education}</Text><br />
                                    <Text><strong>Hospital:</strong> {doctorInfo.hospital}</Text><br />
                                    <Text><strong>Date:</strong> {doctorInfo.date}</Text><br />
                                    <Text><strong>Time:</strong> {doctorInfo.time}</Text><br />
                                    <Text><strong>Booking Fee:</strong> ${doctorInfo.bookingFee}</Text><br />
                                    <Text><strong>VAT (Including 15%):</strong> ${doctorInfo.vat}</Text><br />
                                    <Text><strong>Total:</strong> ${doctorInfo.total}</Text><br />
                                </>
                            ) : (
                                <Text>Doctor information not available</Text>
                            )}
                        </Col>
                    </Row>

                    <Divider className="invoice-divider" />

                    <Row>
                        <Col span={24}>
                            <Title level={4}>Patient Information</Title>
                            {patientInfo ? (
                                <>
                                    <Text><strong>Name:</strong> {patientInfo.name}</Text><br />
                                    <Text><strong>Email:</strong> {patientInfo.email}</Text><br />
                                    <Text><strong>Phone:</strong> {patientInfo.phone}</Text><br />
                                    <Text><strong>Address:</strong> {patientInfo.address}</Text><br />
                                    <Text><strong>DOB:</strong> {patientInfo.dob}</Text><br />
                                </>
                            ) : (
                                <Text>Patient information not available</Text>
                            )}
                        </Col>
                    </Row>

                    <Divider className="invoice-divider" />

                    <Row>
                        <Col span={24}>
                            <Title level={4}>Payment Information</Title>
                            {paymentInfo ? (
                                <>
                                    <Text><strong>Payment Method:</strong> {paymentInfo.paymentMethod === 'creditCard' ? 'Credit Card' : 'Cash'}</Text><br />
                                    {paymentInfo.paymentMethod === 'creditCard' && (
                                        <>
                                            <Text><strong>Name on Card:</strong> {paymentInfo.nameOnCard}</Text><br />
                                            <Text><strong>Card Number:</strong> {paymentInfo.cardNumber}</Text><br />
                                            <Text><strong>Expiry:</strong> {paymentInfo.expiryMonth}/{paymentInfo.expiryYear}</Text><br />
                                            <Text><strong>CVV:</strong> {paymentInfo.cvv}</Text><br />
                                        </>
                                    )}
                                </>
                            ) : (
                                <Text>Payment information not available</Text>
                            )}
                        </Col>
                    </Row>

                    <Divider className="invoice-divider" />

                    <Row justify="end">
                        <Col>
                            <Button onClick={goHome} type="primary" className="invoice-button">Về trang chủ</Button>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
    );
};

export default Invoice;
