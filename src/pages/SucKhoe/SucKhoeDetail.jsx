// SucKhoeDetail.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HeartRate from '../../components/HeartRate/HeartRate';
const SucKhoeDetail = () => {
    const { slug } = useParams();
    const [healthMeasure, setHealthMeasure] = useState(null);

    useEffect(() => {
        // Fetch health measure details based on slug
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/suckhoe/${slug}`); // Assuming you have an API endpoint to fetch health measure data
                const data = await response.json();
                setHealthMeasure(data);
            } catch (error) {
                console.error('Error fetching health measure details:', error);
            }
        };

        fetchData();
    }, [slug]);

    return (
        <>
            <HeartRate />
        </>
    );
};

export default SucKhoeDetail;
