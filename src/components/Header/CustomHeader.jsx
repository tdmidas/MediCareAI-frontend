import React from 'react';
import { Flex, Typography } from 'antd';
import { Button } from 'antd';
import { Input } from 'antd';
import './CustomHeader.css';
import { useNavigate } from 'react-router-dom';
const { Search } = Input;
const CustomHeader = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    };

    return (
        <Flex align="center" justify="space-between">

            <Typography.Title level={4} type="secondary">
                <bold>Welcom back Dai</bold>
            </Typography.Title>
            <Flex align="center" gap="20rem">
                <Search className="search-btn" placeholder="Tìm kiếm bác sĩ, blog,..." allowClear />


                <Flex align="center" gap="10px">

                    <Button type="primary" className='login-btn' onClick={handleLoginClick} >Đăng nhập</Button>

                </Flex>
            </Flex>
        </Flex>
    );
};

export default CustomHeader;