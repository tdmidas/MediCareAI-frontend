import React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Tabs, Rate, Image, Flex, Typography, Button, Input, Form, message, Spin } from 'antd';
import DefaultLayout from '../../layout/DefaultLayout';
import MainContentLayout from "../../layout/MainContentLayout";
import SideContentLayout from '../../layout/SideContentLayout';
import BookAppointment from '../../components/SideBookAppointment/BookAppointment';
import axios from 'axios';
import "./DoctorDetail.css";
import { LoadingOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { TabPane } = Tabs;
const { Text, Title } = Typography;
const DoctorDetail = () => {
    const [reviewContent, setReviewContent] = useState('');
    const [rating, setRating] = useState(0);
    const [doctors, setDoctors] = React.useState([]);
    const [reviews, setReviews] = useState([]);

    const desc = ['Quá tệ', 'Tệ', 'Khá oke', 'Quá tốt lun', 'Trên cả tuyệt vời'];
    const { slug } = useParams();

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://tdmidas.id.vn/api/doctors`);
            setDoctors(response.data);
        } catch (error) {
            console.log("Error fetching data", error);
        }
    };
    const doctor = doctors.find(doc => doc.doctorId === slug);

    const fetchReviews = async () => {
        try {
            const response = await axios.get(`https://tdmidas.id.vn/api/reviews/${doctor.doctorId}`,);
            setReviews(response.data);
        } catch (error) {
            console.log("Error fetching reviews data", error);
        }
    };
    React.useEffect(() => {
        fetchData();
    }, []);

    React.useEffect(() => {
        if (doctor) {
            fetchReviews();
        }
    }, [doctor]);


    if (!doctor) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
            }}>
                <Spin indicator={<LoadingOutlined />} size="large" tip="Loading doctor..." />
            </div>
        );
    }


    const handleSubmitReview = async () => {
        try {
            const reviewData = {
                doctorId: doctor.doctorId,
                userId: localStorage.getItem('userId'),
                displayName: localStorage.getItem('displayName'),
                rating: rating,
                content: reviewContent,
            };

            await axios.post('https://tdmidas.id.vn/api/reviews/', reviewData);
            message.success('Review submitted successfully');
            setReviewContent('');
            setRating(0);

        } catch (error) {
            console.error('Error submitting review:', error);
            message.error('Error submitting review');
        }
    };

    const renderFeedback = () => {
        if (reviews.length === 0) {
            return (
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <Text>No reviews available yet.</Text>
                </div>)
        }


        return reviews.map(review => (
            <Card key={review.reviewId} style={{ marginBottom: 16 }}>
                <Flex>
                    <Image preview={false} src={review.photoURL} alt={review.displayName} style={{ borderRadius: 30, height: 40, width: 40, float: "left" }} />
                    <Title level={5} style={{ padding: 5 }}>{review.displayName}</Title>
                </Flex>
                <Rate disabled defaultValue={review.rating} />
                <p>{review.content}</p>
            </Card>
        ));
    };


    return (
        <DefaultLayout>
            <Flex gap="large" wrap='wrap'>
                <MainContentLayout>
                    <Flex align="center" justify="space-between" >
                        <Card style={{ marginBottom: 16, maxWidth: 800, background: "transparent", border: "none" }}>
                            <Flex gap="large" wrap='wrap'>
                                <Image preview={false} src={doctor.photo} alt={doctor.name} style={{ borderRadius: 10, height: 200, width: 200, float: "left" }} />

                                <Flex gap="5px" wrap='wrap' style={{ flex: 1, flexDirection: "column" }}>
                                    <Typography.Text style={{ background: "#c0f1ef", borderRadius: 10, width: 130, height: 40, textAlign: "center", padding: 10, fontWeight: 550, color: "#069390" }}>
                                        {doctor.speciality}
                                    </Typography.Text>
                                    <Typography.Title level={3}>{doctor.name}</Typography.Title>

                                    <Rate disabled defaultValue={doctor.avgRating} />
                                    <Typography.Text>{doctor.totalRating} reviews</Typography.Text>
                                    <Typography.Text>{doctor.short}</Typography.Text>
                                </Flex>
                            </Flex>

                        </Card>
                    </Flex>
                    <Tabs defaultActiveKey="1" style={{ marginBottom: 16 }} >
                        <TabPane tab="Về bác sĩ" key="1">
                            <Title level={4}>Giới thiệu</Title>
                            <Text>{doctor.full}</Text>
                            <Title level={4}>Bệnh viện công tác</Title>
                            <Text>{doctor.hospital}</Text>
                        </TabPane>
                        <TabPane tab="Đánh giá" key="2">
                            {renderFeedback()}
                        </TabPane>
                        <TabPane tab="Viết đánh giá" key="3">
                            <Form>
                                <Form.Item label="Rating">
                                    <Rate tooltips={desc} value={rating} onChange={value => setRating(value)} />
                                </Form.Item>
                                <Form.Item label="Review">
                                    <TextArea
                                        rows={4}
                                        value={reviewContent}
                                        onChange={e => setReviewContent(e.target.value)}
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" onClick={handleSubmitReview}>
                                        Submit Review
                                    </Button>
                                </Form.Item>
                            </Form>
                        </TabPane>
                    </Tabs>

                </MainContentLayout>
                <SideContentLayout>

                    <BookAppointment doctor={doctor} />
                </SideContentLayout>
            </Flex>
        </DefaultLayout>
    );
};

export default DoctorDetail;
