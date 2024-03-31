import React from "react";
import HealthTrackData from "../../HealthTrackData";
import "./HealthTrack.css";

import { Button, Card, Flex, Typography, Image } from "antd";
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { Link } from "react-router-dom";
import slug from "slug";
const HealthTrackList = () => {
    const navigate = useNavigate();
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const handleClick = () => {
        navigate('/suckhoe');
    };
    return (
        <Flex gap="large" vertical>
            <Flex align="center" justify="space-between" wrap="wrap">
                <Typography.Title level={3} strong>
                    Nhật ký sức khỏe
                </Typography.Title>
                <Button type="link" className="primary--color" onClick={handleClick}>
                    Xem thêm
                </Button>
            </Flex>
            <Flex wrap="wrap" align="center" gap="large">

                {HealthTrackData.slice(0, 2).map((item, index) => (
                    <Link to={`/suckhoe/${slug(item.name)}`} key={index}>
                        <Card
                            key={index}
                            className="health-card"
                            hoverable
                            cover={
                                <Image
                                    alt="example"
                                    src={item.picture}
                                    style={{ float: "right", maxWidth: "120px", maxHeight: "120px" }}
                                />
                            }
                            style={{ height: "180px", width: isMobile ? "300px" : "400px", padding: "20px", marginBottom: "20px", background: item.color }}
                        >
                            <Flex >
                                <Flex vertical align="flex-start">
                                    <Typography.Title level={2} strong>
                                        {item.name}
                                    </Typography.Title>
                                    <Typography.Text type="secondary" strong>
                                        ---{item.measure}
                                    </Typography.Text>
                                </Flex>
                            </Flex>

                        </Card>
                    </Link>

                ))
                }

            </Flex>
        </Flex >
    );
}

export default HealthTrackList;
