import { useParams } from 'react-router-dom';
import BMI from './BMI/BMI';
import DuongHuyet from './DuongHuyet/DuongHuyet';
import HuyetAp from './HuyetAp/HuyetAp';
import Cholesterol from './Cholesterol/Cholesterol';
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
            case "cholesterol":
                return <Cholesterol />;
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
