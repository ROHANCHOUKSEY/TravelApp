import React from 'react'


const ImageSlider = () => {

    const images = [
        "/Images/MadhyaPradesh.jpg",
        "/Images/Maharashtra.jpg",
        "/Images/Uttarakhand.jpg",
        "/Images/Punjab.webp",
        "/Images/Himachal Pradesh.jpg",
        "/Images/Rajasthan.jpg",
        "/Images/Goa.jpg",
    ];

    return (
        <>
            <div className='w-full overflow-hidden bg-gray-100 relative bottom-39'>
                <div className='scroll-slider flex whitespace-nowrap scroll-animation'>
                    {[...images, ...images].map((img, index) => (
                        <img key={index} src={img} alt={`Slide ${index + 1}`} className="w-72 h-48 mx-2 rounded-lg shadow-lg object-cover" />
                    ))}
                </div>
            </div>
        </>
    )
}

export default ImageSlider