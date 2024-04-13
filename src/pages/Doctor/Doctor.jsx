import React from "react";
import { Link } from "react-router-dom";
import "./Doctor.css";
import { Flex, Typography, Image, Card, Tag, Pagination } from "antd";
import DefaultLayout from '../../layout/DefaultLayout';
import MainContentLayout from "../../layout/MainContentLayout";
import axios from "axios";
import doctorss from "../../data/doctors";
const starIcon = require("../../assets/Star.png");

const Doctor = () => {
    const [doctors, setDoctors] = React.useState([]);
    React.useEffect(() => {
        const token = localStorage.getItem('accessToken');

        axios.get("http://localhost:5000/api/doctors", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setDoctors(response.data);
            })
            .catch(error => {
                console.log("Error fetching data", error);
            });
    }, []);
    return (
        <DefaultLayout>
            <Flex gap="large" >
                <MainContentLayout>

                    <Flex align="center" justify="space-between" >
                        <Typography.Title level={3} strong>
                            Bác sĩ nổi bật
                        </Typography.Title>
                    </Flex>
                    <Flex wrap="wrap" align="center" gap="large">

                        {doctorss.map((doctor, index) => (
                            <Link to={`/doctors/${doctor.doctorId}`} key={index}>
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
                                                <Tag color="#069390" style={{ fontSize: 15 }}>{doctor.specialty}</Tag>
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
                    <Flex justify="center">
                        <Pagination className="blog-pagination" defaultCurrent={1} total={50} />
                    </Flex>

                </MainContentLayout>
            </Flex>
        </DefaultLayout>

    );
}

export default Doctor;