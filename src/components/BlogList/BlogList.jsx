import { Flex, Card, Typography, Button, Image, Tag } from "antd";
import React, { useEffect, useState } from "react";
import "./BlogList.css";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';
import slug from "slug";
import { Link } from "react-router-dom";
import axios from "axios";
const BLogList = () => {
    const navigate = useNavigate();
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const [BlogData, setBlogData] = useState([]);
    const fetchData = async () => {
        try {
            const response = await axios.get("https://medicareai-backend.onrender.com/api/blogs");
            setBlogData(response.data);
        }
        catch (error) {
            console.log("Error fetching data", error);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    const handleClick = () => {
        navigate('/blog');
    };
    return (
        <>
            <Flex align="center" justify="space-between" >
                <Typography.Title level={3} strong>
                    Bài viết nổi bật
                </Typography.Title>
                <Button type="link" style={{ color: "#069390" }} onClick={handleClick}>
                    Xem thêm
                </Button>
            </Flex>
            <Flex align="center" gap="large" wrap="wrap">
                {BlogData.slice(0, 2).map((item, index) => (
                    <Link key={index} to={`/blog/${slug(item.title)}`}>

                        <Card
                            key={index}
                            hoverable
                            cover={
                                <Image
                                    alt="blog images"
                                    src={item.photo}
                                    style={{ display: "block", height: "150px", maxWidth: "100%", objectFit: "cover" }}
                                />
                            }
                            style={{ height: isMobile ? "500px" : "400px", maxWidth: "400px", padding: "20px", marginBottom: "20px" }}
                        >
                            <Flex >
                                <Flex vertical aligh="left" gap="20px">

                                    <Typography.Title level={4} strong>
                                        {item.title}
                                    </Typography.Title>
                                    <Flex>
                                        <Image src={item.userPhoto} width={35} style={{ borderRadius: 20 }} />
                                        <Typography.Text strong style={{ fontWeight: 500, marginTop: 5, marginLeft: 10, fontSize: isMobile ? '14px' : '16px' }}>{item.userName}</Typography.Text>
                                    </Flex>
                                    <Flex gap="10px">
                                        <Tag color="#069390">{item.tag[0]}</Tag>
                                        <Typography.Text level={5} strong>
                                            4 ngày trước
                                        </Typography.Text>
                                        <Typography.Text>4 phút đọc</Typography.Text>
                                    </Flex>


                                </Flex>
                            </Flex>
                        </Card>
                    </Link>))

                }

            </Flex>
        </>
    );
}

export default BLogList;