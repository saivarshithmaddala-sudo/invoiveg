import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import banner1 from '../assets/banner-1.jpg';
import banner2 from '../assets/banner-2.jpg';
import banner3 from '../assets/banner-3.jpg';

const images = [banner1, banner2, banner3];

const BannerCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 3000); // Auto-scroll every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="max-w-7xl mx-auto px-6 fade-in">
            <div className="relative overflow-hidden rounded-[38px] border border-white/25 bg-[linear-gradient(135deg,rgba(255,255,255,0.2),rgba(255,255,255,0.08))] p-4 shadow-[0_30px_80px_-42px_rgba(28,3,8,0.96)] backdrop-blur-2xl group">
                <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-white/22 to-transparent" />
                <div className="pointer-events-none absolute -right-10 top-8 z-10 h-40 w-40 rounded-full bg-white/14 blur-3xl" />
                
                <div className="relative overflow-hidden rounded-[30px] border border-white/30 bg-[rgba(255,248,248,0.72)] shadow-[0_24px_58px_-32px_rgba(27,2,7,0.95)]">
                    <div 
                        className="flex transition-transform duration-700 ease-in-out"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {images.map((img, index) => (
                            <div key={index} className="w-full flex-shrink-0">
                                <img
                                    src={img}
                                    alt={`Banner ${index + 1}`}
                                    className="w-full h-auto object-contain"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Left Arrow */}
                <button 
                    onClick={prevSlide}
                    className="absolute left-8 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/30 text-white backdrop-blur-md transition-all duration-300 hover:bg-white/80 hover:text-[#7E0E16] opacity-0 group-hover:opacity-100 shadow-md border border-white/20"
                >
                    <ChevronLeft size={24} />
                </button>

                {/* Right Arrow */}
                <button 
                    onClick={nextSlide}
                    className="absolute right-8 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/30 text-white backdrop-blur-md transition-all duration-300 hover:bg-white/80 hover:text-[#7E0E16] opacity-0 group-hover:opacity-100 shadow-md border border-white/20"
                >
                    <ChevronRight size={24} />
                </button>
                
                {/* Dots */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`h-2.5 rounded-full transition-all duration-300 ${currentIndex === index ? 'w-8 bg-[#7E0E16] shadow-sm' : 'w-2.5 bg-white/50 hover:bg-white/90'}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BannerCarousel;
