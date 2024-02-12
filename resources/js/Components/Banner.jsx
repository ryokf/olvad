import { Banner } from 'flowbite-react';
import { HiX } from 'react-icons/hi';
import { MdAnnouncement } from 'react-icons/md';
import React from 'react';

export default function BannerComp({message}) {
    return (
        <Banner>
            <div className="flex w-full justify-between border-y p-2 border-gray-200 bg-primary-light dark:border-gray-600 dark:bg-gray-700">
                <div className="mx-auto flex items-center">
                    <p className="flex items-center font-semibold text-lg text-white dark:text-gray-400">
                        {message}
                    </p>
                </div>
                <Banner.CollapseButton color="gray" className="border-0 bg-transparent text-white dark:text-gray-400">
                    <HiX className="h-4 w-4" />
                </Banner.CollapseButton>
            </div>
        </Banner>
    );
}
