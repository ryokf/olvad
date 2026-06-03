"use client";

import { useState, useEffect } from 'react';
import { Category } from '@olvad/types';

interface CategoryFilterProps {
    categories: Category[];
    activeCategory: number | null;
    onCategoryChange: (categoryId: number | null) => void;
}

const getCategoryIcon = (name: string) => {
    const lowercase = name.toLowerCase();
    if (lowercase.includes("kopi") || lowercase.includes("coffee") || lowercase.includes("minum") || lowercase.includes("drink")) return "☕";
    if (lowercase.includes("roti") || lowercase.includes("bakery") || lowercase.includes("croissant") || lowercase.includes("bread")) return "🍞";
    if (lowercase.includes("kue") || lowercase.includes("cake") || lowercase.includes("dessert")) return "🍰";
    if (lowercase.includes("makan") || lowercase.includes("food") || lowercase.includes("nasi") || lowercase.includes("rice")) return "🍛";
    return "🏷️";
};

export default function CategoryFilter({
    categories,
    activeCategory,
    onCategoryChange,
}: CategoryFilterProps) {
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div
            className={`${isSticky
                ? 'fixed top-0 left-0 right-0 z-40 shadow-lg bg-white/95 backdrop-blur-md'
                : 'relative bg-white'
                } transition-all duration-300`}
        >
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
                    {/* All Categories Button */}
                    <button
                        onClick={() => onCategoryChange(null)}
                        className={`flex-shrink-0 px-6 py-3 rounded-full font-semibold transition-all duration-200 snap-center ${activeCategory === null
                            ? 'text-white shadow-lg scale-105'
                            : 'bg-gray-100 text-secondary hover:bg-gray-200'
                            }`}
                        style={
                            activeCategory === null
                                ? { backgroundColor: '#ABC4AA' }
                                : undefined
                        }
                    >
                        <span className="text-xl mr-2">🎯</span>
                        Semua Menu
                    </button>

                    {/* Category Buttons */}
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => {
                                onCategoryChange(category.id);
                                // Scroll to category section
                                const element = document.getElementById(
                                    `category-${category.id}`
                                );
                                if (element) {
                                    const offset = 120;
                                    const elementPosition =
                                        element.getBoundingClientRect().top + window.pageYOffset;
                                    window.scrollTo({
                                        top: elementPosition - offset,
                                        behavior: 'smooth',
                                    });
                                }
                            }}
                            className={`flex-shrink-0 px-6 py-3 rounded-full font-semibold transition-all duration-200 snap-center ${activeCategory === category.id
                                ? 'text-white shadow-lg scale-105'
                                : 'bg-gray-100 text-secondary hover:bg-gray-200'
                                }`}
                            style={
                                activeCategory === category.id
                                    ? { backgroundColor: '#ABC4AA' }
                                    : undefined
                            }
                        >
                            <span className="text-xl mr-2">{getCategoryIcon(category.name)}</span>
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
