import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, Tabs, Rate, Image, Flex, Typography } from 'antd';
import doctors from "../../data/doctors";
import reviews from '../../data/reviews';
import DefaultLayout from '../../layout/DefaultLayout';
import MainContentLayout from "../../layout/MainContentLayout";
import SideContentLayout from '../../layout/SideContentLayout';
import BookAppointment from '../../components/SideBookAppointment/BookAppointment';
const { TabPane } = Tabs;

const DoctorDetail = () => {
    const { slug } = useParams();
    const doctor = doctors.find(doc => doc.id === slug);

    if (!doctor) {
        return <div>Doctor not found</div>;
    }

    const renderFeedback = () => {
        return reviews.map(review => (
            <Card key={review.id} style={{ marginBottom: 16 }}>
                <h4>{review.name}</h4>
                <p>{review.review}</p>
                <Rate disabled defaultValue={review.rating} />
            </Card>
        ));
    };

    return (
        <DefaultLayout>
            <Flex gap="large">
                <MainContentLayout>
                    <Flex align="center" justify="space-between">
                        <Card style={{ marginBottom: 16, width: 800, background: "transparent", border: "none" }}>
                            <Flex gap="large"><Image src={doctor.photo} alt={doctor.name} style={{ height: 200, width: 200, float: "left" }} />

                                <Flex gap="10px" style={{ flex: 1, flexDirection: "column" }}>
                                    <Typography.Title level={3}>{doctor.name}</Typography.Title>
                                    <Typography.Text style={{ background: "#c0f1ef", borderRadius: 10, width: 100, height: 40, textAlign: "center", padding: 10, fontWeight: 550, color: "#069390" }}>
                                        {doctor.specialty}
                                    </Typography.Text>
                                    <Rate disabled defaultValue={doctor.avgRating} />
                                    <Typography.Text>{doctor.totalRating} reviews</Typography.Text>
                                    <Typography.Text>{doctor.short}</Typography.Text>
                                </Flex></Flex>

                        </Card>
                    </Flex>
                    <Tabs defaultActiveKey="1" style={{ marginBottom: 16 }}>
                        <TabPane tab="About" key="1">
                            <p>{doctor.short}</p>
                        </TabPane>
                        <TabPane tab="Feedback" key="2">
                            {renderFeedback()}
                        </TabPane>
                    </Tabs>

                </MainContentLayout>
                <SideContentLayout>

                    <BookAppointment />
                </SideContentLayout>
            </Flex>
        </DefaultLayout>
    );
};

export default DoctorDetail;
