import { Flex } from "antd";
import React from "react";
import Banner from "../Banner/Banner";
import HealthTrackList from "../HealthTrackList/HealthTrackList";
const MainContent = () => {
    return (


        <div style={{ flex: 1 }}>
            <Flex vertical gap="2.3rem">
                <Banner />
                <HealthTrackList />
            </Flex>
        </div>
    );
}

export default MainContent;