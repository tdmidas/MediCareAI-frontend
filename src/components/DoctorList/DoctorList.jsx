import { Flex, Card, Typography, Button, Image, Tag } from "antd";
import doctors from "../../data/doctors";
import React from "react";
import "./DoctorList.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const starIcon = require("../../assets/Star.png");
const DoctorList = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/doctors');
    };
    return (
        <>
            <Flex align="center" justify="space-between" wrap="wrap">
                <Typography.Title level={3} strong>
                    Bác sĩ nổi bật
                </Typography.Title>
                <Button type="link" className="primary--color" onClick={handleClick}>
                    Xem thêm
                </Button>
            </Flex>
            <Flex align="center" gap="large" wrap="wrap">
                {doctors.slice(0, 2).map((doctor, index) => (
                    <Link to={`/doctors/${doctor.id}`} key={index}>

                        <Card
                            key={index}
                            className="doctor-card"
                            hoverable
                            cover={
                                <Image
                                    alt="example"
                                    src={doctor.photo}
                                    style={{ display: "block", height: "250px", maxWidth: "100%", objectFit: "cover" }}
                                />
                            }
                            style={{ flex: "0 1 300px", height: "500px", width: "300px", padding: "20px", marginBottom: "20px" }}
                        >
                            <Flex >
                                <Flex vertical aligh="center" gap="10px">
                                    <Flex gap="10px">
                                        <Tag color="#069390" style={{ fontSize: 15 }}>{doctor.speciality}</Tag>
                                        <Typography.Text level={3} strong >
                                            <Image src={starIcon} />  {doctor.avgRating}  ({doctor.totalRating})
                                        </Typography.Text>
                                    </Flex>
                                    <Typography.Title level={3} strong>
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