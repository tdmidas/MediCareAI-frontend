import './Home.css';
import DefaultLayout from '../../layout/DefaultLayout';
import { Flex, Card, Image, Typography, Button } from "antd";
import React from "react";
import Banner from '../../components/Banner/Banner';
import HealthTrackList from '../../components/HealthTrackList/HealthTrackList';
import BLogList from '../../components/BlogList/BlogList';
import MainContentLayout from "../../layout/MainContentLayout";
import SideContentLayout from '../../layout/SideContentLayout';
import BasicDateCalendar from '../../components/Calendar/Calendar';
import { useNavigate } from 'react-router-dom';
const doctor = require("../../assets/doctor-1.png")

const Home = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/lichkham');
    };
    return (
        <DefaultLayout>
            <Flex gap="large">
                <MainContentLayout />
                <Flex vertical gap="2.3rem">
                    <Banner />
                    <HealthTrackList />
                    <BLogList />
                    <HealthTrackList />
                </Flex>
                <MainContentLayout />
                <SideContentLayout>
                    <Flex vertical gap="large">
                        <Card className="side-card" cover={
                            <Image
                                preview={false}
                                alt="example"
                                src={doctor}
                                style={{ float: "right", position: "absolute", paddingBottom: "72px", paddingLeft: "90px", width: "auto", height: "300px" }}
                            />
                        }>
                            <Flex vertical gap="large">
                                <Typography.Title level={4} strong>
                                    The better<br />  health
                                </Typography.Title>
                                <Typography.Title level={4} strong>
                                    The better<br /> life
                                </Typography.Title>

                            </Flex >
                        </Card >
                        <Card  >
                            <BasicDateCalendar />
                            <Button className="calendar-btn" size="large" type="primary" onClick={handleClick}>
                                Đặt lịch khám
                            </Button>
                        </Card>
                    </Flex>


                </SideContentLayout>
            </Flex >


        </DefaultLayout >

    );
}

export default Home;