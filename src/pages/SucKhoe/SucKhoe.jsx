import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Flex, Typography, Image, Button } from "antd";
import './SucKhoe.css';
import DefaultLayout from '../../layout/DefaultLayout';
import slug from "slug";
import { useMediaQuery } from 'react-responsive';
import axios from "axios";
import MainContentLayout from "../../layout/MainContentLayout";
import { auth } from '../../firebaseConfig';
import LoginRequired from "../LoginRequired/LoginRequired";
const { Text, Title } = Typography;

const SucKhoe = () => {
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const [animate, setAnimate] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    useEffect(() => {
        setAnimate(true);
    }, []);
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
    const [healthTrackData, setHealthTrackData] = useState([
        {
            id: 1,
            name: "Huyết áp",
            picture: "https://d1xjlj96to6zqh.cloudfront.net/blood-pressure.png",
            measure: "mmHg",
            value: "--/--",
            color: "#c0f1ef",
        },
        {
            id: 2,
            name: "Đường huyết",
            picture: "https://d1xjlj96to6zqh.cloudfront.net/blood-sugar.png",
            measure: "mmol/L",
            value: "--",
            color: "#f6c6a5",
        },
        {
            id: 3,
            name: "Chỉ số BMI",
            picture: "https://d1xjlj96to6zqh.cloudfront.net/bmi.png",
            measure: "BMI",
            value: "--",
            color: "#a3f9be",
        },
        {
            id: 4,
            name: "Cholesterol",
            picture: "https://d1xjlj96to6zqh.cloudfront.net/blood.png",
            measure: "mg/dL",
            value: "--",
            color: "#faa9a0",

        }
    ]);
    const fetchData = async () => {
        try {
            const userId = localStorage.getItem("userId");
            const BMI_response = await axios.get(`https://tdmidas.id.vn/api/health/BMI/${userId}`);
            const BP_response = await axios.get(`https://tdmidas.id.vn/api/health/bloodPressure/${userId}`);
            const glucose_response = await axios.get(`https://tdmidas.id.vn/api/health/glucose/${userId}`);
            const cholesterol_response = await axios.get(`https://tdmidas.id.vn/api/health/cholesterol/${userId}`);

            const updatedHealthData = healthTrackData.map(item => {
                switch (item.name) {
                    case "Huyết áp":
                        return {
                            ...item,
                            value: `${BP_response.data.diaBP}/${BP_response.data.sysBP}`
                        };
                    case "Đường huyết":
                        return {
                            ...item,
                            value: glucose_response.data.glucose
                        };
                    case "Chỉ số BMI":
                        return {
                            ...item,
                            value: BMI_response.data.BMI
                        };
                    case "Cholesterol":
                        return {
                            ...item,
                            value: cholesterol_response.data.totalCholesterol

                        };
                    default:
                        return item;
                }
            });

            setHealthTrackData(updatedHealthData);
        } catch (error) {
            console.error("Error fetching health data:", error);
        }
    };


    useEffect(() => {
        fetchData();
    }, []);

    return (
        <DefaultLayout>
            <Flex gap="large" wrap="wrap">
                <MainContentLayout>
                    {isLoggedIn ? (
                        <>

                            <Flex align="center" gap="large" wrap="wrap" >
                                <Image preview={false} src="https://d1xjlj96to6zqh.cloudfront.net/health-overall.png"
                                    style={{
                                        maxWidth: 600,
                                        maxHeight: 400,
                                        marginLeft: 30,
                                        float: "left",

                                    }}
                                />
                                <Card style={{ marginLeft: isMobile ? 10 : 150 }}>
                                    <Flex vertical align="center" gap="large" justify="center" wrap="wrap">
                                        <Image preview={false} alt="health-overview"
                                            src="https://d1xjlj96to6zqh.cloudfront.net/profile-ava.png" style={{
                                                maxWidth: 230,
                                                maxHeight: 230,
                                            }} />
                                        <Title level={5}>Xem đánh giá sức khỏe<br /> tại đây bạn nhé!</Title>
                                        <Link to={"/suckhoe/evaluate"}>
                                            <Button type="primary" style={{ marginTop: 10, boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)", backgroundColor: "#15aea1" }} >Xem đánh giá ngay</Button>
                                        </Link>
                                    </Flex>
                                </Card>
                            </Flex>
                            <Flex align="center" justify="space-between">
                                <Typography.Title level={3} strong>
                                    Nhật ký sức khỏe
                                </Typography.Title>
                            </Flex>
                            <Flex wrap="wrap" align="center" gap="large">
                                {healthTrackData.map((item, index) => (
                                    <Link to={`/suckhoe/${slug(item.name)}`} key={index}>


                                        <Card
                                            key={index}
                                            hoverable
                                            cover={
                                                <Image
                                                    alt="health track icon"
                                                    src={item.picture}
                                                    style={{ float: "right", width: "120px", height: "120px" }}

                                                />
                                            }
                                            style={{ height: "180px", width: isMobile ? "310px" : "350px", padding: "20px", marginBottom: "20px", backgroundColor: item.color }}
                                        >
                                            <Flex>
                                                <Flex vertical aligh="flex-start">
                                                    <Typography.Title level={2} strong>
                                                        {item.name}
                                                    </Typography.Title>
                                                    <Typography.Text type="secondary" strong>
                                                        <Text style={{ fontSize: 20, padding: 5 }}>
                                                            {item.value}
                                                        </Text>
                                                        {item.measure}
                                                    </Typography.Text>
                                                </Flex>
                                            </Flex>
                                        </Card>

                                    </Link>
                                ))}
                            </Flex>
                        </>
                    ) : (
                        <LoginRequired />
                    )}

                </MainContentLayout>

            </Flex>
        </DefaultLayout>
    );
}

export default SucKhoe;
