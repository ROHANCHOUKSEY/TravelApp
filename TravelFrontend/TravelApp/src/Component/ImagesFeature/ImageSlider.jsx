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
            <div className='w-full overflow-hidden  relative '>
                <div className='scroll-slider flex gap-10 whitespace-nowrap scroll-animation mt-5'>
                    {[...images, ...images].map((image, index) => (
                        <div className='flex flex-col text-center h-[267px]'>
                            <img key={index} src={image.img} alt={`Slide ${index + 1}`} className="w-50 h-60 mx-2 rounded-lg shadow-lg object-cover cursor-pointer transition-transform duration-300 ease-in-out transform hover:-translate-y-2 shadow-md hover:shadow-xl  bg-white rounded-lg" />
                            <div className='relative top-2'>
                                <p className='font-medium uppercase tracking-widest text-black'>{image.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default ImageSlider