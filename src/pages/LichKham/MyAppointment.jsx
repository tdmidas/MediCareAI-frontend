import React from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import MainContentLayout from '../../layout/MainContentLayout';
import SideContentLayout from '../../layout/SideContentLayout';
const MyAppointment = () => {
    return (
        <DefaultLayout>
            <MainContentLayout>
                <h1>My appointment</h1>
            </MainContentLayout>
            <SideContentLayout>
                <h2>Side Content</h2>
            </SideContentLayout>
        </DefaultLayout>
    );
}

export default MyAppointment;