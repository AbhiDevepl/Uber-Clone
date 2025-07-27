import React, { useState }  from 'react'
import { Link } from 'react-router-dom'

const Captainlogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [captainData, setCaptainData] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        setCaptainData({
            email: email,
            password: password
        });
        console.log(userData);
       setEmail('');
       setPassword('');
    }
    return (
        <div className='p-7 h-screen flex flex-col justify-between '>
            <div>
                <img 
                    className='w-16 mb-10' 
                    src="https://www.svgrepo.com/show/505031/uber-driver.svg" 
                    alt="logo" 
                />

                <form onSubmit={handleSubmit}>
                    <h3 className='text-lg font-medium mb-2'>What's your email</h3>
                    <input 
                        required 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                        type="email"
                        placeholder='email@example.com' 
                    />

                    <h3 className='text-lg font-medium mb-2'>Enter your password</h3>
                    <input 
                        required 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                        type="password" 
                        placeholder='password' 
                    />

                    <button 
                        className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                    >
                        Login
                    </button>

                    <p className='text-center'>
                        Join a fleet? <Link className='text-blue-600' to="/signup">captain-signup </Link>
                    </p>
                </form>
            </div>

            <div>
                <Link
                to="/login"
                    className='bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                >
                    Sign in as a User
                </Link>
            </div>
        </div>
    )
}

export default Captainlogin;