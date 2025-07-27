import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const UserSignup = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your signup logic here
        console.log('Form submitted:', formData);
    };

    return (
        <div className='p-7 h-screen flex flex-col justify-between '>
        <div>
            <img 
                className='w-16 mb-10' 
                src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" 
                alt="logo" 
            />

            <form onSubmit={handleSubmit}>
                <h3 className='text-lg font-medium mb-2'>What's your name</h3>
                <div className='flex'>
                <input 
                    required 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border text-lg placeholder:text-base'
                    type="text"
                    placeholder='Enter your firstname'
                />
                <input 
                    required 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border text-lg placeholder:text-base'
                    type="text"
                    placeholder='Enter your lastname'
                />
                </div>
                <h3 className='text-lg font-medium mb-2'>What's your email</h3>
                <input 
                    required 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                    type="email"
                    placeholder='Enter your email'
                />

                <h3 className='text-lg font-medium mb-2'>Enter your password</h3>
                <input 
                    required 
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                    type="password"
                    placeholder='Enter your password'
                />

                <button 
                    className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                >
                    Sign up
                </button>

                <p className='text-center'>
                    Already have an account? <Link className='text-blue-600' to="/login">Login here</Link>
                </p>
            </form>
        </div>

        <div>
            <Link 
            to="/captain-login"
                className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            >
                Sign in as a captain
            </Link>
        </div>
    </div>
)
}

export default UserSignup;