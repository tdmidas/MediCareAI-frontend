import React from "react";
import { Layout, Typography, Image, Flex } from 'antd';
const { Content } = Layout;
const { Title, Text } = Typography;

const BlogLayout = ({ title, content, imageUrl, date }) => {
    return (
        <Layout style={{ maxHeight: "100vh", overflowY: "scroll" }} >

            <Content style={{ padding: '0 50px', marginTop: 64 }}>
                <Flex align="center" justify="center">
                    <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
                        <Title level={2}>{title}</Title>
                        <Image preview={false} src={imageUrl} alt={title} style={{ maxWidth: '100%', marginBottom: 20 }} />
                        <Text>{date}</Text>

                    </div>
                </Flex>

            </Content>
        </Layout>
    );
}

export default BlogLayout;
