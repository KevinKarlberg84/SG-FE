import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [backendData, setBackendData] = useState(null);

    useEffect(() => {
        const getAccessTokenAndFetchData = async () => {
            try {
                // Get the access token
                const accessToken = await getAccessTokenSilently();
                console.log('Access Token:', accessToken); // Log the access token to the console

                // Use the access token to make a request to your backend
                const response = await fetch('https://localhost:7167/api/Login/Test', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                const data = await response.json();
                console.log('Response from API:', data); // Log the response object from the API call to the console
                setBackendData(data);
            } catch (e) {
                console.error(e);
            }
        };

        if (isAuthenticated) {
            getAccessTokenAndFetchData();
        }
    }, [isAuthenticated, getAccessTokenSilently]);

    return (
        isAuthenticated && (
            <article className='column'>
                {user?.picture && <img src={user.picture} alt={user?.name} />}
                <h2>{user?.name}</h2>
                <ul>
                    {Object.keys(user).map((objKey, i) => (
                        <li key={i}>{objKey}: {user[objKey]}</li>
                    ))}
                </ul>
                {backendData && (
                    <div>
                        <h3>Backend Data</h3>
                        {/* Render your backend data here */}
                    </div>
                )}
            </article>
        )
    );
};

export default Profile;
