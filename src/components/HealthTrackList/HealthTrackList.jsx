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
                {HealthTrackData.slice(0, 2).map((item) => (<Card
                    key="1"
                    className="blood-pressure-card"
                    hoverable
                    cover={
                        <Image
                            alt="example"
                            src={item.picture}
                            style={{ float: "right", width: "120px", height: "120px" }}
                        />
                    }
                    style={{ height: "180px", width: "400px", padding: "20px", marginBottom: "20px" }}
                >
                    <Flex >
                        <Flex vertical aligh="flex-start">
                            <Typography.Title level={2} strong>
                                {item.name}
                            </Typography.Title>
                            <Typography.Text type="secondary" strong>
                                ---{item.measure}
                            </Typography.Text>
                        </Flex>
                    </Flex>
                </Card>))

                }

            </Flex>
        </>

    );
}

export default HealthTrackList;