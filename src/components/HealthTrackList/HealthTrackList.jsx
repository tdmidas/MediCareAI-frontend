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
                if (!userId) {
                    // User is not logged in, set default values
                    const defaultBP = { diaBP: "--", sysBP: "--" };
                    const defaultGlucose = "--";

                    const defaultHealthData = [
                        {
                            id: 1,
                            name: "Huyết áp",
                            picture: "https://d1xjlj96to6zqh.cloudfront.net/blood-pressure.png",
                            measure: "mmHg",
                            value: `${defaultBP.diaBP}/${defaultBP.sysBP}`,
                            color: "#c0f1ef",
                        },
                        {
                            id: 2,
                            name: "Đường huyết",
                            picture: "https://d1xjlj96to6zqh.cloudfront.net/blood-sugar.png",
                            measure: "mmol/L",
                            value: defaultGlucose,
                            color: "#f5dec4",
                        }
                    ];

                    setHealthTrackData(defaultHealthData);
                    return; // Exit the function early
                }

                const bpResponse = await axios.get(`https://medi-care-ai-backend-qjg1y3sxj-djais-projects.vercel.app/api/health/bloodPressure/${userId}`);
                const { diaBP, sysBP } = bpResponse.data;

                const glucoseResponse = await axios.get(`https://medi-care-ai-backend-qjg1y3sxj-djais-projects.vercel.app/api/health/glucose/${userId}`);
                const { glucose } = glucoseResponse.data;

                const updatedHealthData = [
                    {
                        id: 1,
                        name: "Huyết áp",
                        picture: "https://d1xjlj96to6zqh.cloudfront.net/blood-pressure.png",
                        measure: "mmHg",
                        value: `${diaBP}/${sysBP}`,
                        color: "#c0f1ef",
                    },
                    {
                        id: 2,
                        name: "Đường huyết",
                        picture: "https://d1xjlj96to6zqh.cloudfront.net/blood-sugar.png",
                        measure: "mmol/L",
                        value: glucose,
                        color: "#f8aa76",
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
                            picture: "https://d1xjlj96to6zqh.cloudfront.net/blood-pressure.png",
                            measure: "mmHg",
                            value: `${defaultBP.diaBP}/${defaultBP.sysBP}`,
                            color: "#c0f1ef",
                        },
                        {
                            id: 2,
                            name: "Đường huyết",
                            picture: "https://d1xjlj96to6zqh.cloudfront.net/blood-sugar.png",
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
                <Button type="link" style={{ color: "#069390" }} onClick={handleClick}>
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
                                    loading="lazy"
                                    decoding="async"
                                />
                            }
                            style={{
                                height: "180px", width: isMobile ? "300px" : "400px",
                                padding: "20px", marginBottom: "20px", background: item.color,
                                filter: 'drop-shadow(0px 0px 10px rgb(186, 255, 241))',
                            }}
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
