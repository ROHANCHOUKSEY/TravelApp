import React from 'react'
// import Filteraction from '../LocationFilteration/Filteraction'

const HomePage = () => {
    return (
        <div className="relative">
            {/* Hero Image Section */}
            <div className="relative w-full">
                <img
                    className="w-full h-[500px] md:h-[600px] lg:h-[700px] object-cover"
                    src="/Images/homeImage.webp"
                    alt="Incredible India"
                />
                {/* Gradient Overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            </div>

            {/* Content Section */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center px-4 max-w-6xl mx-auto relative bottom-20 md:bottom-25">
                    {/* Animated Badge */}
                    <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 mb-2 md:mb-8 animate-pulse">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-ping"></span>
                        <span className="text-white font-medium text-sm md:text-base">Live Adventure</span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase text-white tracking-tight mb-6 leading-tight">
                        <span className="block bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent mb-2">
                            Discover
                        </span>
                        <span className="text-2xl md:text-6xl block text-white drop-shadow-2xl">
                            Incredible India
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg md:text-2xl lg:text-3xl font-light text-white/95 mb-12 leading-relaxed max-w-4xl mx-auto drop-shadow-lg relative bottom-[29px] md:bottom-0">
                        Explore breathtaking destinations and hidden gems across our beautiful country
                    </p>
                </div>
            </div>
        </div>
    )
}

export default HomePage