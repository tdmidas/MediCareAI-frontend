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
    const [animate, setAnimate] = useState(false); // Animation state

    useEffect(() => {
        // Trigger animation after component mounts
        setAnimate(true);
    }, []);
    const [healthTrackData, setHealthTrackData] = useState([
        {
            id: 1,
            name: "Huyết áp",
            picture: require("../../assets/blood-pressure.png"),
            measure: "mmHg",
            value: "--/--",
            color: "#c0f1ef",
        },
        {
            id: 2,
            name: "Đường huyết",
            picture: require("../../assets/blood-sugar.png"),
            measure: "mmol/L",
            value: "--",
            color: "#f5dec4",
        },
        {
            id: 3,
            name: "Chỉ số BMI",
            picture: require("../../assets/bmi.png"),
            measure: "BMI",
            value: "--",
            color: "#caffe0",
        },
    ]);

    const [BMIInput, setBMIInput] = useState('');
    const [diaBPInput, setDiaBPInput] = useState('');
    const [sysBPInput, setSysBPInput] = useState('');
    const [glucoseInput, setGlucoseInput] = useState('');

    const fetchData = async () => {
        try {
            const userId = localStorage.getItem("userId");
            const BMI_response = await axios.get(`https://medicareai-backend.onrender.com/api/health/BMI/${userId}`);
            const BP_response = await axios.get(`https://medicareai-backend.onrender.com/api/health/bloodPressure/${userId}`);
            const glucose_response = await axios.get(`https://medicareai-backend.onrender.com/api/health/glucose/${userId}`);

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
                    default:
                        return item;
                }
            });

            setHealthTrackData(updatedHealthData);
        } catch (error) {
            console.error("Error fetching health data:", error);
        }
    };

    const handleBMIChange = async (value) => {
        setBMIInput(value);
        await axios.post(`http://${process.env.REACT_APP_API_PORT}/api/health/BMI/${localStorage.getItem("userId")}`, {
            BMI: parseFloat(value)
        });
        fetchData();
    };

    const handleBloodPressureChange = async (diaBP, sysBP) => {
        setDiaBPInput(diaBP);
        setSysBPInput(sysBP);
        await axios.post(`http://${process.env.REACT_APP_API_PORT}/api/health/bloodPressure/${localStorage.getItem("userId")}`, {
            diaBP: parseFloat(diaBP),
            sysBP: parseFloat(sysBP)
        });
        fetchData();
    };

    const handleGlucoseChange = async (value) => {
        setGlucoseInput(value);
        await axios.post(`http://${process.env.REACT_APP_API_PORT}/api/health/glucose/${localStorage.getItem("userId")}`, {
            glucose: parseFloat(value)
        });
        fetchData();
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <DefaultLayout>
            <>
                <Flex align="center" gap="large" wrap="wrap">
                    <Image preview={false} src={meditation}
                        style={{
                            maxWidth: 600,
                            maxHeight: 400,
                            marginLeft: 30,

                        }}
                        className={animate ? "animated-meditation" : ""}
                    />
                    <HealthEvaluate />
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
                                className="health-card"
                                hoverable
                                cover={
                                    <Image
                                        alt="example"
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
        </DefaultLayout>
    );
}

export default SucKhoe;
