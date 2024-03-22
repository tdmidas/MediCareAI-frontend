import './Home.css';
import DefaultLayout from '../../layout/DefaultLayout';
import { Flex } from 'antd';
import MainContent from '../../components/MainContent/MainContent';
import SideContent from '../../components/SideContent/SideContent';
const Home = () => {
    return (
        <DefaultLayout>
            <Flex gap="large">
                <MainContent />

                <SideContent />

            </Flex>


        </DefaultLayout>

    );
}

export default Home;