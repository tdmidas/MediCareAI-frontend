import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Input, Button, Typography, Divider } from 'antd';
import { useMediaQuery } from 'react-responsive';

const { Title } = Typography;

const PatientInfo = ({ user, onNext, onPrev, doctorInfo }) => {
    const isMobile = useMediaQuery({ maxWidth: 768 });

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [diseaseDescription, setDiseaseDescription] = useState('');
    const [phone, setPhone] = useState('');
    const [reasonForVisit, setReasonForVisit] = useState('');
    const [address, setAddress] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const validateForm = () => {
            setIsFormValid(
                firstName.trim() !== '' &&
                lastName.trim() !== '' &&
                diseaseDescription.trim() !== '' &&
                phone.trim() !== '' &&
                reasonForVisit.trim() !== '' &&
                address.trim() !== ''
            );
        };

        validateForm();
    }, [firstName, lastName, diseaseDescription, phone, reasonForVisit, address]);

    const handleNext = () => {
        const patientInfo = {
            firstName,
            lastName,
            diseaseDescription,
            phone,
            reasonForVisit,
            address
        };
        onNext(patientInfo, doctorInfo);
    };

    return (
        <Row gutter={[16, 16]} justify="center">
            {user ? (
                <Col xs={24} sm={20} md={16}>
                    <Card title={<Title level={3}>Patient Information</Title>}>
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <Divider />
                        <Button type="primary" onClick={handleNext} disabled={!isFormValid}>Next</Button>
                    </Card>
                </Col>
            ) : (
                <>
                    <Col xs={24} sm={20} md={10}>
                        <Card title={<Title level={3}>Patient Information</Title>}>
                            <Form layout="vertical">
                                <Form.Item label="First Name" required>
                                    <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                </Form.Item>
                                <Form.Item label="Last Name" required>
                                    <Input value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                </Form.Item>
                                <Form.Item label="Disease Description" required>
                                    <Input.TextArea rows={4} value={diseaseDescription} onChange={(e) => setDiseaseDescription(e.target.value)} />
                                </Form.Item>
                                <Form.Item label="Phone" required>
                                    <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
                                </Form.Item>
                            </Form>
                        </Card>
                    </Col>
                    <Col xs={24} sm={20} md={10}>
                        <Card title={<Title level={3}>Additional Information</Title>}>
                            <Form layout="vertical">
                                <Form.Item label="Reason for Visit" required>
                                    <Input.TextArea rows={4} value={reasonForVisit} onChange={(e) => setReasonForVisit(e.target.value)} />
                                </Form.Item>
                                <Form.Item label="Address" required>
                                    <Input value={address} onChange={(e) => setAddress(e.target.value)} />
                                </Form.Item>
                            </Form>
                        </Card>
                    </Col>
                    <Col xs={24} style={{ marginTop: '24px' }}>
                        <Row justify="end">
                            <Button style={{ marginRight: 8 }} onClick={onPrev}>Back</Button>
                            <Button type="primary" onClick={handleNext} disabled={!isFormValid}>Next</Button>
                        </Row>
                    </Col>
                </>
            )}
        </Row>
    );
};

export default PatientInfo;
