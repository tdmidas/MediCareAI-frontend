import React from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import MainContentLayout from '../../layout/MainContentLayout';
import SideContentLayout from '../../layout/SideContentLayout';
import { Flex, Typography, Image, Card, Tabs } from 'antd';
import { Link } from 'react-router-dom';
const { Title, Text } = Typography;
const MyBlog = () => {
    return (
        <DefaultLayout>
            <Flex gap="large" wrap="wrap">

                <MainContentLayout>
                    <Flex vertical>
                        <Title level={2}>Bài viết của tôi</Title>
                        <Tabs defaultActiveKey="1">
                            <Tabs.TabPane tab="Đã đăng" key="1">
                                <Card>
                                    <Flex>
                                        <Image src="https://via.placeholder.com/150" />
                                        <Flex vertical justify='center' gap='large' style={{ padding: 20 }}>
                                            <Text strong>Post title</Text>
                                            <Text type="secondary">Post description</Text>
                                        </Flex>
                                    </Flex>
                                </Card>
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="Nháp" key="2">
                                <Text type="secondary">Chưa có bài viết nào.</Text> <br />
                                <Text type="secondary">Bạn có thể </Text><Link to={"/blog/write"}><Text type='link' style={{ color: "#069390" }}>tạo bài viết mới</Text></Link><Text type="secondary"> hoặc </Text><Link to={"/blog"}><Text type='link' style={{ color: "#069390" }}>dọc bài viết khác</Text> </Link><Text type="secondary">trên MediCareAI nhé</Text>
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