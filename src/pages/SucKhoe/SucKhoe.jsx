import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Flex, Typography, Image } from "antd";
import './SucKhoe.css';
import DefaultLayout from '../../layout/DefaultLayout';
import HealthEvaluate from "../../components/HealthEvaluate/HealthEvaluate";
import slug from "slug";
import { useMediaQuery } from 'react-responsive';
import axios from "axios";

const meditation = require("../../assets/meditation.png");
const { Text } = Typography;

const SucKhoe = () => {
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const [healthTrackData, setHealthTrackData] = useState([]);

    useEffect(() => {
        const fetchAndUpdateHealthData = async () => {
            try {
                const userId = localStorage.getItem("userId");
                await axios.post(`http://localhost:5000/api/health/overall/${userId}`);
                const response = await axios.get(`http://localhost:5000/api/health/overall/${userId}`);
                const { BMI, diaBP, glucose, sysBP } = response.data;

                const updatedHealthData = [
                    {
                        id: 1,
                        name: "Huyết áp",
                        picture: require("../../assets/blood-pressure.png"),
                        measure: "mmHg",
                        value: `${diaBP}/${sysBP}`,
                        color: "#c0f1ef",
                    },
                    {
                        id: 2,
                        name: "Đường huyết",
                        picture: require("../../assets/blood-sugar.png"),
                        measure: "mmol/L",
                        value: glucose,
                        color: "#f5dec4",
                    },
                    {
                        id: 3,
                        name: "Chỉ số BMI",
                        picture: require("../../assets/bmi.png"),
                        measure: "BMI",
                        value: BMI,
                        color: "#caffe0",
                    },
                ];

                setHealthTrackData(updatedHealthData);
                console.log("Health data updated successfully:", updatedHealthData);
            } catch (error) {
                console.error("Error fetching health data:", error);
            }
        };

        fetchAndUpdateHealthData();
    }, []);

    return (
        <DefaultLayout>
            <>
                <Flex align="center" gap="large" wrap="wrap">
                    <Image preview={false} src={meditation} style={{ maxWidth: 600, maxHeight: 400, marginLeft: 30 }} />
                    <HealthEvaluate />
                </Flex>
                <Flex align="center" justify="space-between" >
                    <Typography.Title level={3} strong>
                        Nhật ký sức khỏe
                    </Typography.Title>
                </Flex>
                <Flex wrap="wrap" align="center" gap="large">
                    {healthTrackData.map((item, index) => (
                        <Link to={`/suckhoe/${slug(item.name)}`} key={index}>
                            <Card
                                key={index}
                                className="health-card"
                                hoverable
                                cover={
                                    <Image
                                        alt="example"
                                        src={item.picture}
                                        style={{ float: "right", width: "120px", height: "120px" }}
                                    />
                                }
                                style={{ height: "180px", width: isMobile ? "300px" : "350px", padding: "20px", marginBottom: "20px", backgroundColor: item.color }}
                            >
                                <Flex>
                                    <Flex vertical aligh="flex-start">
                                        <Typography.Title level={2} strong>
                                            {item.name}
                                        </Typography.Title>
                                        <Typography.Text type="secondary" strong >
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
        </DefaultLayout>
    );
}

export default SucKhoe;
