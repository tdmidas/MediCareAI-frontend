import React from "react";
import { Link } from "react-router-dom";
import HealthTrackData from "../../HealthTrackData";
import { Card, Flex, Typography, Image } from "antd";
import './SucKhoe.css';
import DefaultLayout from '../../layout/DefaultLayout';
import HealthEvaluate from "../../components/HealthEvaluate/HealthEvaluate";
import slug from "slug";
import { useMediaQuery } from 'react-responsive';

const meditation = require("../../assets/meditation.png")
const SucKhoe = () => {
    const isMobile = useMediaQuery({ maxWidth: 768 });
    return (
        <DefaultLayout>
            <>
                <Flex align="center" gap="large" wrap="wrap">
                    <Image preview={false} src={meditation} style={{ maxWidth: 600, maxHeight: 400, marginLeft: 30 }} />
                    <HealthEvaluate />


                </Flex>
                <Flex align="center" justify="space-between" >
                    <Typography.Title level={3} strong>
                        Nhật ký sức khỏe
                    </Typography.Title>

                </Flex>
                <Flex wrap="wrap" align="center" gap="large">
                    {HealthTrackData.map((item, index) => (
                        <Link to={`/suckhoe/${slug(item.name)}`} key={index}>

                            <Card
                                key="1"
                                className="health-card"
                                hoverable
                                cover={
                                    <Image
                                        alt="example"
                                        src={item.picture}
                                        style={{ float: "right", width: "120px", height: "120px" }}
                                    />
                                }
                                style={{ height: "180px", width: isMobile ? "300px" : "350px", padding: "20px", marginBottom: "20px", backgroundColor: item.color }}
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
                            </Card>
                        </Link>))

                    }

                </Flex>
            </>
        </DefaultLayout>
    );
}

export default SucKhoe;