import './Home.css';
import DefaultLayout from '../../layout/DefaultLayout';
import { Flex, Card, Image, Typography, Button } from "antd";
import React from "react";
import Banner from '../../components/Banner/Banner';
import HealthTrackList from '../../components/HealthTrackList/HealthTrackList';
import BLogList from '../../components/BlogList/BlogList';
import DoctorList from '../../components/DoctorList/DoctorList';
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
            <Flex gap="large" wrap='wrap'>
                <MainContentLayout />
                <Flex vertical gap="2.3rem" wrap='wrap'>
                    <Banner />
                    <HealthTrackList />
                    <BLogList />
                    <DoctorList />


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
                        } style={{ maxWidth: 400 }}>
                            <Flex vertical gap="large">
                                <Typography.Title level={4} strong>
                                    The better<br />  health
                                </Typography.Title>
                                <Typography.Title level={4} strong>
                                    The better<br /> life
                                </Typography.Title>

                            </Flex >
                        </Card >
                        <Card style={{ maxWidth: 400 }}>

                            <BasicDateCalendar />
                            <Button className="calendar-btn" size="large" type="primary" onClick={handleClick} style={{ alignContent: "center" }}>
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