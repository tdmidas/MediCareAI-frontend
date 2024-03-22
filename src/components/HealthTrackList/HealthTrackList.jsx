import React from "react";
import HealthTrackData from "../../HealthTrackData";
import { Button, Card, Flex, Typography, Image } from "antd";
import "./HealthTrack.css";
const HealthTrackList = () => {
    return (
        <>
            <Flex align="center" justify="space-between" >
                <Typography.Title level={3} strong>
                    Theo dõi sức khỏe
                </Typography.Title>
                <Button type="link" className="primary--color">
                    Xem thêm
                </Button>
            </Flex>
            <Flex align="center" gap="large">

                <Card
                    key="1"
                    className="blood-pressure-card"
                    hoverable
                    cover={
                        <Image
                            alt="example"
                            src={HealthTrackData[0].picture}
                            style={{ float: "right", width: "120px", height: "120px" }}
                        />
                    }
                    style={{ height: "200px", width: "400px", padding: "20px" }}
                >
                    <Flex >
                        <Flex vertical aligh="flex-start">
                            <Typography.Title level={2} strong>
                                {HealthTrackData[0].name}
                            </Typography.Title>
                            <Typography.Text type="secondary" strong>
                                ---mmHg
                            </Typography.Text>
                        </Flex>
                    </Flex>
                </Card>
                <Card
                    key="2"
                    className="sugar-blood-card"
                    hoverable
                    cover={
                        <Image
                            alt="example"
                            src={HealthTrackData[1].picture}
                            style={{ float: "right", width: "140px", height: "140px" }}
                        />
                    }
                    style={{ height: "200px", width: "400px", padding: "20px" }}
                >
                    <Flex >
                        <Flex vertical aligh="flex-start">
                            <Typography.Title level={2} strong>
                                {HealthTrackData[1].name}
                            </Typography.Title>
                            <Typography.Text type="secondary" strong>
                                ---mmol/L
                            </Typography.Text>
                        </Flex>
                    </Flex>
                </Card>

            </Flex>
        </>

    );
}

export default HealthTrackList;