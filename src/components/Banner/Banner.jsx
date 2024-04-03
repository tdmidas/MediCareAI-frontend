import React from "react";
import { Button, Image, Card, Flex, Typography, } from "antd";
import "./Banner.css";
import promo from "../../assets/promo.png";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';

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
            <Card className="banner-card" style={{ padding: "20px", width: isMobile ? 300 : 800 }} cover={
                <Image style={{
                    float: isMobile ? "none" : "right", backgroundSize: "cover", width: isMobile ? "100%" : "40%", height: "260px", marginTop: "-40px"
                }}
                    src={promo}>

                </Image>
            }>
                <Flex vertical gap="30px"   >
                    <Flex vertical aligh="flex-start">
                        <Typography.Title level={2} strong>
                            Hôm nay bạn như thế nào?
                        </Typography.Title>
                        <Typography.Text type="secondary" strong>
                            Theo dõi sức khỏe của bạn bằng cách kiểm tra các chỉ BMI, đường huyết và nhiều hơn nữa.
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
