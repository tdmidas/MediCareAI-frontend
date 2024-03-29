import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HeartRate from './HeartRate/HeartRate';
import BMI from './BMI/BMI';
import DuongHuyet from './DuongHuyet/DuongHuyet';
import HuyetAp from './HuyetAp/HuyetAp';

const SucKhoeDetail = () => {
    const { slug } = useParams();

    const renderComponent = (slug) => {
        switch (slug) {
            case 'nhip-tim':
                return <HeartRate />;
            case 'chi-so-bmi':
                return <BMI />;
            case 'huyet-ap':
                return <HuyetAp />;
            case 'duong-huyet':
                return <DuongHuyet />
            default:
                return <div>Invalid health metric</div>;
        }
    };

    return (
        <>
            {renderComponent(slug)}
        </>
    );
};

export default SucKhoeDetail;
