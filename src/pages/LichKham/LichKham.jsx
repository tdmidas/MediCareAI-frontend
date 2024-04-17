import React, { useState } from 'react';
import { Steps, Flex } from 'antd';
import SelectDate from './SelectDate';
import PatientInfo from './PatientInfo';
import Payment from './Payment';
import Invoice from './Invoice';
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
    const [patientInfo, setPatientInfo] = useState(null);
    const [paymentInfo, setPaymentInfo] = useState(null);

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

    const handleNext = (info, doctorInfo) => {
        if (currentStep === 0) {
            setSelectedDoctorInfo(doctorInfo);
        } else if (currentStep === 1) {
            setPatientInfo(info);
        } else if (currentStep === 2) {
            setPaymentInfo(info);
        }

        setCurrentStep(currentStep + 1);
    };

    const handlePrev = () => {
        setCurrentStep(currentStep - 1);
    };

    return (
        <DefaultLayout>
            {isLoggedIn ? (
                <>
                    <Flex vertical gap="large" wrap='wrap' style={{ minHeight: "100vh" }}>
                        <Steps current={currentStep}>
                            <Step title="Select Appointment Date & Time" />
                            <Step title="Patient Information" />
                            <Step title="Payment" />
                            <Step title="Invoice" />
                        </Steps>
                        {currentStep === 0 && <SelectDate onNext={handleNext} />}
                        {currentStep === 1 && <PatientInfo onNext={handleNext} onPrev={handlePrev} doctorInfo={selectedDoctorInfo} />}
                        {currentStep === 2 && <Payment onNext={handleNext} onPrev={handlePrev} doctorInfo={selectedDoctorInfo} patientInfo={patientInfo} />}
                        {currentStep === 3 && (
                            <Invoice
                                doctorInfo={selectedDoctorInfo || {}}
                                patientInfo={patientInfo || {}}
                                paymentInfo={paymentInfo || {}}
                                onPrev={handlePrev}
                            />
                        )}
                    </Flex>
                </>
            ) : (
                <LoginRequired />
            )}
        </DefaultLayout>
    );
};

export default LichKham;
