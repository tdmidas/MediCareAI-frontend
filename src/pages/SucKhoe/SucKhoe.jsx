import React from "react";
import { Link } from "react-router-dom";
import HealthTrackData from "../../HealthTrackData";
import { Card, Flex, Typography, Image, Progress } from "antd";
import './SucKhoe.css';
import DefaultLayout from '../../layout/DefaultLayout';
import slug from "slug";
const meditation = require("../../assets/meditation.png")
const SucKhoe = () => {
    return (
        <DefaultLayout>
            <>
                <Flex align="center" gap="large">
                    <Image preview={false} src={meditation} style={{ width: 600, height: 400 }} />
                    <Card style={{ width: 600, height: 400 }}>
                        <Progress type="circle" percent={100} format={() => '100'} />
                    </Card>


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
                                style={{ height: "180px", width: "350px", padding: "20px", marginBottom: "20px" }}
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