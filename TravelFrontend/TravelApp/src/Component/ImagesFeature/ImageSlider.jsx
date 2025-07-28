import React from 'react'


const ImageSlider = () => {

    const images = [
        {
            img: "/Images/MadhyaPradesh.jpg",
            name: "Madhya Pradesh",
        },
        {
            img: "/Images/Maharashtra.jpg",
            name: "Maharashtra",
        },
        {
            img: "/Images/Uttarakhand.jpg",
            name: "Uttarakhand",
        },
        {
            img: "/Images/Punjab.webp",
            name: "Punjab",
        },
        {
            img: "/Images/Himachal Pradesh.jpg",
            name: "Himachal Pradesh",
        },
        {
            img: "/Images/Rajasthan.jpg",
            name: "Rajasthan",
        },
        {
            img: "/Images/Goa.jpg",
            name: "Goa",
        },
        {
            img: "/Images/West Bengal.jpg",
            name: "West Bengal",
        },
        // "/Images/Maharashtra.jpg",
        // "/Images/Uttarakhand.jpg",
        // "/Images/Punjab.webp",
        // "/Images/Himachal Pradesh.jpg",
        // "/Images/Rajasthan.jpg",
        // "/Images/Goa.jpg",
        // "/Images/West Bengal.jpg",
    ];

    return (
        <>
            <div className='w-full overflow-hidden  relative bottom-39'>
                <div className='scroll-slider flex gap-2.5 whitespace-nowrap scroll-animation'>
                    {[...images, ...images].map((image, index) => (
                        <div>
                            <img key={index} src={image.img} alt={`Slide ${index + 1}`} className="w-72 h-60 mx-2 rounded-lg shadow-lg object-cover cursor-pointer transition delay-250 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110" />
                            <p>{image.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default ImageSlider