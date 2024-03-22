import React from 'react';
import { Card, Flex, Image, Typography } from 'antd';
import "./HomeSideContent.css";
const doctor = require("../../assets/doctor-1.png")
const HomeSideContent = () => {
    return (

        <Card className="side-card" cover={
            <Image
                alt="example"
                src={doctor}
                style={{ float: "right", position: "absolute", paddingBottom: "70px", paddingLeft: "90px", width: "auto", height: "300px" }}
            />
        }>
            <Flex vertical gap="large">
                <Typography.Title level={4} strong>
                    Your <br /> health
                </Typography.Title>
                <Typography.Title level={4} strong>
                    always <br />comes first
                </Typography.Title>

            </Flex >
        </Card >

    );
}

export default HomeSideContent;