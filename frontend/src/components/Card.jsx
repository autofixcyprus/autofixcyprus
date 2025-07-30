import { useState } from "react";
import { useSelector } from "react-redux";

function Card({image, title, description}){
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    const language = useSelector(state => state.language);

    // Adjust the threshold value to control the tilt effect
    const threshold = 12;

    const handleMove = (e) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        setTilt({ x: y * -threshold, y: x * threshold });
    };

    return (
        <div className="rounded-xl shadow-blue-100 shadow-xl overflow-hidden transition-transform duration-200 ease-out cursor-pointer bg-white relative"
            onMouseMove={handleMove}
            onMouseLeave={() => setTilt({ x: 0, y: 0 })}
            style={{ transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
        >
            <img src={image}
                alt="City skyline" loading="lazy" className="w-full h-48 sm:h-64 object-cover"
            />
            <span className="bg-red-500 text-white rounded px-3 py-1 absolute top-2 left-2 text-sm">
                {language === 'en' ? 'Before' : 'Πριν'}
            </span>
            <span className="bg-green-600 text-white rounded px-3 py-1 absolute top-2 right-2 text-sm">
                {language === 'en' ? 'After' : 'Μετά'}
            </span>
            <h3 className="mt-3 px-4 pt-3 mb-1 text-lg font-semibold text-gray-800">
                {title}
            </h3>
            <p className="text-sm px-4 pb-6 text-gray-600 w-5/6">
                {description}
            </p>
        </div>

    );
};

export default Card;