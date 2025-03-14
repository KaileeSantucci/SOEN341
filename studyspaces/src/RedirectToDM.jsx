import { useEffect } from 'react';

const RedirectToDM = () => {
    useEffect(() => {
        window.location.href = "http://localhost:5173/DirectMessaging/index.html"; // Redirect to Login page

    }, []);

    return null;
};

export default RedirectToDM;