import { Flex, Image, Typography } from "antd";
import "./LoginRequired.css";
const login = require("../../assets/login.png");

const LoginRequired = () => {
    return (
        <>
            <Flex align="center" justify="center" >
                <Image preview={false} style={{ maxWidth: 600, maxHeight: 600 }} src={login}></Image>
                <Typography.Title level={2} strong>
                    Vui lòng đăng nhập để sử dụng tính năng này
                </Typography.Title>
            </Flex>

        </>
    );
}

export default LoginRequired;