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
            const response = await fetch("http://localhost:5000/api/blogs");
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
                        <Col xs={600} md={800} lg={1200}>
                            <div className="blog-card">
                                <Flex vertical align="center" justify="center" gap="large">
                                    <Title level={2}>{selectedBlog.title}</Title>
                                    <Image preview={false} src={selectedBlog.photo} alt={selectedBlog.title} className="blog-image"
                                        style={{ maxWidth: "70%" }} />
                                </Flex>
                                <Flex justify="center" align="center" gap={20}>
                                    <Title level={4}>{selectedBlog.userName}</Title>
                                    <div className="user-info-icons">
                                        <AiOutlineHeart onClick={increaseLikes} className="like-icon" />
                                        <Text style={{ fontSize: 20, fontWeight: 500 }} strong>{likes}</Text>
                                        <AiOutlineComment onClick={handleCommentVisible} className="comment-icon" />
                                    </div>
                                </Flex>
                                <Flex vertical justify="start" align="left" gap="large">

                                    <Suspense fallback={<div>Loading...</div>}>
                                        <Text style={{ fontSize: 15, lineHeight: 2 }} >

                                            <LazyMarkdown>
                                                {selectedBlog.content}
                                            </LazyMarkdown>
                                        </Text>

                                    </Suspense>
                                </Flex>

                            </div>
                        </Col>
                    )}
                </Spin>

            </Content>

        </Layout>
    );
}


export default BlogLayout;