import React from 'react';
import { Row, Col, Card, Typography, Button, Divider, Flex } from 'antd';
import './Invoice.css';
import { useNavigate } from 'react-router-dom';
import { CheckCircleOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
const { Title, Text } = Typography;

const Invoice = () => {
    const navigate = useNavigate();
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const appointmentInfo = JSON.parse(localStorage.getItem('appointmentInfo'));
    const goHome = () => {
        navigate('/');
    }
    const goAppointment = () => {
        navigate('/me/appointment/');
    }

    return (
        <Flex wrap='wrap' justify='center' style={{ marginTop: 50, marginLeft: isMobile ? 0 : 180, marginBottom: 20 }}>
            <Col xs={24} sm={22} md={20} lg={18} xl={16}>
                <Card className="invoice-card" style={{ width: isMobile ? '100%' : '600px', margin: 'auto' }}>
                    <Row justify="center" align="middle" style={{ marginBottom: '20px' }}>
                        <Col>
                            <CheckCircleOutlined className='check-icon' style={{ fontSize: '48px', color: '#069390', marginRight: '15px' }} />
                        </Col>
                        <Col>
                            <Title level={2} className="invoice-title" style={{ color: "#069390" }}>Đặt lịch khám thành công</Title>
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
                            <Title level={4}>Thông tin bác sĩ</Title>

                            <Text><strong>Name:</strong> {appointmentInfo.doctorName}</Text><br />
                            <Text><strong>Date:</strong> {appointmentInfo.bookDate}</Text><br />
                            <Text><strong>Time:</strong> {appointmentInfo.dayTime}</Text><br />
                            <Text><strong>Start time:</strong> {appointmentInfo.startHour}</Text><br />
                            <Text><strong>End time:</strong> {appointmentInfo.endHour}</Text><br />
                            <Text><strong>Total:</strong> ${appointmentInfo.totalPrice}đ</Text><br />

                        </Col>
                    </Row>

                    <Divider className="invoice-divider" />

                    <Row>
                        <Col span={24}>
                            <Title level={4}>Thông tin bệnh nhân</Title>

                            <Text><strong>Name:</strong> {localStorage.getItem('displayName')}</Text><br />
                            <Text><strong>Email:</strong> {localStorage.getItem('email')}</Text><br />
                            <Text><strong>Phone:</strong> {appointmentInfo.phone}</Text><br />
                            <Text><strong>Note:</strong> {appointmentInfo.note}</Text><br />

                        </Col>
                    </Row>

                    <Divider className="invoice-divider" />

                    <Row>
                        <Col span={24}>
                            <Title level={4}>Thông tin thanh toán</Title>

                            <Text><strong>Payment Method:</strong> {appointmentInfo.payMethod === 'creditCard' ? 'Credit Card' : 'Cash'}</Text><br />
                            {appointmentInfo.payMethod === 'creditCard' && (
                                <>
                                    <Text><strong>Name on Card:</strong> {appointmentInfo.nameOnCard}</Text><br />
                                    <Text><strong>Card Number:</strong> {appointmentInfo.cardNumber}</Text><br />
                                    <Text><strong>Expiry:</strong> {appointmentInfo.expiryMonth}/{appointmentInfo.expiryYear}</Text><br />
                                    <Text><strong>CVV:</strong> {appointmentInfo.cvv}</Text><br />
                                </>
                            )}

                        </Col>
                    </Row>

                    <Divider className="invoice-divider" />

                    <Flex wrap='wrap' gap={20} justify='center'>
                        <Button type="primary" onClick={goHome}>Về trang chủ</Button>
                        <Button onClick={goAppointment} style={{ backgroundColor: 'white', color: '#069390' }}>Xem lịch khám của tôi</Button>
                    </Flex>
                </Card>
            </Col>
        </Flex>
    );
};

export default Invoice;
