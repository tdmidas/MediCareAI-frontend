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

    const handleNext = () => {

        setCurrentStep(currentStep + 1);
    };

    const handlePrev = () => {
        setCurrentStep(currentStep - 1);
    };

    return (
        <DefaultLayout>
            {isLoggedIn ? (
                <>
                    <Steps current={currentStep} className="steps">
                        <Step title="Select Date" />
                        <Step title="Patient Info" />
                        <Step title="Payment" />
                        <Step title="Invoice" />
                    </Steps>
                    <Flex justifyContent="center">
                        {currentStep === 0 && <SelectDate onNext={handleNext} />}
                        {currentStep === 1 && <PatientInfo onNext={handleNext} onPrev={handlePrev} />}
                        {currentStep === 2 && <Payment onNext={handleNext} onPrev={handlePrev} />}
                        {currentStep === 3 && <Invoice onPrev={handlePrev} />}
                    </Flex>

                </>
            ) : (
                <LoginRequired />
            )}
        </DefaultLayout>
    );
};

export default LichKham;
