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
    ];

    return (
        <>
            <div className='w-full overflow-hidden  relative '>
                <div className='scroll-slider flex gap-4 md:gap-10 whitespace-nowrap scroll-animation mt-5 '>
                    {[...images, ...images].map((image, index) => (
                        <div className='flex flex-col text-center h-[267px]' key={index}>
                            <img key={index} src={image.img} alt={`Slide ${index + 1}`} className="w-50 h-38  md:w-50 md:h-60 mx-2 rounded-lg shadow-lg object-cover cursor-pointer transition-transform duration-300 ease-in-out transform hover:-translate-y-2 shadow-md hover:shadow-xl  bg-white rounded-lg" />
                            <div className='relative top-2'>
                                <p className='text-sm md:text-base md:font-medium uppercase tracking-widest text-black dark:text-white'>{image.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default ImageSlider