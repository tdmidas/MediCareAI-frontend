import React, { useState } from 'react';
import { Row, Col, Card, Typography, Form, Input, Button } from 'antd';
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
    const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
    const handleNext = () => {
        // You can perform validation here before proceeding to the next step
        const patientInfo = {
            firstName,
            lastName,
            diseaseDescription,
            phone,
            reasonForVisit,
            address
        };
        onNext(patientInfo, doctorInfo); // Pass patientInfo and doctorInfo to onNext
    };

    return (
        <Row gutter={[16, 16]}>
            {user ? (
                <Col span={24}>
                    <Card title="Patient Information">
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                    </Card>
                </Col>
            ) : (
                <>
                    <Col xs={24} sm={24} md={12}>
                        <Card title="Patient Information">
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
                    <Col xs={24} sm={24} md={isMobile ? 24 : 12}>
                        <Card title="Additional Information">
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
                </>
            )}
            <Col span={24}>
                <Row justify="end">

                    <Button style={{ marginRight: 8 }} onClick={onPrev}>Back</Button>
                    <Button type="primary" onClick={handleNext}>Next</Button>
                </Row>
            </Col>
        </Row>
    );
};

export default PatientInfo;
