import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, Tabs, Rate, Image, Flex, Typography } from 'antd';
import reviews from '../../data/reviews';
import DefaultLayout from '../../layout/DefaultLayout';
import MainContentLayout from "../../layout/MainContentLayout";
import SideContentLayout from '../../layout/SideContentLayout';
import BookAppointment from '../../components/SideBookAppointment/BookAppointment';
import axios from 'axios';
import "./DoctorDetail.css";
const { TabPane } = Tabs;
const { Text } = Typography;
const DoctorDetail = () => {

    const [doctors, setDoctors] = React.useState([]);
    React.useEffect(() => {
        axios.get("http://localhost:5000/api/doctors")
            .then(response => {
                setDoctors(response.data);
            })
            .catch(error => {
                console.log("Error fetching data", error);
            });
    }, []);

    const { slug } = useParams();
    const doctor = doctors.find(doc => doc.doctorId === slug);

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
            <Flex gap="large" wrap='wrap'>
                <MainContentLayout>
                    <Flex align="center" justify="space-between" >
                        <Card style={{ marginBottom: 16, maxWidth: 800, background: "transparent", border: "none" }}>
                            <Flex gap="large" wrap='wrap'>
                                <Image preview={false} src={doctor.photo} alt={doctor.name} style={{ borderRadius: 10, height: 200, width: 200, float: "left" }} />

                                <Flex gap="5px" wrap='wrap' style={{ flex: 1, flexDirection: "column" }}>
                                    <Typography.Text style={{ background: "#c0f1ef", borderRadius: 10, width: 130, height: 40, textAlign: "center", padding: 10, fontWeight: 550, color: "#069390" }}>
                                        {doctor.specialty}
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
                        <TabPane tab="About" key="1">
                            <Text>{doctor.full}</Text>
                        </TabPane>
                        <TabPane tab="Feedback" key="2">
                            {renderFeedback()}
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
