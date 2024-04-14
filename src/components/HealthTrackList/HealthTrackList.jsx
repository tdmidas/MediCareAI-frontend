import React, { useState, useEffect } from "react";
import { Button, Card, Flex, Typography, Image } from "antd";
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { Link } from "react-router-dom";
import slug from "slug";
import axios from "axios";

const { Text } = Typography;

const HealthTrackList = () => {
    const navigate = useNavigate();
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const [healthTrackData, setHealthTrackData] = useState([]);

    useEffect(() => {
        const fetchAndUpdateHealthData = async () => {
            try {
                const userId = localStorage.getItem("userId");

                const bpResponse = await axios.get(`http://localhost:5000/api/health/bloodPressure/${userId}`);
                const { diaBP, sysBP } = bpResponse.data;

                const glucoseResponse = await axios.get(`http://localhost:5000/api/health/glucose/${userId}`);
                const { glucose } = glucoseResponse.data;

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
                    }
                ];

                setHealthTrackData(updatedHealthData);
                console.log("Health data updated successfully:", updatedHealthData);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    console.log("No health data found for the user.");
                    const defaultBP = { diaBP: "--", sysBP: "--" };
                    const defaultGlucose = "--";

                    const defaultHealthData = [
                        {
                            id: 1,
                            name: "Huyết áp",
                            picture: require("../../assets/blood-pressure.png"),
                            measure: "mmHg",
                            value: `${defaultBP.diaBP}/${defaultBP.sysBP}`,
                            color: "#c0f1ef",
                        },
                        {
                            id: 2,
                            name: "Đường huyết",
                            picture: require("../../assets/blood-sugar.png"),
                            measure: "mmol/L",
                            value: defaultGlucose,
                            color: "#f5dec4",
                        }
                    ];

                    setHealthTrackData(defaultHealthData);
                } else {
                    console.error("Error fetching health data:", error);
                }
            }
        };

        fetchAndUpdateHealthData();
    }, []);

    const handleClick = () => {
        navigate('/suckhoe');
    };

    return (
        <Flex gap="large" vertical>
            <Flex align="center" justify="space-between" wrap="wrap">
                <Typography.Title level={3} strong>
                    Nhật ký sức khỏe
                </Typography.Title>
                <Button type="link" className="primary--color" onClick={handleClick}>
                    Xem thêm
                </Button>
            </Flex>
            <Flex wrap="wrap" align="center" gap="large">
                {healthTrackData.slice(0, 2).map((item, index) => (
                    <Link to={`/suckhoe/${slug(item.name)}`} key={index}>
                        <Card
                            key={index}
                            className="health-card"
                            hoverable
                            cover={
                                <Image
                                    alt="example"
                                    src={item.picture}
                                    style={{ float: "right", maxWidth: "120px", maxHeight: "120px" }}
                                />
                            }
                            style={{ height: "180px", width: isMobile ? "300px" : "400px", padding: "20px", marginBottom: "20px", background: item.color }}
                        >
                            <Flex>
                                <Flex vertical align="flex-start">
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
        </Flex>
    );
}

export default HealthTrackList;
