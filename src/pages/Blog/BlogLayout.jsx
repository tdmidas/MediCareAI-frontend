import React, { useState, useEffect, Suspense } from "react";
import { Layout, Typography, Image, Col, Modal, Form, Input, Button, Flex, Spin } from 'antd';
import './BlogLayout.css';
import { AiOutlineHeart, AiOutlineComment } from 'react-icons/ai';
import CustomHeader from "../../components/Header/CustomHeader";
import { useParams } from "react-router-dom";
import slug from 'slug';
import ReactMarkdown from 'react-markdown';


const { Content } = Layout;
const { Title, Text } = Typography;

const BlogLayout = () => {
    const [likes, setLikes] = useState(0);
    const [isCommentVisible, setCommentVisible] = useState(false);
    const [comments, setComments] = useState([]);
    const [blogData, setBlogData] = useState([]);
    const [selectedBlog, setSelectedBlog] = useState({});
    const LazyMarkdown = React.lazy(() => import('react-markdown'));

    const { slugName } = useParams(); // Extract slug from URL

    const fetchData = async () => {
        try {
            const response = await fetch("https://medicareai-backend.onrender.com/api/blogs");
            const data = await response.json();
            setBlogData(data);
        }
        catch (error) {
            console.log("Error fetching data", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        console.log(slug);

        const selectedBlog = blogData.find(blog => slug(blog.title) === slugName);
        setSelectedBlog(selectedBlog);
        console.log(selectedBlog);

        if (selectedBlog) {
            setLikes(selectedBlog.likes);
            setComments(selectedBlog.comments);
        }
    }, [slug, blogData]);

    const increaseLikes = () => {
        setLikes(likes + 1);
    };

    const handleCommentVisible = () => {
        setCommentVisible(!isCommentVisible);
    };


    return (
        <Layout className="blog-layout" style={{ height: "100vh", overflowY: "scroll", overflowX: "hidden" }}>
            <div style={{ backgroundColor: "white", padding: 15 }}>
                <CustomHeader />
            </div>
            <Content className="blog-content" style={{ backgroundColor: "white" }}>
                <Spin spinning={!selectedBlog || !selectedBlog.title}>
                    {selectedBlog && (
                        <Col xs={{ span: 22, offset: 1 }} md={{ span: 18, offset: 3 }} lg={{ span: 14, offset: 5 }} >
                            <div className="blog-card">
                                <Flex vertical align="center" justify="center" gap="large">
                                    <Title level={1}>{selectedBlog.title}</Title>
                                    <Image preview={false} src={selectedBlog.photo} alt={selectedBlog.title} className="blog-image"
                                        style={{ maxWidth: "70%" }} />
                                </Flex>
                                <Flex justify="center" align="center" gap={20}>
                                    <Image src={selectedBlog.userPhoto} preview={false} style={{ width: 50, height: 50, borderRadius: 50 }} />
                                    <Title level={4}>{selectedBlog.userName}</Title>

                                </Flex>
                                <div className="'blog-content'" style={{ textAlign: 'left', marginTop: 40 }}>

                                    <Suspense fallback={<div>Loading...</div>}>
                                        <Text style={{ fontSize: 15, lineHeight: 2 }} >

                                            <LazyMarkdown>
                                                {selectedBlog.content}
                                            </LazyMarkdown>
                                        </Text>

                                    </Suspense>
                                </div>

                            </div>
                        </Col>
                    )}
                </Spin>

            </Content>

        </Layout>
    );
}


export default BlogLayout;
