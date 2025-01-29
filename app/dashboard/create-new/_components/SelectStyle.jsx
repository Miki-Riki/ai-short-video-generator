import React, { useState } from 'react'
import Image from 'next/image'

function SelectStyle({ onUserSelect }) {
    const styleOptions = [
        {
            name: 'Realistic',
            image: '/realistic.png'

        },
        {
            name: 'Cartoon',
            image: '/cartoon.png'

        },
        {
            name: 'Abstract',
            image: '/abstract.png'

        },
        {
            name: 'Futuristic',
            image: '/futuristic.png'

        },
        {
            name: 'RPG',
            image: '/rpg.png'
        },
        {
            name: 'Cinematic',
            image: '/cinematic.png'
        },
    ]

    const [selectedOption, setSelectedOption] = useState();
    return (

        <div className="mt-7">
            <h2 className="font-bold text-xl text-primary">Style</h2>
            <p className="text-gray-500">Select your video style</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5 mt-3">
                {styleOptions.map((item, index) => (
                    <div
                        key={index} // Add the key prop for each item
                        className={`relative hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer rounded-xl ${selectedOption === item.name ? 'border-4 border-primary' : ''}`}
                    >
                        {/* Image */}
                        <Image
                            src={item.image}
                            width={300}
                            height={300}
                            className="object-cover rounded-lg w-full h-auto"
                            alt={item.name}
                            onClick={() => {
                                setSelectedOption(item.name)
                                onUserSelect('imageStyle', item.name)
                            }}
                        />

                        {/* Title */}
                        <h2 className="absolute bottom-0 left-0 w-full bg-black/70 text-white text-center py-2 text-sm rounded-b-lg">
                            {item.name}
                        </h2>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default SelectStyle
