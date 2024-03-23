import './Home.css';
import DefaultLayout from '../../layout/DefaultLayout';
import { Flex, Card, Image, Typography } from "antd";
import React from "react";
import Banner from '../../components/Banner/Banner';
import HealthTrackList from '../../components/HealthTrackList/HealthTrackList';
import BLogList from '../../components/BlogList/BlogList';
import MainContentLayout from "../../layout/MainContentLayout";
import SideContentLayout from '../../layout/SideContentLayout';
const doctor = require("../../assets/doctor-1.png")

const Home = () => {
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
                    </Flex>
                </SideContentLayout>
            </Flex>


        </DefaultLayout>

    );
}

export default Home;