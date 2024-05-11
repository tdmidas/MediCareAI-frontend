import React, { useState, useEffect, useRef } from 'react';
import DefaultLayout from '../../../layout/DefaultLayout';
import Webcam from 'react-webcam'; // Assuming you're using react-webcam for camera access
import './HeartRate.css';

const HeartRate = () => {
    const [heartRate, setHeartRate] = useState(0);
    const webcamRef = useRef(null);

    useEffect(() => {
        const detectHeartRate = async () => {
            // Get video stream data from webcam
            const videoStream = await webcamRef.current.getScreenshot();
            // Convert video stream data to signal (e.g., pixel intensity changes)
            const signal = convertVideoStreamToSignal(videoStream);
            // Calculate zero crossings from the signal
            const zeroCrossings = zeroCrossingDetection(signal);
            // Estimate heart rate based on zero crossings (example calculation)
            const newHeartRate = zeroCrossings * 2; // Adjust the scaling factor based on your data
            setHeartRate(newHeartRate);
        };

        const intervalId = setInterval(detectHeartRate, 1000); // Adjust interval as needed

        return () => clearInterval(intervalId);
    }, []);

    const convertVideoStreamToSignal = (videoStream) => {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = image.width;
                canvas.height = image.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(image, 0, 0, image.width, image.height);
                try {
                    const imageData = ctx.getImageData(0, 0, image.width, image.height);
                    const pixelData = imageData.data;
                    const signal = [];
                    for (let i = 0; i < pixelData.length; i += 4) {
                        const intensity = (pixelData[i] + pixelData[i + 1] + pixelData[i + 2]) / 3;
                        signal.push(intensity);
                    }
                    resolve(signal);
                } catch (error) {
                    reject(error.message);
                }
            };
            image.onerror = (error) => {
                reject(error.message || "Failed to load image.");
            };
            image.src = videoStream;
        });
    };


    const zeroCrossingDetection = (signal) => {
        let zeroCrossings = 0;
        for (let i = 1; i < signal.length; i++) {
            if ((signal[i] >= 0 && signal[i - 1] < 0) || (signal[i] < 0 && signal[i - 1] >= 0)) {
                zeroCrossings++;
            }
        }
        return zeroCrossings;
    };

    return (
        <DefaultLayout>
            <div className="heart-rate-container">
                <Webcam
                    ref={webcamRef}
                    mirrored={true}
                    style={{ width: '100%', height: 'auto' }}
                />
                <div className="heart-rate">{heartRate} BPM</div>
            </div>
        </DefaultLayout>
    );
};

export default HeartRate;
