import React from "react";
import { Button, Image, Card, Flex, Typography, } from "antd";
import "./Banner.css";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';
const banner = require("../../assets/banner2.png");
const Banner = () => {
    const navigate = useNavigate();
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1024 });
    const handleClick = (destination) => {
        if (destination === 'healthCheck') {
            navigate('/suckhoe');
        } else if (destination === 'support') {
            navigate('/chat');
        }
    };
    return (
        <Flex gap="large" wrap="wrap">
            <Card className="banner-card" style={{ padding: "20px", width: isMobile ? 300 : 800, height: isMobile ? 680 : 270, borderRadius: 15, backgroundColor: "#21c3c0" }} cover={
                <Image style={{
                    float: isMobile ? "none" : "right", width: isMobile ? "100%" : "52%", objectFit: "cover", height: 300, marginTop: "-20px"
                }}
                    src={banner}>

                </Image>
            }>
                <Flex vertical gap="30px"   >
                    <Flex vertical aligh="flex-start">
                        <Typography.Title level={3} strong style={{ color: "white" }}>
                            Hôm nay bạn như thế nào?
                        </Typography.Title>
                        <Typography.Text style={{ color: "white" }}>
                            Theo dõi sức khỏe của bạn bằng cách kiểm tra<br />kcác chỉ BMI, đường huyết và nhiều hơn nữa.
                        </Typography.Text>
                    </Flex>
                    <Flex gap="large" wrap="wrap">
                        <Button className="banner-btn" size="large" type="primary" onClick={() => handleClick('healthCheck')}>
                            Kiểm tra sức khỏe
                        </Button>
                        <Button className="banner-btn-sub" size="large" onClick={() => handleClick('support')}>
                            Cần hỗ trợ
                        </Button>
                    </Flex>


                </Flex>
            </Card>
        </Flex>
    );
};

export default Banner;
