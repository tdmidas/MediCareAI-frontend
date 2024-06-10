import React, { useState, useEffect } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import MainContentLayout from '../../layout/MainContentLayout';
import SideContentLayout from '../../layout/SideContentLayout';
import { Flex, Typography, Image, Card, Tabs, Spin, Button, message, Modal } from 'antd';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import axios from 'axios';
const { Title, Text } = Typography;
const { confirm } = Modal;
const MyAppointment = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1024 });
    const fetchData = async () => {
        try {
            const userId = localStorage.getItem('userId');
            const response = await axios.get(`http://medicare-ai-backend-env.eba-wt2prnnx.ap-southeast-1.elasticbeanstalk.com/api/appointments/my/${userId}`);
            setAppointments(response.data);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        } finally {
            setLoading(false); // Set loading to false regardless of success or error
        }
    };
    const handleDeleteAppointment = async (appointmentId) => {
        try {
            confirm({
                title: 'Bạn có chắc muốn hủy lịch này?',
                okText: 'Xác nhận',
                cancelText: 'Hủy',
                onOk: async () => {
                    await axios.delete(`http://medicare-ai-backend-env.eba-wt2prnnx.ap-southeast-1.elasticbeanstalk.com/api/appointments/${appointmentId}`);
                    message.success('Đã hủy lịch khám');
                    fetchData();
                }
            });
        } catch (error) {
            console.error('Error deleting appointment:', error);
        }
    };

    const handleUpdateAppointment = async (appointmentId, stateUpdate) => {
        try {
            confirm({
                title: 'Bạn có chắc muốn cập nhật trạng thái lịch này?',
                okText: 'Xác nhận',
                cancelText: 'Hủy',
                onOk: async () => {
                    await axios.put(`http://medicare-ai-backend-env.eba-wt2prnnx.ap-southeast-1.elasticbeanstalk.com/api/appointments/${appointmentId}`, { state: stateUpdate });
                    message.success('Đã cập nhật lịch khám');
                    fetchData();
                }
            });
        } catch (error) {
            console.error('Error updating appointment:', error);
        }
    };


    useEffect(() => {
        fetchData();
    }, []);

    const doneAppointment = appointments.filter(appointment => appointment.state === 'done');
    const pendingAppointment = appointments.filter(appointment => appointment.state === 'pending');

    return (
        <DefaultLayout>
            <Flex gap="large" wrap="wrap">
                <MainContentLayout>
                    <Flex vertical>
                        <Title level={2}>Lịch khám của tôi</Title>
                        <Spin spinning={loading}>
                            <Tabs defaultActiveKey="1">
                                <Tabs.TabPane tab="Đã Khám" key="1">
                                    {doneAppointment.map(appointment => (
                                        <Link to={`/lichkham/${appointment.appointmentId}`}>
                                            <Card key={appointment.appointmentId} style={{
                                                maxWidth: 500, padding: "20px",
                                                marginBottom: "20px",
                                                width: isMobile ? "100%" : isTablet ? "50%" : "750px",
                                                boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                                                transition: "0.3s",
                                                borderRadius: 15
                                            }}>
                                                <Flex gap={20}>
                                                    <Image src={appointment.photo} preview={false} style={{
                                                        width: 110, height: 110,
                                                        borderRadius: 50, backgroundColor: 'orange'
                                                    }} />
                                                    <Flex vertical gap={5}>
                                                        <Title level={4}>{appointment.doctorName}</Title>
                                                        <Text>{appointment.bookDate}</Text>
                                                        <Flex gap={10}>          <Text>{appointment.dayTime}</Text>
                                                            <Text>{appointment.startHour}h-{appointment.endHour}h {appointment.dayTime === 'morning' ? 'AM' : 'PM'} </Text>

                                                        </Flex>
                                                        <Flex gap={15} style={{ marginTop: 10 }}>

                                                            <Button type='primary' onClick={() => handleDeleteAppointment(appointment.appointmentId)}>Hủy lịch</Button>
                                                        </Flex>
                                                    </Flex>
                                                </Flex>
                                            </Card>
                                        </Link>
                                    ))}
                                </Tabs.TabPane>
                                <Tabs.TabPane tab="Chờ khám" key="2">
                                    {pendingAppointment.map(appointment => (
                                        <Card key={appointment.appointmentId} style={{
                                            maxWidth: 500, padding: "20px",
                                            marginBottom: "20px",
                                            width: isMobile ? "100%" : isTablet ? "50%" : "750px",
                                            boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                                            transition: "0.3s",
                                            borderRadius: 15
                                        }}>
                                            <Flex gap={20}>
                                                <Image src={appointment.photo} preview={false} alt='doctor avatar'
                                                    style={{
                                                        width: 110, height: 110,
                                                        borderRadius: 50, backgroundColor: 'orange'
                                                    }} />
                                                <Flex vertical gap={5} >
                                                    <Title level={4}>{appointment.doctorName}</Title>
                                                    <Text>{appointment.bookDate}</Text>
                                                    <Flex gap={10}>          <Text>{appointment.dayTime}</Text>
                                                        <Text>{appointment.startHour}h-{appointment.endHour}h {appointment.dayTime === 'morning' ? 'AM' : 'PM'} </Text>

                                                    </Flex>
                                                    <Flex gap={15} style={{ marginTop: 10 }}>
                                                        <Button type='primary' onClick={() => handleUpdateAppointment(appointment.appointmentId, 'done')}>Đã khám</Button>
                                                        <Button onClick={() => handleDeleteAppointment(appointment.appointmentId)}>Hủy lịch</Button>

                                                    </Flex>


                                                </Flex>
                                            </Flex>
                                        </Card>
                                    ))}
                                </Tabs.TabPane>
                            </Tabs>
                        </Spin>
                    </Flex>
                </MainContentLayout>
                <SideContentLayout>
                    <Image preview={false} src="https://d1xjlj96to6zqh.cloudfront.net/doctor-2.png" style={{ width: "100%", padding: 20 }} alt='side doctor image vector 1' />
                    <Image preview={false} src="https://d1xjlj96to6zqh.cloudfront.net/doctor-3.png" style={{ width: "100%", padding: 20 }} alt='side doctor image vector 2' />
                </SideContentLayout>
            </Flex>
        </DefaultLayout>
    );
};

export default MyAppointment;
