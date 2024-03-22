import React from "react";
import { Button, Card, Flex, Typography } from "antd";
import "./Banner.css";
import promo from "../../assets/promo.png";
const Banner = () => {
    return (
        <Card className="banner-card" style={{ height: 260, padding: "20px" }} cover={
            <div >
                <img
                    alt="example"
                    style={{
                        float: "right", backgroundSize: "cover", width: "260px", height: "260px", marginTop: "-20px"
                    }}
                    src={promo}
                />
            </div>
        }>
            <Flex vertical gap="30px">
                <Flex vertical aligh="flex-start">
                    <Typography.Title level={2} strong>
                        Hôm nay bạn như thế nào?
                    </Typography.Title>
                    <Typography.Text type="secondary" strong>
                        Theo dõi sức khỏe của bạn bằng cách kiểm tra các chỉ BMI, đường huyết và nhiều hơn nữa.
                    </Typography.Text>
                </Flex>
                <Flex gap="large">
                    <Button className="banner-btn" size="large" type="primary">
                        Khám phá
                    </Button>
                    <Button className="banner-btn-sub" size="large">
                        Top bài viết
                    </Button>
                </Flex>


            </Flex>
        </Card>
    );
};

export default Banner;
