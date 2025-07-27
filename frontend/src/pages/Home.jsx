import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="relative h-screen w-full">
            {/* Background image with overlay */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-[url('https://images.unsplash.com/photo-1619059558110-c45be64b73ae?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] z-0" />
                <div className="absolute inset-0 bg-black/40 z-[1]" /> {/* Dark overlay */}
            </div>

            {/* Overlay content */}
            <div className="relative z-10 flex flex-col justify-between h-full">
                {/* Logo */}
                <div className="pt-8 pl-8">
                    <img 
                        className="w-12 brightness-0 invert" 
                        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" 
                        alt="logo" 
                    />
                </div>

                {/* Bottom card */}
                <div className="bg-white pb-7 py-4 px-4 rounded-t-3xl">
                    <h2 className="text-3xl font-bold mb-2">Get moving with Uber</h2>
                    <p className="text-gray-600 mb-6">Safe, reliable rides at your fingertips</p>
                    <Link 
                        to="/login" 
                        className="flex items-center justify-center w-full bg-black text-white py-4 rounded-xl text-lg font-medium hover:bg-gray-900 transition-colors"
                    >
                        Continue
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
