import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, DatePicker, Select } from 'antd';
import axios from 'axios';
import "./SelectDate.css";
import { StaticDatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
const SelectDate = ({ onNext }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [availableDoctors, setAvailableDoctors] = useState([]);

    useEffect(() => {
        // Fetch doctors data from API
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/doctors');
                setAvailableDoctors(response.data);
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        };

        fetchDoctors();

        const storedDoctor = JSON.parse(localStorage.getItem('selectedDoctor'));
        if (storedDoctor) {
            setSelectedDoctor(storedDoctor.name);
        }
    }, []);

    const handleDateChange = (date) => {
        // Prevent selecting dates before today
        const today = new Date();
        if (date && date.isBefore(today, 'day')) {
            setSelectedDate(today);
        } else {
            setSelectedDate(date);
        }
    };

    const handleDoctorClick = (doctorName) => {
        setSelectedDoctor(doctorName);
        setSelectedTime(null);
    };

    const handleTimeChange = (value) => {
        setSelectedTime(value);
    };

    const handleNext = () => {
        if (selectedDoctor && selectedDate && selectedTime) {
            const selectedDoctorInfo = availableDoctors.find(doctor => doctor.name === selectedDoctor);
            onNext({
                selectedDoctor: selectedDoctorInfo,
                selectedDate: selectedDate,
                selectedTime: selectedTime
            });
        }
    };

    return (
        <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={12} lg={8}>
                <Card title="With Doctor" >
                    <Row gutter={[16, 16]}>
                        <div
                            style={{
                                maxHeight: '450px',
                                overflowY: 'auto',
                                display: 'flex',
                                flexWrap: 'wrap',
                                justifyContent: 'flex-start',


                            }}
                        >
                            {availableDoctors.map((doctor, index) => (
                                <Col key={doctor.id} xs={24} sm={12} md={12} lg={12}>
                                    <Card
                                        hoverable
                                        onClick={() => handleDoctorClick(doctor.name)}
                                        style={{
                                            width: '100%',
                                            marginBottom: '16px',
                                            cursor: 'pointer',
                                            border: selectedDoctor === doctor.name ? '2px solid #1890ff' : '2px solid transparent',
                                            boxShadow: selectedDoctor === doctor.name ? '0 0px 4px rgb(3, 230, 169)' : 'none'
                                        }} cover={<img alt={doctor.name} src={doctor.photo} />}
                                    >
                                        <Card.Meta title={doctor.name} />
                                    </Card>
                                </Col>
                            ))}
                        </div>
                    </Row>
                </Card>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8}>
                <Card >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <StaticDatePicker
                            label="Select Date"
                            value={selectedDate}
                            onChange={(newValue) => handleDateChange(newValue)}
                            shouldDisableDate={(day) => { return day.isBefore(new Date(), 'day'); }}
                            renderInput={(params) => <input {...params} />}
                        />
                    </LocalizationProvider>                </Card>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8}>
                <Card title="Select Time">

                    {selectedDoctor && selectedDate && availableDoctors.find(doctor => doctor.name === selectedDoctor).availableTimes.map((timeSlot, index) => (
                        <Card
                            key={index}
                            hoverable
                            onClick={() => handleTimeChange(timeSlot.time)}
                            style={{
                                width: '100%',
                                marginBottom: '16px',
                                cursor: 'pointer',
                                borderRadius: '30px',
                                border: selectedTime === timeSlot.time ? '4x solid #1890ff' : '2px solid transparent',
                                boxShadow: selectedTime === timeSlot.time ? '0 0px 4px rgb(3, 230, 169)' : 'none',
                                textAlign: 'center'
                            }}
                        >
                            <Card.Meta title={`${timeSlot.time} (${timeSlot.startHour}:00 - ${timeSlot.endHour}:00)`} />
                        </Card>
                    ))}
                </Card>
            </Col>

            <Col span={24}>
                <Row justify="end">
                    <Button type="primary" onClick={handleNext} disabled={!selectedDate || !selectedDoctor || !selectedTime}>Next</Button>
                </Row>
            </Col>
        </Row>
    );
};

export default SelectDate;
