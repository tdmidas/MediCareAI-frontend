import { Flex, Card, Image, Typography, Tag } from "antd";
import React from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import HealthTrackList from "../../components/HealthTrackList/HealthTrackList";
import MainContentLayout from "../../layout/MainContentLayout";
import SideContentLayout from "../../layout/SideContentLayout";
import BlogData from "../../BlogData";
import "./Blog.css"
const doctor = require("../../assets/doctor-1.png")

const Blog = () => {
    return (
        <DefaultLayout>
            <Flex gap="large">

                <MainContentLayout>
                    <Flex vertical gap="2.3rem">
                        <Flex vertical align="center" gap="large">
                            {BlogData.map((item) => (
                                <Card
                                    key="1"
                                    className="blog-card"
                                    hoverable
                                    cover={
                                        <Image
                                            alt="example"
                                            src={item.picture}
                                            style={{ height: "150px", maxWidth: "100%", objectFit: "cover" }}
                                        />
                                    }
                                    style={{ height: "400px", width: "800px", padding: "20px", marginBottom: "20px" }}
                                >
                                    <Flex >
                                        <Flex vertical aligh="flex-start" gap="10px">
                                            <Typography.Title level={4} strong>
                                                {item.title}
                                            </Typography.Title>
                                            <Typography.Text type="secondary" >
                                                {item.description}
                                            </Typography.Text>
                                            <Flex gap="10px">
                                                <Tag color="#069390">{item.tag}</Tag>
                                                <Typography.Text level={5} strong>
                                                    {item.date}
                                                </Typography.Text></Flex>

                                        </Flex>
                                    </Flex>
                                </Card>))

                            }

                        </Flex>
                    </Flex>
                </MainContentLayout>
                <SideContentLayout>
                    <Flex vertical gap="large">
                        <Typography.Title level={4} strong>
                            Các chủ đề được đề xuất
                        </Typography.Title>
                        <Flex align="center" >
                            <ul className="tag" >
                                <li ><a href="#">Sức khỏe/Giảm cân</a></li>
                                <li > <a href="#">Ăn uống</a></li>
                                <li > <a href="#">Fitness</a></li>
                                <li > <a href="#">Thuốc men</a></li>
                                <li > <a href="#">Khác</a></li>
                            </ul>

                        </Flex>
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
                </SideContentLayout >

            </Flex >


        </DefaultLayout >
    );
}

export default Blog;