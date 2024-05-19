import React, { useState, useRef } from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { Button, Input, message, Tag, Typography, Flex, Popover, Spin, Image } from "antd";
import "react-markdown-editor-lite/lib/index.css";
import "./WriteBlog.css";
import MainContentLayout from "../../layout/MainContentLayout";
import CustomHeader from "../../components/Header/CustomHeader";
import { useEffect } from 'react';
import LoginRequired from "../LoginRequired/LoginRequired";
import DefaultLayout from '../../layout/DefaultLayout';
import axios from "axios";
import { auth } from '../../firebaseConfig';
import { RobotOutlined } from '@ant-design/icons';
import blogImg from "../../assets/blog.png";
const { Title } = Typography;
const { TextArea } = Input;
const mdParser = new MarkdownIt();
const tagsData = ['Huyết áp', 'Đường huyết', 'Ăn uống', 'Sức khỏe', 'Tập luyện', 'Chăm sóc da', 'Tim mạch', 'Thực phẩm chức năng'];

const WriteBlog = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [blogImageUrl, setBlogImageUrl] = useState('');
    const [popoverVisible, setPopoverVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [textInput, setTextInput] = useState("");
    const fileInputRef = useRef(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = ({ text }) => {
        setContent(text);
    };

    const handleSubmit = async () => {
        if (!title.trim()) {
            message.error("Please enter a title.");
            return;
        }
        if (!content.trim()) {
            message.error("Please enter some content.");
            return;
        }

        const blogData = {
            userId: localStorage.getItem('userId'),
            userName: localStorage.getItem('displayName'),
            title,
            photo: blogImageUrl,
            userPhoto: localStorage.getItem('photoURL'),
            tag: selectedTags,
            content,
        };

        try {
            const response = await axios.post('http://localhost:5000/api/blogs/', blogData);
            console.log('Blog submitted successfully:', response.data);
            message.success("Blog submitted successfully!");
            setTitle('');
            setContent('');
            setSelectedTags([]);
            setBlogImageUrl('');
        } catch (error) {
            console.error('Error submitting blog:', error);
            message.error("Failed to submit blog.");
        }
    };

    const handleTagChange = (tag, checked) => {
        const nextSelectedTags = checked
            ? [...selectedTags, tag]
            : selectedTags.filter((t) => t !== tag);
        console.log('You are interested in: ', nextSelectedTags);
        setSelectedTags(nextSelectedTags);
    };

    const handleImageUpload = async (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const formData = new FormData();
            formData.append('image', e.target.files[0]);

            try {
                const response = await axios.post('http://localhost:5000/api/upload', formData);
                setBlogImageUrl(response.data.imageUrl);
                message.success("Image uploaded successfully");
            } catch (error) {
                console.error('Error uploading image:', error);
                message.error(error.response ? error.response.data.message : 'Error uploading image');
            }
        }
    };

    const handleGenerateClick = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/chat/message/blog', { userInput: textInput });
            const { title, content } = response.data;
            setTitle(title);
            setContent(content);
            setPopoverVisible(false);
        } catch (error) {
            console.error('Error generating content:', error);
            message.error("Failed to generate content.");
        } finally {
            setLoading(false);
        }
    };

    const handleTextInputChange = (e) => {
        setTextInput(e.target.value);
    };
    const handleClearContent = () => {
        setTitle('');
        setContent('');
    };
    const contentPopover = (
        <div>
            <TextArea
                rows={4}
                placeholder="Enter your prompt here..."
                value={textInput}
                onChange={handleTextInputChange}
                disabled={loading}
            />
            <Button
                type="primary"
                onClick={handleGenerateClick}
                loading={loading}
                style={{ marginTop: 10 }}
            >
                Generate
            </Button>
        </div>
    );

    return (
        <MainContentLayout>
            {isLoggedIn ? (
                <div style={{ backgroundColor: "white", overflowY: "scroll", overflowX: "hidden", maxHeight: "100vh" }}>
                    <div style={{ padding: 15 }}>
                        <CustomHeader submitHandler={handleSubmit} />
                    </div>
                    <Input
                        className="write-blog-input"
                        placeholder="Tiêu đề"
                        value={title}
                        onChange={handleTitleChange}
                        style={{ borderRadius: "none", height: 80 }}
                    />
                    <MdEditor
                        value={content}
                        style={{ minHeight: "50vh" }}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={handleContentChange}
                    />
                    <Flex wrap="wrap">
                        <Image src={blogImg} preview={false} style={{ width: 220, height: 220, objectFit: 'cover', borderRadius: 20, margin: 15 }} />
                        <Flex vertical>
                            <Title level={3} style={{ color: '#069390', padding: 15 }}>Viết blog dễ dàng hơn với AI</Title>
                            <Flex style={{ padding: 15 }}>

                                <Popover
                                    content={contentPopover}
                                    title="Generate Content"
                                    trigger="click"
                                    visible={popoverVisible}
                                    onVisibleChange={(visible) => setPopoverVisible(visible)}
                                >
                                    <Button type="primary" style={{
                                        borderRadius: 20, backgroundColor: '#069390',
                                        borderColor: '#069390', color: 'white', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
                                        marginTop: 25
                                    }}>

                                        Tạo bài viết ngay
                                    </Button>
                                    <Button type="primary"
                                        style={{ borderRadius: 20, backgroundColor: 'white', color: '#069390', marginLeft: 10, boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)' }}
                                        onClick={handleClearContent}>
                                        Xóa nội dung
                                    </Button>
                                </Popover>
                            </Flex>
                        </Flex>
                    </Flex>
                    <Title level={3} style={{ color: '#069390', padding: 15 }}>Tags</Title>
                    <div style={{ padding: 5 }}>
                        {tagsData.map(tag => (
                            <Tag.CheckableTag
                                key={tag}
                                checked={selectedTags.includes(tag)}
                                onChange={(checked) => handleTagChange(tag, checked)}
                                style={{
                                    cursor: 'pointer', borderRadius: 20, marginRight: 10,
                                    backgroundColor: selectedTags.includes(tag) ? '#069390' : 'white', color: selectedTags.includes(tag) ? 'white' : 'black',
                                    fontSize: 15
                                }}
                            >
                                {tag}
                            </Tag.CheckableTag>
                        ))}
                    </div>
                    <Flex vertical style={{ padding: 15 }}>
                        <Title level={3} style={{ color: '#069390' }}>Ảnh bìa</Title>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '10px 0' }}>
                            <Button type="primary" style={{ borderRadius: 20, backgroundColor: '#069390', borderColor: '#069390', color: 'white', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)' }}
                                onClick={() => fileInputRef.current.click()}>Chọn ảnh bìa</Button>
                            <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} ref={fileInputRef} />
                            <Button type="primary"
                                style={{ borderRadius: 20, backgroundColor: 'white', color: '#069390', marginLeft: 10, boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)' }}
                                onClick={() => setBlogImageUrl('')}>
                                Xóa ảnh bìa
                            </Button>
                        </div>
                        {blogImageUrl && <img src={blogImageUrl} alt="Blog Cover"
                            style={{ maxWidth: '300px', maxHeight: 300, boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)' }} />}
                    </Flex>
                </div>
            ) : (
                <DefaultLayout>
                    <LoginRequired />
                </DefaultLayout>
            )}
        </MainContentLayout>
    );
};

export default WriteBlog;
