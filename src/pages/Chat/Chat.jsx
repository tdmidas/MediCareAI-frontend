import React, { useState, useEffect } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import LoginRequired from '../LoginRequired/LoginRequired';
import { auth } from '../../firebaseConfig';

const Chat = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <DefaultLayout>
            {isLoggedIn ? (
                <>


                </>
            ) : (
                <LoginRequired /> // Render LoginRequired component for users not logged in
            )}
        </DefaultLayout>
    );
}

export default Chat;
