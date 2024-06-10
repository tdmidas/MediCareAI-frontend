import React, { useState, useEffect } from 'react';
import { Card, Typography, Button, Flex, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LoadingOutlined } from '@ant-design/icons';
import './BookAppointment.css';
const { Text, Title } = Typography;

const BookAppointment = ({ doctor }) => {
    const navigate = useNavigate();
    const [availableTimes, setAvailableTimes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDoctorDetails = async () => {
            try {
                const response = await axios.get(`https://tdmidas.id.vn/api/doctors/${doctor.doctorId}`);
                setAvailableTimes(response.data.availableTimes);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching doctor details:", error);
                setLoading(false);
            }
        };

        fetchDoctorDetails();
    }, [doctor.doctorId]);

    const handleBookAppointment = () => {
        navigate('/lichkham');
        localStorage.setItem('selectedDoctor', JSON.stringify(doctor));
    };

    if (loading) {
        return (
            <Card className="book-appointment-card" bordered={false} style={{ maxWidth: 350, height: 400 }}>
                <Spin indicator={<LoadingOutlined />} size="large" tip="Loading available times..." />
            </Card>
        );
    }

    return (
        <Card className="book-appointment-card" style={{ maxWidth: 300, height: 400 }}>
            <Flex gap="10px" align='center' vertical justify='center' wrap='wrap'>

                <Title level={4} style={{ color: "#069390" }}>Available Time Slots:</Title>

                <Flex align='center' justify='center' >
                    <ul className="time-slots" >
                        {availableTimes.map((timeSlot, index) => (
                            <li key={index} style={{ marginTop: 5 }}>
                                <Text type='primary' style={{ color: "#025150", fontSize: 17 }} strong >{timeSlot.time}: </Text>
                                <Text type="primary" style={{ fontSize: 16 }} strong>{`${timeSlot.startHour}:00 - ${timeSlot.endHour}:00 `}</Text>
                            </li>
                        ))}
                    </ul>
                </Flex>
                <Flex gap="10px" align='center'>
                    <Typography.Title level={4}>Booking price: <span style={{ color: "#069390" }}>${doctor.price}</span></Typography.Title>
                </Flex>
                <Button type="primary" className="book-appointment-button" onClick={handleBookAppointment}>
                    Book Appointment
                </Button>
            </Flex>
        </Card>
    );
};

export default BookAppointment;
