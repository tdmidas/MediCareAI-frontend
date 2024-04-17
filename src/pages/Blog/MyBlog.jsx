import React from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import MainContentLayout from '../../layout/MainContentLayout';
import SideContentLayout from '../../layout/SideContentLayout';
const MyBlog = () => {
    return (
        <DefaultLayout>
            <MainContentLayout>
                <h1>My Blog</h1>
            </MainContentLayout>
            <SideContentLayout>
                <h2>Side Content</h2>
            </SideContentLayout>
        </DefaultLayout>
    );
}

export default MyBlog;