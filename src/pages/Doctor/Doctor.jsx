import React from "react";
import { Link } from "react-router-dom";
import "./Doctor.css";
import { Flex, Typography, Image, Card, Tag, Pagination, message } from "antd";
import DefaultLayout from '../../layout/DefaultLayout';
import MainContentLayout from "../../layout/MainContentLayout";
import axios from "axios";
import ContentLoader from "react-content-loader";

const DoctorLoader = () => (
    <ContentLoader
        speed={2}
        width={300}
        height={500}
        viewBox="0 0 300 500"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <rect x="0" y="0" rx="5" ry="5" width="300" height="250" />
        <rect x="20" y="270" rx="5" ry="5" width="260" height="20" />
        <rect x="20" y="300" rx="5" ry="5" width="260" height="20" />
        <rect x="20" y="330" rx="5" ry="5" width="260" height="20" />
    </ContentLoader>
);

const Doctor = () => {
    const [doctors, setDoctors] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [currentPage, setCurrentPage] = React.useState(1);
    const doctorsPerPage = 6;

    React.useEffect(() => {

        const apiUrl = process.env.REACT_APP_API_URL;
        axios.get(`http://medicare-ai-backend-env.eba-wt2prnnx.ap-southeast-1.elasticbeanstalk.com/api/doctors`)
            .then(response => {
                setDoctors(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.log("Error fetching data", error);
                setLoading(false);
            });
    }, []);

    const indexOfLastDoctor = currentPage * doctorsPerPage;
    const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
    const currentDoctors = doctors.slice(indexOfFirstDoctor, indexOfLastDoctor);
    const handleChangePage = (page) => {
        setCurrentPage(page);
    };

    return (
        <DefaultLayout>
            <Flex gap="large">
                <MainContentLayout>
                    <Flex align="center" justify="space-between">
                        <Typography.Title level={3} strong>
                            Bác sĩ nổi bật
                        </Typography.Title>
                    </Flex>
                    {loading ? (
                        <Flex wrap="wrap" align="center" gap="large">
                            <DoctorLoader />
                        </Flex>
                    ) : (
                        <Flex wrap="wrap" align="center" gap="large">
                            {currentDoctors.map((doctor, index) => (
                                <Link to={`/doctors/${doctor.doctorId}`} key={index}>
                                    <Card
                                        key={index}
                                        className="doctor-card"
                                        hoverable
                                        cover={
                                            <Image
                                                alt="doctor list image"
                                                src={doctor.photo}
                                                preview={false}
                                                style={{ display: "block", height: "250px", maxWidth: "100%", objectFit: "cover", borderRadius: 130 }}
                                            />
                                        }
                                        style={{ flex: "0 1 300px", height: "500px", width: "300px", padding: "20px", marginBottom: "20px" }}
                                    >
                                        <Flex>
                                            <Flex vertical aligh="center" gap="10px">
                                                <Flex gap="10px">
                                                    <Tag color="#069390" style={{ fontSize: 15 }}>{doctor.speciality}</Tag>

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
                                </Link>
                            ))}
                        </Flex>
                    )}
                    <Flex justify="center">
                        <Pagination className="blog-pagination" defaultCurrent={1} total={doctors.length} pageSize={doctorsPerPage} onChange={handleChangePage} style={{ marginBottom: 30 }} />
                    </Flex>
                </MainContentLayout>
            </Flex>
        </DefaultLayout>
    );
}

export default Doctor;
