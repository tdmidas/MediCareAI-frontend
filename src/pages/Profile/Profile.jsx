import React, { useState, useEffect } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import LoginRequired from '../LoginRequired/LoginRequired';
import { auth } from '../../firebaseConfig';
import { Form, Input, Button, Flex, Divider } from 'antd';
import axios from "axios";
import "./Profile.css"
const fallbackAvatar = require("../../assets/fallback-avatar.jpg")

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
    const fetchUserData = async () => {
        try {
            const response = await axios.get('API_URL_HERE'); // Replace 'API_URL_HERE' with your actual API endpoint
            setUserData(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };
    const onFinish = async (values) => {
        try {
            // Post updated user data to API
            await axios.post('API_URL_HERE', values); // Replace 'API_URL_HERE' with your actual API endpoint
            console.log('User data updated successfully!');
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };
    return (
        <DefaultLayout>
            {
                isLoggedIn ? (
                    <Flex vertical align='center' gap="large">
                        <div style={{ padding: '20px' }}>
                            <h1 style={{ color: '#008b8b', borderBottom: '5px solid #008b8b', fontWeight: 500, marginBottom: 20, width: '800px', textAlign: "left" }}>Thông tin cá nhân</h1>
                            <Form
                                layout="vertical"
                                onFinish={onFinish}
                                initialValues={userData}
                            >
                                <Form.Item
                                    name="name"
                                    label="Tên"
                                    rules={[{ required: true, message: 'Please enter your name!' }]}
                                    initialValue={user.name}
                                >
                                    <Input style={{ width: '300px' }} />
                                </Form.Item>
                                <Form.Item
                                    name="email"
                                    label="Email"
                                    rules={[{ required: true, message: 'Please enter your email!' }]}
                                    initialValue={user.email}

                                >
                                    <Input style={{ width: '300px' }} />
                                </Form.Item>
                                <img src={user.photoURL ? user.photoURL : fallbackAvatar} alt="Profile" className="profile-photo" style={{ borderRadius: 30, width: 100, height: 100, marginRight: 10 }} />

                                <Form.Item
                                    name="photoURL"
                                    label="Photo URL"
                                    rules={[{ required: true, message: 'Please enter your photo URL!' }]}
                                >

                                    <Input style={{ width: '300px' }} />
                                </Form.Item>
                                <Form.Item
                                    name="bio"
                                    label="Bio"
                                >
                                    <Input style={{ width: '300px' }} />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">Save</Button>
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