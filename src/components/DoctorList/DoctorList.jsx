import { Flex, Card, Typography, Button, Image, Tag } from "antd";
import React, { useEffect } from "react";
import "./DoctorList.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
const DoctorList = () => {
    const navigate = useNavigate();
    const [doctors, setDoctors] = React.useState([]);
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get(`https://medicareai-backend.onrender.com/api/doctors`);
                setDoctors(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchDoctors();
    }, []);
    const handleClick = () => {
        navigate('/doctors');
    };
    return (
        <>
            <Flex align="center" justify="space-between" wrap="wrap">
                <Typography.Title level={3} strong>
                    Bác sĩ nổi bật
                </Typography.Title>
                <Button type="link" style={{ color: "#069390" }} onClick={handleClick}>
                    Xem thêm
                </Button>
            </Flex>
            <Flex align="center" gap="large" wrap="wrap">
                {doctors.slice(0, 3).map((doctor, index) => (
                    <Link to={`/doctors/${doctor.doctorId}`} key={index}>

                        <Card
                            key={index}
                            className="doctor-card"
                            hoverable
                            cover={
                                <Image
                                    alt="example"
                                    src={doctor.photo}
                                    style={{ display: "block", height: "200px", maxWidth: "100%", objectFit: "cover", borderRadius: "100px" }}
                                    preview={false}
                                    loading="lazy"
                                    decoding="async"
                                />
                            }
                            style={{ flex: "0 1 300px", height: "450px", width: "260px", padding: "20px", marginBottom: "20px" }}
                        >
                            <Flex >
                                <Flex vertical aligh="center" gap="10px">
                                    <Flex gap="10px">
                                        <Tag color="#069390" style={{ fontSize: 11 }}>{doctor.speciality}</Tag>
                                        <Typography.Text level={4} strong >
                                            <Image src="https://d1xjlj96to6zqh.cloudfront.net/Star.png" />  {doctor.avgRating}  ({doctor.totalRating})
                                        </Typography.Text>
                                    </Flex>
                                    <Typography.Title level={4} strong>
                                        {doctor.name}
                                    </Typography.Title>
                                    <Typography.Text type="secondary" >
                                        {doctor.short}
                                    </Typography.Text>



                                </Flex>
                            </Flex>
                        </Card>
                    </Link>))

                }

            </Flex>
        </>
    );
}

export default DoctorList;