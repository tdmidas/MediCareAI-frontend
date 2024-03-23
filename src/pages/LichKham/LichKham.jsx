import './LichKham.css';
import DefaultLayout from '../../layout/DefaultLayout';
import LoginRequired from '../LoginRequired/LoginRequired';
const LichKham = () => {
    return (
        <DefaultLayout>
            <LoginRequired />
        </DefaultLayout>
    );
}

export default LichKham;