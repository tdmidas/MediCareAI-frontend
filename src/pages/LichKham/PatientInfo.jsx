import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Input, Button, Typography, Divider, Radio } from 'antd';
import { useMediaQuery } from 'react-responsive';
import './PatientInfo.css';
const { Title } = Typography;

const PatientInfo = ({ onNext, onPrev }) => {
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const [note, setNote] = useState('');
    const [diseaseDescription, setDiseaseDescription] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [visitType, setVisitType] = useState('home'); // Default value: 'home'
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const validateForm = () => {
            setIsFormValid(
                note.trim() !== '' &&
                diseaseDescription.trim() !== '' &&
                phone.trim() !== '' &&
                (visitType === 'hospital' || address.trim() !== '') // Address is required only for home visit
            );
        };

        validateForm();
    }, [note, diseaseDescription, phone, address, visitType]);

    const handleNext = () => {
        const patientInfo = {
            note,
            diseaseDescription,
            phone,
            address,
            visitType,
        };
        localStorage.setItem('patientInfo', JSON.stringify(patientInfo));
        onNext();
    };

    return (
        <Row gutter={[16, 16]} justify="center">
            <Col xs={24} sm={20} md={10} style={{ marginTop: 20, width: 800 }}>
                <Card title={<Title level={3}>Thông tin bệnh nhân</Title>} >
                    <Form layout="vertical">
                        <Form.Item label="Loại khám">
                            <Radio.Group onChange={(e) => setVisitType(e.target.value)} value={visitType}>
                                <Radio value="home" >Khám tại nhà</Radio>
                                <Radio value="hospital">Khám tại viện</Radio>
                            </Radio.Group>
                        </Form.Item>
                        {visitType === 'home' && (
                            <Form.Item label="Địa chỉ" required>
                                <Input value={address} onChange={(e) => setAddress(e.target.value)} />
                            </Form.Item>
                        )}
                        <Form.Item label="Số điện thoại" required>
                            <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
            <Col xs={24} sm={20} md={10} style={{ marginTop: 20 }}>
                <Card title={<Title level={3}>Thông tin thêm</Title>}>
                    <Form layout="vertical">
                        <Form.Item label="Miêu tả bệnh" required>
                            <Input.TextArea rows={4} value={diseaseDescription} onChange={(e) => setDiseaseDescription(e.target.value)} />
                        </Form.Item>
                        <Form.Item label="Chú thích thêm với bác sĩ" required>
                            <Input.TextArea rows={4} value={note} onChange={(e) => setNote(e.target.value)} />
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
        </Row>
    );
};

export default PatientInfo;
