import React from 'react';
import { Card, Typography, Button, Flex } from 'antd';
import './BookAppointment.css'; // Add CSS file for custom styles

const BookAppointment = () => {
    return (
        <Card className="book-appointment-card" bordered={false} style={{ width: 350, height: 800 }}>
            <Flex gap="10px" align='center'>
                <Typography.Title level={4}>Ticket Price</Typography.Title>
                <Typography.Text strong>₹200</Typography.Text>
            </Flex>
            <Typography.Text strong>Available Time Slots:</Typography.Text>
            <ul className="time-slots">
                <li>
                    <span>Sunday</span>
                    <span>4:00 PM - 9:30 PM</span>
                </li>
                <li>
                    <span>Monday</span>
                    <span>4:00 PM - 9:30 PM</span>
                </li>
                <li>
                    <span>Tuesday</span>
                    <span>4:00 PM - 9:30 PM</span>
                </li>
                <li>
                    <span>Wednesday</span>
                    <span>4:00 PM - 9:30 PM</span>
                </li>
            </ul>
            <Button type="primary" className="book-appointment-button">
                Book Appointment
            </Button>
        </Card>
    );
};

export default BookAppointment;
