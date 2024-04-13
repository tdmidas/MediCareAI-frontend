import React, { useState, useEffect } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import LoginRequired from '../LoginRequired/LoginRequired';
import { auth } from '../../firebaseConfig';
import { Form, Input, Button, Flex, Typography, Image } from 'antd';
import axios from "axios";
import "./Profile.css"
const editProfile = require("../../assets/edit-profile.png")
const fallbackAvatar = require("../../assets/fallback-avatar.jpg")
const { Text } = Typography;
const Profile = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setIsLoggedIn(true);
                setUser(user);
            } else {
                setIsLoggedIn(false);
                setUser(null);
            }
        })
        fetchUserData();

        return () => unsubscribe();
    }, []);

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        photoURL: '',
        bio: ''
    });

    useEffect(() => {
        setUserData(user);
    }, [user]);

    const [editingFields, setEditingFields] = useState({});

    const toggleEditing = (fieldName) => {
        setEditingFields(prevEditingFields => ({
            ...prevEditingFields,
            [fieldName]: !prevEditingFields[fieldName]
        }));
    };

    const fetchUserData = async () => {
        try {
            const response = await axios.get('API_URL_HERE');
            setUserData(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const onFinish = async (values) => {
        try {
            await axios.post('API_URL_HERE', values);
            console.log('User data updated successfully!');
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    return (
        <DefaultLayout>
            {
                isLoggedIn ? (
                    <Flex vertical align='center' gap="large" wrap='wrap' style={{ minHeight: "100vh" }}>

                        <div style={{ padding: '20px' }}>
                            <h1 style={{ color: '#008b8b', borderBottom: '2px solid #008b8b', fontWeight: 400, marginBottom: 20, maxWidth: '800px', textAlign: "left" }}>Thông tin cá nhân</h1>
                            <Form
                                layout="vertical"
                                onFinish={onFinish}
                                initialValues={userData}
                            >
                                <div className="form-item">
                                    <label htmlFor="name">Tên</label>
                                    <Flex align='center' wrap='wrap'>
                                        <Form.Item
                                            name="name"
                                            rules={[{ required: true, message: 'Please enter your name!' }]}
                                        >
                                            <Input id="name" style={{ width: '300px' }} disabled={!editingFields.name} className='form-input' />
                                        </Form.Item>

                                        <Button type="primary" onClick={() => toggleEditing("name")} className='form-btn'>Chỉnh sửa</Button>
                                    </Flex>
                                    <Text type="secondary">Tên của bạn xuất hiện trên trang cá nhân và bên cạnh các bình luận của bạn. </Text>

                                </div>
                                <div className="form-item">
                                    <label htmlFor="email" style={{ marginTop: 15 }}>Email</label>
                                    <Flex align='center'>
                                        <Form.Item
                                            name="email"
                                            rules={[{ required: true, message: 'Please enter your email!' }]}
                                        >
                                            <Input id="email" style={{ width: '300px' }} disabled={!editingFields.email} className='form-input' />
                                        </Form.Item>
                                    </Flex>
                                </div>
                                <div className="form-item">
                                    <label htmlFor="photoURL">Avatar</label>
                                    <Flex gap="large" align='center' wrap='wrap' style={{ marginTop: 10 }}>
                                        <Text type="secondary">Nên là ảnh vuông, chấp nhận các tệp: JPG, PNG hoặc GIF.</Text>
                                        <img src={user.photoURL ? user.photoURL : fallbackAvatar} alt="Profile" className="profile-photo" style={{ borderRadius: 50, width: 100, height: 100, marginRight: 10 }} />

                                        <Button type="primary" onClick={() => toggleEditing("photoURL")} className='form-btn'>Chỉnh sửa</Button>
                                    </Flex>
                                </div>
                                <div className="form-item">
                                    <label htmlFor="bio">Bio</label>
                                    <Flex align='center' wrap='wrap'>
                                        <Form.Item
                                            name="bio"
                                        >
                                            <Input id="bio" style={{ width: '300px' }} disabled={!editingFields.bio} className='form-input' placeholder='Thêm giới thiệu' />
                                        </Form.Item>
                                        <Button type="primary" onClick={() => toggleEditing("bio")} className='form-btn'>Chỉnh sửa</Button>
                                    </Flex>
                                    <Text type="secondary" style={{ marginTop: 30 }}>Bio hiển thị trên trang và trong các bài viết (blog) của bạn. </Text>
                                </div>
                                <Form.Item >
                                    <Button type="primary" htmlType="submit" style={{ marginTop: 20 }} >Lưu thông tin</Button>
                                </Form.Item>
                            </Form>

                        </div>
                    </Flex>
                ) : (
                    <LoginRequired />
                )
            }
        </DefaultLayout>
    );
}

export default Profile;