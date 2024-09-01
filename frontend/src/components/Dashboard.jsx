import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError("You are not logged in.");
            return;
        }

        try {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.id;

            const fetchData = async () => {
                try {
                    const response = await axios.post(`http://localhost:8000/user/${userId}`);
                    setUser(response.data.user);
                } catch (err) {
                    setError("Failed to fetch data.");
                }
            };

            fetchData();
        } catch (err) {
            setError("Failed to decode token.");
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl mb-4">Welcome, {user.userName}</h1>
            {user.profilePicture && <img src={user.profilePicture} alt="Profile" className='h-20 w-20 rounded-full' />}
            <br />
            <p>Email: {user.email}</p>
            <button onClick={handleLogout} className="mt-4 bg-red-500 text-white py-2 px-4 rounded">
                Logout
            </button>
        </div>
    );
};

export default Dashboard;
