import React from 'react'

const HomePage = () => {
    return (
        <>  
            <div className="w-full flex justify-center ">
                <img className="w-full h-120 backdrop-blur-sm" src="/Images/homeImage.webp" alt="" />
            </div>
            <div className="mb-8 relative bottom-100 text-center">
                <h1 className="text-2xl md:text-5xl md:text-7xl font-extrabold uppercase text-white tracking-tight mb-6">
                    <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                        Discover Incredible India
                    </span>
                </h1>
                <p className="text-[15px] md:text-3xl font-semibold text-white/90 mb-10 leading-relaxed">
                    Explore breathtaking destinations and hidden gems across our beautiful
                    country
                </p>
            </div>
        </>
    )
}

export default HomePage