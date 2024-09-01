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
            setUser(decodedToken);

            console.log(decodedToken)
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
            <p>Email: {user.email}</p>
            <button onClick={handleLogout} className="mt-4 bg-blue-900 text-white py-2 px-4 rounded">
                Logout
            </button>
        </div>
    );
};

export default Dashboard;
