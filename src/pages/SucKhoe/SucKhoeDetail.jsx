import { useParams } from 'react-router-dom';
import BMI from './BMI/BMI';
import DuongHuyet from './DuongHuyet/DuongHuyet';
import HuyetAp from './HuyetAp/HuyetAp';
import HeartRate from './HeartRate/HeartRate';
const SucKhoeDetail = () => {
    const { slug } = useParams();

    const renderComponent = (slug) => {
        switch (slug) {
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
