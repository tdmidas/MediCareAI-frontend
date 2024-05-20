import './Home.css';
import DefaultLayout from '../../layout/DefaultLayout';
import { Flex, Card, Image, Typography, Button } from "antd";
import React, { useState, useEffect } from "react";
import Banner from '../../components/Banner/Banner';
import HealthTrackList from '../../components/HealthTrackList/HealthTrackList';
import BLogList from '../../components/BlogList/BlogList';
import DoctorList from '../../components/DoctorList/DoctorList';
import MainContentLayout from "../../layout/MainContentLayout";
import SideContentLayout from '../../layout/SideContentLayout';
import BasicDateCalendar from '../../components/Calendar/Calendar';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import axios from 'axios';
const { Title, Text } = Typography;
const Home = () => {
    const navigate = useNavigate();
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1024 });
    const [appointments, setAppointments] = useState([]);
    const fetchAppointment = async () => {
        try {
            const userId = localStorage.getItem('userId');
            const response = await axios.get(`https://medicareai-backend.onrender.com/api/appointments/my/${userId}`);
            setAppointments(response.data);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };
    useEffect(() => {
        fetchAppointment();
    }, []);
    const doneAppointment = appointments.filter(appointment => appointment.state === 'pending');
    const handleClick = () => {
        navigate('/lichkham');
    };
    return (
        <DefaultLayout>
            <Flex gap="large" wrap='wrap'>
                <MainContentLayout />
                <Flex vertical gap="2.3rem" wrap='wrap'>
                    <Banner />
                    <HealthTrackList />
                    <BLogList />
                    <DoctorList />


                </Flex>
                <MainContentLayout />
                <SideContentLayout>
                    <Flex vertical gap="large">
                        <Card className="side-card" cover={
                            <Image
                                preview={false}
                                alt="doctor side image"
                                src="https://d1xjlj96to6zqh.cloudfront.net/doctor-1.png"
                                style={{ float: "right", position: "absolute", paddingBottom: "72px", paddingLeft: "90px", width: "auto", height: "300px" }}
                                loading="lazy"
                                decoding="async"
                            />
                        } style={{ maxWidth: 400 }}>
                            <Flex vertical gap="large">
                                <Typography.Title level={4} strong style={{ color: 'white' }}>
                                    The better<br />  health
                                </Typography.Title>
                                <Typography.Title level={4} strong style={{ color: 'white' }}>
                                    The better<br /> life
                                </Typography.Title>

                            </Flex >
                        </Card >
                        <Card style={{ maxWidth: 400 }}>

                            <BasicDateCalendar />
                            <Button className="calendar-btn" size="large" type="primary" onClick={handleClick} style={{ alignContent: "center" }}>
                                Đặt lịch khám
                            </Button>
                        </Card>
                        {doneAppointment.slice(0, 2).map((appointment, index) => (
                            <Card key={appointment.appointmentId} style={{
                                maxWidth: 500,
                                width: isMobile ? "100%" : isTablet ? "50%" : "350px",
                                boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                                transition: "0.3s",
                                borderRadius: 25,
                                backgroundColor: '#21c3c0',
                                filter: 'drop-shadow(0px 0px 10px rgb(186, 255, 241))'
                            }}>
                                <Flex gap={10}>
                                    <Image src={appointment.photo} preview={false}
                                        alt='done-appointment'
                                        style={{
                                            width: 80, height: 80,
                                            borderRadius: 50, boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)", backgroundColor: 'orange'
                                        }} />
                                    <Flex vertical >
                                        <Title level={5} style={{ color: "white" }}>{appointment.doctorName}</Title>
                                        <Text style={{ color: "white" }}>{appointment.bookDate}</Text>
                                        <Flex gap={10} >
                                            <Text style={{ color: "white" }}>{appointment.dayTime}</Text>
                                            <Text style={{ color: "white" }}>{appointment.startHour}h-{appointment.endHour}h {appointment.dayTime === 'morning' ? 'AM' : 'PM'} </Text>
                                        </Flex>


                                    </Flex>
                                </Flex>
                            </Card>
                        ))}

                        <Image
                            preview={false}
                            alt="doctor side image"
                            src="https://d1xjlj96to6zqh.cloudfront.net/doctor-3.png"
                            style={{ maxHeight: "480px", maxWidth: "400px", boxShadow: "0 0 10px 0 rgba(0,0,0,0.2)", borderRadius: "10px", marginTop: "20px" }}
                            loading="lazy"
                            decoding="async"
                        />



                    </Flex>


                </SideContentLayout>
            </Flex >


        </DefaultLayout >

    );
}

export default Home;