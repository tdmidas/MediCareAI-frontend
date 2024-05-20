import React, { useState, useEffect } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import MainContentLayout from '../../layout/MainContentLayout';
import SideContentLayout from '../../layout/SideContentLayout';
import { Flex, Typography, Image, Card, Tabs, Spin, Tag } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useMediaQuery } from 'react-responsive';
import slug from 'slug';
const { Title, Text } = Typography;

const MyBlog = () => {
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1024 });
    const [postData, setPostData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPostData();
    }, []);

    const fetchPostData = async () => {
        try {
            setLoading(true);
            const userId = localStorage.getItem('userId');
            const response = await axios.get(`https://medicareai-backend.onrender.com/api/blogs/my/${userId}`);
            setPostData(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching post data:', error);
            setLoading(false);
        }
    };

    const publishedPosts = postData.filter(post => post.state === 'published');
    const draftPosts = postData.filter(post => post.state !== 'published');

    return (
        <DefaultLayout>
            <Flex gap="large" wrap="wrap">
                <MainContentLayout>
                    <Flex vertical>
                        <Title level={2}>Bài viết của tôi</Title>
                        <Tabs defaultActiveKey="1">
                            <Tabs.TabPane tab="Đã duyệt" key="1">
                                {loading ? (
                                    <Spin />
                                ) : (
                                    <Flex vertical gap="large">
                                        {publishedPosts.map(post => (
                                            <Link to={`/blog/${slug(post.title)}`} key={post.blogId}>
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
                                                                <Image src={post.userPhoto} width={35} style={{ borderRadius: 20 }} />
                                                                <Typography.Text strong style={{ fontWeight: 500, marginTop: 5, marginLeft: 10, fontSize: isMobile ? '14px' : '16px' }}>{post.userName}</Typography.Text>
                                                            </Flex>
                                                            <Flex vertical justify="left" align="left">
                                                                <Typography.Title level={4} strong>{post.title}</Typography.Title>
                                                                <Typography.Text type="secondary">{post.content.split(' ').slice(0, 30).join(' ').replace(/[#*`_<>]/g, '')}</Typography.Text>
                                                            </Flex>
                                                            <Flex gap="20px">
                                                                <Tag color="#069390" style={{ borderRadius: 20, fontSize: isMobile ? '11px' : '13px' }}>{post.tag[0]}</Tag>

                                                            </Flex>
                                                        </Flex>
                                                        <Image
                                                            alt="example"
                                                            preview={false}
                                                            src={post.photo}
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
                                    </Flex>
                                )}
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="Chờ duyệt" key="2">
                                {loading ? (
                                    <Spin />
                                ) : (
                                    <Flex vertical gap="large">
                                        {draftPosts.map(post => (
                                            <Card key={post.blogId}>
                                                <Flex>
                                                    <Image src={post.photo} />
                                                    <Flex vertical justify='center' gap='large' style={{ padding: 20 }}>
                                                        <Text strong>{post.title}</Text>
                                                        <Text type="secondary">{post.content}</Text>
                                                    </Flex>
                                                </Flex>
                                            </Card>
                                        ))}
                                    </Flex>
                                )}
                            </Tabs.TabPane>
                        </Tabs>
                    </Flex>
                </MainContentLayout>
                <SideContentLayout>
                    <Image preview={false} src="https://d1xjlj96to6zqh.cloudfront.net/doctor-2.png" style={{ width: "100%", padding: 20 }} />
                    <Image preview={false} src="https://d1xjlj96to6zqh.cloudfront.net/doctor-5.png" style={{ width: "100%", padding: 20 }} />
                </SideContentLayout>
            </Flex>
        </DefaultLayout>
    );
}

export default MyBlog;
