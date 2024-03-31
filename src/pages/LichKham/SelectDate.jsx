import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, DatePicker, Select } from 'antd';
import doctors from "../../data/doctors";

const { Option } = Select;

const SelectDate = ({ onNext }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    useEffect(() => {
        const storedDoctor = JSON.parse(localStorage.getItem('selectedDoctor'));
        if (storedDoctor) {
            setSelectedDoctor(storedDoctor.name); // Set doctor's ID as selectedDoctor
        }
    }, []);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleDoctorChange = (value) => {
        setSelectedDoctor(value);
        setSelectedTime(null); // Reset selected time when doctor changes
    };

    const handleTimeChange = (value) => {
        setSelectedTime(value);
    };

    const handleNext = () => {
        if (selectedDoctor && selectedDate && selectedTime) {
            const selectedDoctorInfo = doctors.find(doctor => doctor.name === selectedDoctor);
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
                <Card title="With Doctor">
                    <Select
                        placeholder="Select Doctor"
                        style={{ width: '100%' }}
                        onChange={handleDoctorChange}
                        showSearch
                        defaultValue={selectedDoctor}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {doctors.map((doctor, index) => (
                            <Option key={doctor.id} value={doctor.name} >
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <img src={doctor.photo} alt={doctor.name} style={{ height: 30, width: '30px', marginRight: '8px' }} />
                                    <div>
                                        <div>{doctor.name}</div>
                                    </div>
                                </div>
                            </Option>
                        ))}
                    </Select>
                </Card>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8}>
                <Card title="Select Date">
                    <DatePicker onChange={handleDateChange} />
                </Card>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8}>
                <Card title="Select Time">
                    <Select placeholder="Select Time" style={{ width: '100%' }} onChange={handleTimeChange} disabled={!selectedDate || !selectedDoctor}>
                        {selectedDoctor && selectedDate && doctors.find(doctor => doctor.name === selectedDoctor).availableTimes.map((timeSlot, index) => (
                            <Option key={index} value={timeSlot.time}>{`${timeSlot.time} (${timeSlot.startHour}:00 - ${timeSlot.endHour}:00)`}</Option>
                        ))}
                    </Select>
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
