import React, { useState, useEffect } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import LoginRequired from '../LoginRequired/LoginRequired';
import { auth } from '../../firebaseConfig';
import { Form, Input, Button, Flex, Typography, Image, Tabs, message } from 'antd';
import { updatePassword } from 'firebase/auth';
import axios from "axios";
import "./Profile.css"
const { Text } = Typography;
const { TabPane } = Tabs;
const Profile = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState('profile');
    const [uploadedImageUrl, setUploadedImageUrl] = useState('');
    const [editingFields, setEditingFields] = useState({});
    const accessToken = localStorage.getItem("accessToken");
    const photoURL = localStorage.getItem("photoURL");
    const userId = localStorage.getItem('userId');
    const displayName = localStorage.getItem('displayName');
    const email = localStorage.getItem('email');




    const handleTabChange = (key) => {
        setActiveTab(key);
    };
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
        return () => unsubscribe();
    }, []);

    const [userData, setUserData] = useState({
        displayName: '',
        photoURL: '',
        bio: ''
    });

    useEffect(() => {
        setUserData(user);
    }, [user]);
    // Function to handle file upload
    const handleImageUpload = async (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const formData = new FormData();
            formData.append('image', e.target.files[0]);

            try {
                const response = await axios.post('https://medicareai-backend.onrender.com/api/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                setUploadedImageUrl(response.data.imageUrl);
                message.success("Image uploaded successfully");
            } catch (error) {
                console.error('Error uploading image:', error);
                message.error(error.response ? error.response.data.message : 'Error uploading image');
            }
        }
    };

    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (Object.values(editingFields).some(field => field === true)) {
                e.preventDefault();
                e.returnValue = 'Your profile changes are not saved. Are you sure you want to exit?';
            }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [editingFields]);
    const toggleEditing = (fieldName) => {
        setEditingFields(prevEditingFields => ({
            ...prevEditingFields,
            [fieldName]: !prevEditingFields[fieldName]
        }));
    };

    const onFinishProfile = async (values) => {
        const updatedValues = {
            displayName: values.name,
            photoURL: uploadedImageUrl || values.photoURL,
            bio: values.bio
        };
        try {
            await axios.put(`https://medicareai-backend.onrender.com/api/users/update-profile/${userId}`, updatedValues, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
            );
            if (updatedValues.displayName) {
                localStorage.setItem('displayName', updatedValues.displayName);
            }
            if (updatedValues.photoURL) {
                localStorage.setItem('photoURL', updatedValues.photoURL);
            }
            setUserData(updatedValues);
            message.success("Profile updated successfully");
        } catch (error) {
            console.error('Error updating profile:', error);
            message.error(error.response ? error.response.data.message : 'Error updating profile');
        }
    }


    const onFinishPassword = async (values) => {
        const { newPassword, confirmNewPassword } = values;
        const oldPassword = values.password;

        if (newPassword !== confirmNewPassword) {
            message.error('New passwords do not match');
            return;
        }

        const passwordData = {
            oldPassword,
            newPassword
        };


        try {
            await axios.put(`https://medicareai-backend.onrender.com/api/users/update-password/${userId}`, passwordData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            updatePassword(auth.currentUser, newPassword);
            message.success("Cập nhật mật khẩu thành công");
        } catch (error) {
            console.error('Error updating password:', error.response ? error.response.data : error);
            message.error(error.response ? error.response.data.message : 'Error updating password');
        }
    }


    return (
        <DefaultLayout>
            {
                isLoggedIn ? (
                    <Flex vertical align='center' gap="large" wrap='wrap' style={{ minHeight: "100vh" }}>
                        <h1 style={{ color: '#008b8b', borderBottom: '2px solid #008b8b', fontWeight: 400, marginBottom: 20, maxWidth: '800px', textAlign: "left" }}>Thông tin tài khoản</h1>
                        <div style={{ padding: '20px' }}>
                            <Tabs activeKey={activeTab} onChange={handleTabChange}>
                                <TabPane tab="Thông tin cá nhân" key="profile">
                                    <Form
                                        layout="vertical"
                                        onFinish={onFinishProfile}
                                        initialValues={userData}
                                    >
                                        <div className="form-item">
                                            <label htmlFor="name">Tên</label>
                                            <Flex align='center' wrap='wrap'>
                                                <Form.Item
                                                    name="name"
                                                    rules={[{ message: 'Please enter your name!' }]}
                                                >
                                                    <Input id="name" style={{ width: '300px' }} disabled={!editingFields.name} placeholder={displayName} className='form-input' />
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
                                                >
                                                    <Input id="email" style={{ width: '300px' }} placeholder={email} disabled={!editingFields.email} className='form-input' />
                                                </Form.Item>
                                            </Flex>
                                        </div>

                                        <div className="form-item">
                                            <label htmlFor="photoURL">Avatar</label>
                                            <Flex gap="large" align='center' wrap='wrap' style={{ marginTop: 10 }}>
                                                <Flex vertical gap={15}>
                                                    <input type="file" id="avatar" accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload} />
                                                    <Input id="photoURL" style={{ width: '300px' }} disabled={!editingFields.photoURL} placeholder={uploadedImageUrl || photoURL} className='form-input' />
                                                    <Text type="secondary">Nên là ảnh vuông, chấp nhận các tệp: JPG, PNG hoặc GIF.</Text>
                                                </Flex>
                                                <img src={photoURL} alt="Profile" className="profile-photo" style={{ borderRadius: 50, width: 100, height: 100, marginRight: 10 }} />
                                                <Button type="primary" onClick={() => document.getElementById('avatar').click()} className='form-btn'>Upload</Button>
                                            </Flex>

                                        </div>
                                        <div className="form-item">
                                            <label htmlFor="bio" style={{ marginTop: 20 }}>Bio</label>
                                            <Flex align='center' wrap='wrap'>
                                                <Form.Item
                                                    name="bio"
                                                    rules={[{ required: false }]}

                                                >
                                                    <Input id="bio" style={{ width: '300px' }} disabled={!editingFields.bio} className='form-input' placeholder="Thêm giới thiệu" />
                                                </Form.Item>
                                                <Button type="primary" onClick={() => toggleEditing("bio")} className='form-btn'>Chỉnh sửa</Button>
                                            </Flex>
                                            <Text type="secondary" style={{ marginTop: 30 }}>Bio hiển thị trên trang và trong các bài viết (blog) của bạn. </Text>
                                        </div>
                                        <Form.Item >
                                            <Button type="primary" htmlType="submit" style={{ marginTop: 20 }} >Lưu thông tin</Button>
                                        </Form.Item>
                                    </Form>
                                </TabPane>
                                <TabPane tab="Đổi mật khẩu" key="password">
                                    <Form
                                        layout="vertical"
                                        onFinish={onFinishPassword}
                                    >
                                        <div className="form-item">
                                            <label htmlFor="password" style={{ marginTop: 20 }}>Mật khẩu cũ</label>
                                            <Flex align='center' >
                                                <Form.Item
                                                    name="password"
                                                >
                                                    <Input.Password id="password" style={{ width: '300px' }} placeholder="Nhập mật khẩu cũ" className='form-input' />
                                                </Form.Item>
                                            </Flex>
                                        </div>
                                        <div className="form-item">
                                            <label htmlFor="newPassword">Mật khẩu mới</label>
                                            <Flex align='center'>
                                                <Form.Item
                                                    name="newPassword"
                                                >
                                                    <Input.Password id="newPassword" style={{ width: '300px' }} placeholder="Nhập mật khẩu mới" className='form-input' />
                                                </Form.Item>
                                            </Flex>
                                        </div>
                                        <div className="form-item">
                                            <label htmlFor="confirmNewPassword">Xác nhận mật khẩu mới</label>
                                            <Flex align='center'>
                                                <Form.Item
                                                    name="confirmNewPassword"
                                                >
                                                    <Input.Password id="confirmNewPassword" style={{ width: '300px' }} placeholder="Xác nhận mật khẩu mới" className='form-input' />
                                                </Form.Item>
                                            </Flex>
                                        </div>
                                        <Form.Item >
                                            <Button type="primary" htmlType="submit" style={{ marginTop: 20 }} >Lưu mật khẩu mới</Button>
                                        </Form.Item>
                                    </Form>
                                </TabPane>
                            </Tabs>
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