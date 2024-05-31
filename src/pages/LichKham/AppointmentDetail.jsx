import React from 'react';
import { Row, Col, Card, Typography, Button, Divider, Flex } from 'antd';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Invoice.css';
import { useNavigate } from 'react-router-dom';
import { CheckCircleOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
import DefaultLayout from '../../layout/DefaultLayout';
import MainContentLayout from '../../layout/MainContentLayout';
const { Title, Text } = Typography;

const AppointmentDetail = () => {

    const isMobile = useMediaQuery({ maxWidth: 768 });
    const [appointments, setAppointments] = useState([]);
    const { slug } = useParams();
    const fetchAppointment = async () => {
        try {
            const userId = localStorage.getItem('userId');
            const response = await axios.get(`https://medi-care-ai-backend-qjg1y3sxj-djais-projects.vercel.app/api/appointments/my/${userId}`);
            setAppointments(response.data);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };
    const appointmentInfo = appointments.find(app => app.appointmentId === slug);

    useEffect(() => {
        fetchAppointment();
    }, []);

    return (
        <DefaultLayout>
            <MainContentLayout>
                <Flex wrap='wrap' justify='center' style={{ marginTop: 50, marginLeft: isMobile ? 0 : 180, marginBottom: 20 }}>
                    <Col xs={24} sm={22} md={20} lg={18} xl={16}>
                        <Card className="invoice-card" style={{ width: isMobile ? '100%' : '600px', margin: 'auto' }}>
                            <Row justify="center" align="middle" style={{ marginBottom: '20px' }}>

                                <Col>
                                    <Title level={2} className="invoice-title" style={{ color: "#069390" }}>Chi tiết lịch khám của bạn</Title>
                                </Col>
                            </Row>
                            <Row justify="space-between" align="middle">
                                <Col>
                                    <Title level={2} className="invoice-title">Invoice</Title>
                                    <Text strong>Appointment ID: {appointmentInfo && appointmentInfo.appointmentId}</Text>

                                </Col>
                                <Col>
                                    <Text strong>Date:</Text> {new Date().toLocaleDateString()}
                                </Col>
                            </Row>
                            <Divider className="invoice-divider" />

                            <Row>
                                <Col span={24}>
                                    <Title level={4}>Thông tin bác sĩ</Title>

                                    {appointmentInfo && (
                                        <>
                                            <Text><strong>Name:</strong> {appointmentInfo.doctorName}</Text><br />
                                            <Text><strong>Date:</strong> {appointmentInfo.bookDate}</Text><br />
                                            <Text><strong>Time:</strong> {appointmentInfo.dayTime}</Text><br />
                                            <Text><strong>Start time:</strong> {appointmentInfo.startHour}</Text><br />
                                            <Text><strong>End time:</strong> {appointmentInfo.endHour}</Text><br />
                                            <Text><strong>Total:</strong> ${appointmentInfo.totalPrice}đ</Text><br />
                                        </>
                                    )}

                                </Col>
                            </Row>

                            <Divider className="invoice-divider" />

                            <Row>
                                <Col span={24}>
                                    <Title level={4}>Thông tin bệnh nhân</Title>

                                    {appointmentInfo && (
                                        <>
                                            <Text><strong>Name:</strong> {localStorage.getItem('displayName')}</Text><br />
                                            <Text><strong>Email:</strong> {localStorage.getItem('email')}</Text><br />
                                            <Text><strong>Phone:</strong> {appointmentInfo.phone}</Text><br />
                                            <Text><strong>Note:</strong> {appointmentInfo.note}</Text><br />
                                        </>
                                    )}

                                </Col>
                            </Row>

                            <Divider className="invoice-divider" />

                            <Row>
                                <Col span={24}>
                                    <Title level={4}>Thông tin thanh toán</Title>

                                    {appointmentInfo && (
                                        <>
                                            <Text><strong>Payment Method:</strong> {appointmentInfo.payMethod === 'creditCard' ? 'Credit Card' : 'Cash'}</Text><br />
                                            {appointmentInfo.payMethod === 'creditCard' && (
                                                <>
                                                    <Text><strong>Name on Card:</strong> {appointmentInfo.nameOnCard}</Text><br />
                                                    <Text><strong>Card Number:</strong> {appointmentInfo.cardNumber}</Text><br />
                                                    <Text><strong>Expiry:</strong> {appointmentInfo.expiryMonth}/{appointmentInfo.expiryYear}</Text><br />
                                                    <Text><strong>CVV:</strong> {appointmentInfo.cvv}</Text><br />
                                                </>
                                            )}
                                        </>
                                    )}

                                </Col>
                            </Row>

                            <Divider className="invoice-divider" />

                        </Card>
                    </Col>
                </Flex>
            </MainContentLayout>
        </DefaultLayout>
    );
};

export default AppointmentDetail;
