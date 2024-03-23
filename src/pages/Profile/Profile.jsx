import DefaultLayout from '../../layout/DefaultLayout';
import LoginRequired from '../LoginRequired/LoginRequired';

import "./Profile.css"
const Profile = () => {
    return (
        <DefaultLayout>
            <LoginRequired />
        </DefaultLayout>
    );
}

export default Profile;