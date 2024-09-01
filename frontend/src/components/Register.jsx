import React, { useState } from 'react';
import axios from 'axios';
import BgImg from "../images/loginwallpaper.png";
import { useNavigate } from 'react-router-dom';

export default function Register() {

    const navigate = useNavigate();

    const [registerData, setRegisterData] = useState({
        profilePicture: '',
        userName: '',
        password: '',
        email: ''
    });

    const handleChange = (e) => {
        setRegisterData({
            ...registerData,
            [e.target.name]: e.target.value,
        });
    };

    const registerUser = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8000/register", registerData);
            alert("Successfully Registered!");
            navigate('/dashboard')
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="bg-cover bg-center min-h-screen flex items-center justify-center" style={{backgroundImage: `url(${BgImg})`}}>
                <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-8">
                    <form onSubmit={registerUser} className="space-y-6">
                        <div>
                            <input 
                                type="text" 
                                name="profilePicture" 
                                id="profilePicture"
                                placeholder="Enter profile picture"
                                onChange={handleChange}
                                className="block w-full rounded-md h-10 outline-0 ps-3 mb-5 bg-gray-200" />
                        </div>
                        <div>
                            <input 
                                type="text" 
                                name="userName" 
                                id="userName"
                                placeholder="Enter username"
                                onChange={handleChange}
                                className="block w-full rounded-md h-10 outline-0 ps-3 mb-5 bg-gray-200" />
                        </div>
                        <div>
                            <input 
                                type="password" 
                                name="password" 
                                id="password"
                                placeholder="Enter password"
                                onChange={handleChange}
                                className="block w-full rounded-md h-10 outline-0 ps-3 mb-5 bg-gray-200" />
                        </div>
                        <div>
                            <input 
                                type="email" 
                                name="email" 
                                id="email"
                                placeholder="Enter email"
                                onChange={handleChange}
                                className="block w-full rounded-md h-10 outline-0 ps-3 mb-5 bg-gray-200" />
                        </div>
                        <button
                            type="submit"
                            className="w-full h-12 font-semibold text-lg px-5 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-600 transition-all">
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}
