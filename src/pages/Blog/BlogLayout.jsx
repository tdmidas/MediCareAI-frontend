import React, { useState, useEffect } from "react";
import { Layout, Typography, Image, Col, Form, Input, Button, Spin, Divider, message, Card } from 'antd';
import './BlogLayout.css';
import { AiOutlineHeart, AiOutlineComment } from 'react-icons/ai';
import CustomHeader from "../../components/Header/CustomHeader";
import { useParams } from "react-router-dom";
import slug from 'slug';
import ReactMarkdown from 'react-markdown';
import axios from "axios";

const { Content } = Layout;
const { Title, Text } = Typography;

const BlogLayout = () => {
    const [likes, setLikes] = useState(0);
    const [isCommentVisible, setCommentVisible] = useState(false);
    const [comments, setComments] = useState([]);
    const [blogData, setBlogData] = useState([]);
    const [selectedBlog, setSelectedBlog] = useState({});
    const [commentContent, setCommentContent] = useState('');
    const [hasLiked, setHasLiked] = useState(false);
    const [user, setUser] = useState({});
    const { slugName } = useParams(); // Extract slug from URL

    const fetchData = async () => {
        try {
            const blogResponse = await axios.get("http://medicare-ai-backend-env.eba-wt2prnnx.ap-southeast-1.elasticbeanstalk.com/api/blogs");
            // user likedBlogs array
            const userId = localStorage.getItem("userId");
            const userResponse = await axios.get(`http://medicare-ai-backend-env.eba-wt2prnnx.ap-southeast-1.elasticbeanstalk.com/api/users/${userId}`);
            setUser(userResponse.data);
            setBlogData(blogResponse.data);
        } catch (error) {
            console.log("Error fetching data", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const selectedBlog = blogData.find(blog => slug(blog.title) === slugName);
        setSelectedBlog(selectedBlog);

        if (selectedBlog) {
            setLikes(selectedBlog.likes);
            setComments(selectedBlog.comments || []);
            // Check if user has liked the blog in user database likedBlogs array
            if (user.likedBlogs && user.likedBlogs.includes(selectedBlog.blogId)) {
                setHasLiked(true);
            }

        }
    }, [slug, blogData]);

    useEffect(() => {
        const fetchComments = async () => {
            if (!selectedBlog.blogId) {
                return;
            }
            try {
                const response = await axios.get(`http://medicare-ai-backend-env.eba-wt2prnnx.ap-southeast-1.elasticbeanstalk.com/api/comments/blog/${selectedBlog.blogId}`);
                setComments(response.data);
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };

        if (selectedBlog && selectedBlog.blogId) {
            fetchComments();
        }
    }, [selectedBlog]);

    const increaseLikes = async () => {
        const userId = localStorage.getItem("userId");
        if (!hasLiked) {
            setLikes(parseInt(likes) + 1);
            await axios.put(`http://medicare-ai-backend-env.eba-wt2prnnx.ap-southeast-1.elasticbeanstalk.com/api/blogs/like/${selectedBlog.blogId}`, {
                userId: userId,
            });
            setHasLiked(true);
        }
    };

    const handleCommentVisible = () => {
        setCommentVisible(!isCommentVisible);
    };

    const handleCommentSubmit = async () => {
        if (!commentContent) {
            return;
        }
        const userId = localStorage.getItem("userId");
        const photoURL = localStorage.getItem("photoURL");
        const displayName = localStorage.getItem("displayName");
        try {
            const response = await axios.post("http://medicare-ai-backend-env.eba-wt2prnnx.ap-southeast-1.elasticbeanstalk.com/api/comments", {
                blogId: selectedBlog.blogId,
                userId: userId,
                photoURL: photoURL,
                content: commentContent,
                displayName: displayName,
            });
            message.success("Comment created successfully");
            const newComment = response.data.comment;
            setComments([...comments, newComment]);
            setCommentContent('');
        } catch (error) {
            console.log("Error creating comment", error);
            message.error("Error creating comment");
        }
    };

    return (
        <Layout className="blog-layout" style={{ height: "100vh", overflowY: "scroll", overflowX: "hidden" }}>
            <div style={{ backgroundColor: "white", padding: 15 }}>
                <CustomHeader />
            </div>
            <Content className="blog-content" style={{ backgroundColor: "white" }}>
                <Spin spinning={!selectedBlog || !selectedBlog.title}>
                    {selectedBlog && (
                        <Col xs={{ span: 22, offset: 1 }} md={{ span: 18, offset: 3 }} lg={{ span: 14, offset: 5 }}>
                            <div className="blog-card">
                                <Title level={1}>{selectedBlog.title}</Title>
                                <Image preview={false} src={selectedBlog.photo} alt={selectedBlog.title} className="blog-image" style={{ maxWidth: "70%" }} />
                                <div className="blog-content" style={{ textAlign: 'left', marginTop: 40 }}>
                                    <ReactMarkdown>{selectedBlog.content}</ReactMarkdown>
                                </div>

                                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center' }}>
                                    <Button className="like-btn" icon={<AiOutlineHeart />} onClick={increaseLikes} style={{ backgroundColor: hasLiked ? 'rgb(248, 93, 93)' : 'inherit', color: hasLiked ? 'white' : 'black' }}>
                                        {likes} Like
                                    </Button>
                                    <Button icon={<AiOutlineComment />} onClick={handleCommentVisible}>Comment</Button>
                                </div>

                                {isCommentVisible && (
                                    <div style={{ marginTop: 20 }}>
                                        <Divider />
                                        <Form layout="vertical">
                                            <Form.Item label="Comment">
                                                <Input.TextArea rows={4} value={commentContent} onChange={(e) => setCommentContent(e.target.value)} />
                                            </Form.Item>
                                            <Form.Item>
                                                <Button type="primary" onClick={handleCommentSubmit}>Submit</Button>
                                            </Form.Item>
                                        </Form>
                                    </div>
                                )}

                                {comments.length > 0 && (
                                    <div style={{ marginTop: 20 }}>
                                        <Divider />
                                        <Title level={4}>Comments</Title>
                                        {comments.map(comment => (
                                            <div key={comment.commentId} style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-start' }}>
                                                <Card key={comment.commentId} style={{ borderRadius: 20, marginBottom: 15 }}>
                                                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                                        <Image src={comment.photoURL} alt={comment.displayName} style={{ width: 40, height: 40, borderRadius: 25, marginBottom: 10 }} />
                                                        <Text strong>{comment.displayName}</Text>
                                                    </div>
                                                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'left', alignItems: 'left' }}>
                                                        <Text>{comment.content}</Text>
                                                    </div>
                                                </Card>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {comments.length === 0 && isCommentVisible && (
                                    <div style={{ marginTop: 20 }}>
                                        <Divider />
                                        <Text>This post has no comments.</Text>
                                    </div>
                                )}
                            </div>
                        </Col>
                    )}
                </Spin>
            </Content>
        </Layout>
    );
};

export default BlogLayout;
