import React, { useState } from "react";
import { Layout, Typography, Image, Row, Col, Card, Modal, Form, Space, Input, Button, Flex } from 'antd';
import CustomHeader from "../components/Header/CustomHeader";
import './BlogLayout.css';
import { AiOutlineHeart, AiOutlineComment } from 'react-icons/ai';
const { Content, Header } = Layout;
const { Title, Text } = Typography;

const BlogLayout = ({ title, content, imageUrl, date }) => {
    const [likes, setLikes] = useState(0);
    const [isCommentVisible, setCommentVisible] = useState(false);
    const [comments, setComments] = useState([]);

    const increaseLikes = () => {
        setLikes(likes + 1);
    };

    const handleCommentVisible = () => {
        setCommentVisible(!isCommentVisible);
    };

    const handleCommentSubmit = (values) => {
        const newComment = {
            author: 'User',
            content: values.comment,
            datetime: new Date(),
        };
        setComments([...comments, newComment]);
        handleCommentVisible();
    };

    return (
        <Layout className="blog-layout" style={{ maxHeight: "100vh", overflowY: "scroll", overflowX: "hidden" }}>
            <Header className="header">
                <CustomHeader />
            </Header>
            <Content className="blog-content">
                <Row justify="center" align="middle">
                    <Col xs={24} md={6} lg={6} className="user-info-col">
                        <Card className="user-info-card" style={{ width: 200, background: "Transparent" }}>
                            <Title level={4}>Dai Tran</Title>
                            <Text>Researcher</Text>

                            <div className="user-info-icons">
                                <AiOutlineHeart onClick={increaseLikes} className="like-icon" />
                                <Text style={{ fontSize: 20, fontWeight: 500 }} strong>{likes}</Text>
                                <AiOutlineComment onClick={handleCommentVisible} className="comment-icon" />

                            </div>
                        </Card>
                    </Col>
                    <Col xs={24} md={18} lg={18}>
                        <div className="blog-card">
                            <Title level={2}>{title}</Title>
                            <Image preview={false} src={imageUrl} alt={title} className="blog-image" />
                            <Text className="blog-date">{date}</Text>
                            <div className="blog-content">{content}</div>
                        </div>
                    </Col>
                </Row>
            </Content>
            <Modal
                title="Comments"
                visible={isCommentVisible}
                onCancel={handleCommentVisible}
                footer={null}
            >
                {comments.map((comment, index) => (
                    <div key={index} className="comment">
                        <div className="comment-author">{comment.author}</div>
                        <div className="comment-content">{comment.content}</div>
                        <div className="comment-date">{comment.datetime.toLocaleString()}</div>
                    </div>
                ))}
                <CommentForm onSubmit={handleCommentSubmit} />
            </Modal>
        </Layout>
    );
}

const CommentForm = ({ onSubmit }) => {
    const [form] = Form.useForm();

    return (
        <Form form={form} onFinish={onSubmit}>
            <Form.Item name="comment">
                <Input.TextArea placeholder="Write a comment..." />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Add Comment
                </Button>
            </Form.Item>
        </Form>
    );
};

export default BlogLayout;
