import DefaultLayout from '../../layout/DefaultLayout';
import LoginRequired from '../LoginRequired/LoginRequired';
const Chat = () => {
    return (
        <DefaultLayout>
            <LoginRequired />
        </DefaultLayout>
    );
}

export default Chat;