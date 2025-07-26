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
        "/Images/West Bengal.jpg",
    ];

    return (
        <>
            <div className='w-full overflow-hidden  relative bottom-39'>
                <div className='scroll-slider flex whitespace-nowrap scroll-animation'>
                    {[...images, ...images].map((img, index) => (
                        <div>                        
                            <img key={index} src={img} alt={`Slide ${index + 1}`} className="w-72 h-60 mx-2 rounded-lg shadow-lg object-cover cursor-pointer" />
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default ImageSlider