import { Flex, Image, Typography } from "antd";
import "./LoginRequired.css";

const LoginRequired = () => {
    return (
        <>
            <Flex align="center" justify="center" wrap="wrap" style={{ minHeight: "100vh" }}>
                <Image preview={false} alt="login required image" style={{ maxWidth: 600, maxHeight: 400 }} src="https://d1xjlj96to6zqh.cloudfront.net/login.png"></Image>
                <Typography.Title level={2} strong>
                    Vui lòng đăng nhập để sử dụng tính năng này
                </Typography.Title>
            </Flex>

        </>
    );
}

export default LoginRequired;