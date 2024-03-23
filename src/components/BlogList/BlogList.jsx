import { Flex, Card, Typography, Button, Image, Tag } from "antd";
import BlogData from "../../BlogData";
import React from "react";
import "./BlogList.css";
import { useNavigate } from "react-router-dom";
const BLogList = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/blog');
    };
    return (
        <>
            <Flex align="center" justify="space-between" >
                <Typography.Title level={3} strong>
                    Bài viết nổi bật
                </Typography.Title>
                <Button type="link" className="primary--color" onClick={handleClick}>
                    Xem thêm
                </Button>
            </Flex>
            <Flex align="center" gap="large">
                {BlogData.slice(0, 2).map((item) => (
                    <Card
                        key="1"
                        className="blog-card"
                        hoverable
                        cover={
                            <Image
                                alt="example"
                                src={item.picture}
                                style={{ display: "block", height: "150px", maxWidth: "100%", objectFit: "cover" }}
                            />
                        }
                        style={{ height: "400px", width: "400px", padding: "20px", marginBottom: "20px" }}
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
        </>
    );
}

export default BLogList;