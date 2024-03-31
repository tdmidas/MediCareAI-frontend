import { Flex, Card, Image, Typography, Tag, Pagination } from "antd";
import React from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import MainContentLayout from "../../layout/MainContentLayout";
import SideContentLayout from "../../layout/SideContentLayout";
import BlogData from "../../BlogData";
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import "./Blog.css"
import slug from "slug";
const doctor = require("../../assets/doctor-1.png")
const eat_food = require("../../assets/eat-food.png")

const Blog = () => {
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1024 });
    const isDesktop = useMediaQuery({ minWidth: 1025 });
    return (
        <DefaultLayout>
            <Flex gap="large" wrap="wrap">

                <MainContentLayout>
                    <Flex vertical align="center" gap="large">
                        {BlogData.slice(0, 4).map((item, index) => (
                            <Link key={index} to={`/blog/${slug(item.title)}`}>
                                <Card
                                    className="blog-card"
                                    hoverable
                                    cover={
                                        <Image
                                            alt="example"
                                            src={item.picture}
                                            style={{
                                                width: "100%",
                                                height: "150px",
                                                objectFit: "cover"
                                            }}
                                        />
                                    }
                                    style={{ padding: "20px", marginBottom: "20px", width: isMobile ? "100%" : isTablet ? "50%" : "750px" }}
                                >
                                    <Flex vertical align="flex-start" gap="10px">
                                        <Typography.Title level={4} strong>
                                            {item.title}
                                        </Typography.Title>
                                        <Typography.Text type="secondary">
                                            {item.description}
                                        </Typography.Text>
                                        <Flex gap="10px">
                                            <Tag color="#069390">{item.tag}</Tag>
                                            <Typography.Text level={5} strong>
                                                {item.date}
                                            </Typography.Text>
                                        </Flex>
                                    </Flex>
                                </Card>
                            </Link>
                        ))}
                        <Pagination className="blog-pagination" defaultCurrent={1} total={50} style={{ marginTop: "20px" }} />
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
                        <Card className="blog-side-card-1" cover={
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
                        <Card className="blog-side-card-2" cover={
                            <Image
                                alt="example"
                                src={eat_food}
                                style={{ float: "right", position: "absolute", paddingBottom: "72px", paddingLeft: "90px", width: "auto", height: "300px" }}
                            />
                        }>
                            <Flex vertical gap="large">
                                <Typography.Title level={4} strong>
                                    Eat<br />  right
                                </Typography.Title>
                                <Typography.Title level={4} strong>
                                    Live<br /> right
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