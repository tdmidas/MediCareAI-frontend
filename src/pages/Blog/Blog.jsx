import { Flex, Card, Image, Typography, Tag, Pagination } from "antd";
import React, { useState, useEffect } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import MainContentLayout from "../../layout/MainContentLayout";
import SideContentLayout from "../../layout/SideContentLayout";
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import axios from "axios";
import "./Blog.css"
import slug from "slug";
import ContentLoader from "react-content-loader";
import ReactMarkdown from 'react-markdown';
const { Title, Text } = Typography;
const BlogLoader = () => (
    <ContentLoader
        speed={2}
        width={300}
        height={500}
        viewBox="0 0 300 500"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <rect x="0" y="0" rx="5" ry="5" width="300" height="250" />
        <rect x="20" y="270" rx="5" ry="5" width="260" height="20" />
        <rect x="20" y="300" rx="5" ry="5" width="260" height="20" />
        <rect x="20" y="330" rx="5" ry="5" width="260" height="20" />
    </ContentLoader>
);
const Blog = () => {
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1024 });
    const [blogData, setBlogData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = React.useState(true);

    const postsPerPage = 6;

    React.useEffect(() => {
        axios.get(`http://localhost:5000/api/blogs`)
            .then(response => {
                const publishedPosts = response.data.filter(
                    (post) => post.state === "published"
                );
                setBlogData(publishedPosts);
                setLoading(false);
            })
            .catch(error => {
                console.log("Error fetching data", error);
                setLoading(false);
            });
    }, []);

    const indexOfLastBlog = currentPage * postsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - postsPerPage;
    const currentBlogs = blogData.slice(indexOfFirstBlog, indexOfLastBlog);
    const handleChangePage = (page) => {
        setCurrentPage(page);
    };
    return (
        <DefaultLayout>
            <Flex gap="large" wrap="wrap">

                <MainContentLayout>
                    <Flex align="center" justify="space-between" style={{ marginBottom: 20 }}>
                        <Typography.Title level={3} strong>
                            Bài viết nổi bật
                        </Typography.Title>
                    </Flex>
                    {loading ? (
                        <Flex wrap="wrap" align="center" gap="large">
                            <BlogLoader />
                        </Flex>
                    ) : (
                        <Flex vertical align="center" gap="large" justify="center">
                            {currentBlogs.map((item, index) => (
                                <Link key={index} to={`/blog/${slug(item.title)}`}>
                                    <Card
                                        hoverable
                                        style={{
                                            padding: "20px",
                                            marginBottom: "20px",
                                            width: isMobile ? "100%" : isTablet ? "50%" : "750px",
                                            boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                                            transition: "0.3s",
                                            borderRadius: 15
                                        }}
                                    >
                                        <Flex gap={20} wrap="wrap-reverse">
                                            <Flex vertical gap="15px" style={{ flex: 1 }}>
                                                <Flex>
                                                    <Image src={item.userPhoto} width={35} style={{ borderRadius: 20 }} />
                                                    <Typography.Text strong style={{ fontWeight: 500, marginTop: 5, marginLeft: 10, fontSize: isMobile ? '14px' : '16px' }}>{item.userName}</Typography.Text>
                                                </Flex>
                                                <Flex vertical justify="left" align="left">
                                                    <Typography.Title level={4} strong>{item.title}</Typography.Title>
                                                    <Typography.Text type="secondary">{item.content.split(' ').slice(0, 30).join(' ').replace(/[#*`_<>]/g, '')}</Typography.Text>
                                                </Flex>
                                                <Flex gap="20px">
                                                    <Tag color="#069390" style={{ borderRadius: 20, fontSize: isMobile ? '11px' : '13px' }}>{item.tag[0]}</Tag>
                                                    <Typography.Text level={5} strong>{item.date}</Typography.Text>
                                                    <Typography.Text>4 phút đọc</Typography.Text>
                                                </Flex>
                                            </Flex>
                                            <Image
                                                alt="example"
                                                preview={false}
                                                src={item.photo}
                                                style={{
                                                    height: "170px",
                                                    width: "220px",
                                                    objectFit: "cover",
                                                    borderRadius: 20
                                                }}
                                            />
                                        </Flex>
                                    </Card>

                                </Link>
                            ))}
                            <Pagination className="blog-pagination" defaultCurrent={1} total={blogData.length} pageSize={postsPerPage} onChange={handleChangePage} style={{ marginBottom: 30 }} />
                        </Flex>
                    )}

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
                                src="https://d1xjlj96to6zqh.cloudfront.net/doctor-1.png"
                                style={{ float: "right", position: "absolute", paddingBottom: "72px", paddingLeft: "90px", width: "100%", height: "300px" }}
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
                                src="https://d1xjlj96to6zqh.cloudfront.net/eat-food.png"
                                style={{ float: "right", position: "absolute", paddingBottom: "72px", paddingLeft: "90px", width: "100%", height: "300px" }}
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