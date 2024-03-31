import React from 'react';
import { Card, Typography, Button, Flex } from 'antd';
import './BookAppointment.css';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

const BookAppointment = ({ doctor }) => {
    const navigate = useNavigate();

    // Function to handle booking appointment
    const handleBookAppointment = () => {
        // Navigate to the appointment tab
        navigate('/lichkham');

        // Save the selected doctor's information to local storage
        localStorage.setItem('selectedDoctor', JSON.stringify(doctor));
    };

    return (
        <Card className="book-appointment-card" bordered={false} style={{ maxWidth: 350, height: 400 }}>
            <Flex gap="10px" align='center'>
                <Typography.Title level={4}>Booking price</Typography.Title>
                <Typography.Text strong>${doctor.price}</Typography.Text>
            </Flex>
            <Typography.Text strong>Available Time Slots:</Typography.Text>

            <Flex align='center' gap="20px" >
                <ul className="time-slots">
                    <li>
                        <Text strong>Sunday</Text>
                        <Text type="secondary">4:00 PM - 9:30 PM</Text>
                    </li>
                    <li>
                        <Text strong>Monday</Text>
                        <Text type="secondary">4:00 PM - 9:30 PM</Text>
                    </li>
                    <li>
                        <Text strong>Tuesday</Text>
                        <Text type="secondary">4:00 PM - 9:30 PM</Text>
                    </li>
                    <li>
                        <Text strong>Wednesday</Text>
                        <Text type="secondary">4:00 PM - 9:30 PM</Text>
                    </li>
                </ul>
            </Flex>

            <Button type="primary" className="book-appointment-button" onClick={handleBookAppointment}>
                Book Appointment
            </Button>
        </Card>
    );
};

export default BookAppointment;
