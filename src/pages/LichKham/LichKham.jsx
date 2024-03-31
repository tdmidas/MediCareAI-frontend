// LichKham.jsx
import React, { useState } from 'react';
import { Steps, Flex } from 'antd';
import SelectDate from './SelectDate';
import PatientInfo from './PatientInfo';
import Payment from './Payment';
import './LichKham.css';
import DefaultLayout from '../../layout/DefaultLayout';
import LoginRequired from '../LoginRequired/LoginRequired';
import { auth } from '../../firebaseConfig';
import { useEffect } from 'react';
const { Step } = Steps;

const LichKham = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedDoctorInfo, setSelectedDoctorInfo] = useState(null);
    const [patientInfo, setPatientInfo] = useState(null); // State to store patient info

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleNext = (patientInfo, doctorInfo) => {
        setPatientInfo(patientInfo); // Store patient info
        setSelectedDoctorInfo(doctorInfo); // Store selected doctor info
        setCurrentStep(currentStep + 1);
    };

    const handlePrev = () => {
        setCurrentStep(currentStep - 1);
    };

    return (
        <DefaultLayout>
            {isLoggedIn ? (
                <>
                    <Flex vertical gap="large" wrap='wrap'>
                        <Steps current={currentStep}>
                            <Step title="Select Appointment Date & Time" />
                            <Step title="Patient Information" />
                            <Step title="Payment" />
                        </Steps>
                        {currentStep === 0 && <SelectDate onNext={handleNext} />}
                        {currentStep === 1 && <PatientInfo onNext={handleNext} onPrev={handlePrev} doctorInfo={selectedDoctorInfo} />} {/* Pass selected doctor info */}
                        {currentStep === 2 && <Payment onPrev={handlePrev} doctorInfo={selectedDoctorInfo} patientInfo={patientInfo} />} {/* Pass patient info and selected doctor info */}
                    </Flex>
                </>
            ) : (
                <LoginRequired /> // Render LoginRequired component for users not logged in
            )}
        </DefaultLayout>
    );
};

export default LichKham;
