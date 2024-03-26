import React, { useState, useEffect } from 'react';
import './HeartRate.css';

const HeartRate = () => {
    const [heartRate, setHeartRate] = useState(0);
    const [videoStream, setVideoStream] = useState(null);
    const [canvas, setCanvas] = useState(null);

    useEffect(() => {
        const constraints = {
            video: true,
        };

        navigator.mediaDevices.getUserMedia(constraints)
            .then((stream) => {
                setVideoStream(stream);
                const video = document.createElement('video');
                video.srcObject = stream;
                video.play();
                const newCanvas = document.createElement('canvas'); // Create a new canvas element
                setCanvas(newCanvas); // Set the canvas state
                const context = newCanvas.getContext('2d'); // Get context from the new canvas
                const interval = setInterval(() => {
                    if (context) {
                        context.drawImage(video, 0, 0, 300, 200);
                        const imageData = context.getImageData(0, 0, 300, 200);
                        const data = imageData.data;
                        let sum = 0;
                        for (let i = 0; i < data.length; i += 4) {
                            sum += (data[i] + data[i + 1] + data[i + 2]) / 3;
                        }
                        const average = sum / (data.length / 4);
                        setHeartRate(calculateHeartRate(average));
                    }
                }, 1000);
                return () => {
                    clearInterval(interval);
                    stream.getTracks().forEach(track => track.stop());
                };
            })
            .catch((error) => {
                console.error('Error accessing camera:', error);
            });
    }, []);

    const calculateHeartRate = (average) => {
        const threshold = 20; // Threshold for detecting peaks
        let crossings = 0;
        let previousValue = 0;

        // Detect zero crossings
        for (let i = 0; i < average.length; i++) {
            if ((average[i] > threshold && previousValue <= threshold) || (average[i] < threshold && previousValue >= threshold)) {
                crossings++;
            }
            previousValue = average[i];
        }

        // Calculate heart rate based on the number of zero crossings
        const fps = 30; // Assuming 30 frames per second
        const duration = average.length / fps; // Duration in seconds
        const heartRate = (crossings / 2) / duration; // Dividing by 2 because each cycle has two crossings (up and down)

        return Math.round(heartRate * 60); // Convert to beats per minute
    };


    return (
        <div className="heart-rate-container">
            <h2>Heart Rate Monitor</h2>
            <div className="video-container">
                {canvas && <video ref={(ref) => ref && ref.srcObject && ref.play()} width="300" height="200" />}
            </div>
            <div className="heart-rate-display">
                <p>Heart Rate: {heartRate} BPM</p>
            </div>
        </div>
    );
};

export default HeartRate;
