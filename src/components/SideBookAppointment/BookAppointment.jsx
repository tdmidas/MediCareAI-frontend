import React from 'react';
import { Card, Typography, Button, Flex, } from 'antd';
import './BookAppointment.css';
const { Text } = Typography;

const BookAppointment = () => {
    return (
        <Card className="book-appointment-card" bordered={false} style={{ maxWidth: 350, height: 400 }}>
            <Flex gap="10px" align='center'>
                <Typography.Title level={4}>Ticket Price</Typography.Title>
                <Typography.Text strong>₹200</Typography.Text>
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

            <Button type="primary" className="book-appointment-button">
                Book Appointment
            </Button>
        </Card>
    );
};

export default BookAppointment;
