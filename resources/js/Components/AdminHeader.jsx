'use client';
import React from "react";
import { Avatar, Dropdown, Flowbite, Navbar } from 'flowbite-react';
import CustomTheme from "../theme/CustomTheme";

export default function AdminHeaderComp({ title, photo, subtitle }) {
    return (
        <Flowbite theme={{ theme: CustomTheme }}>

            <Navbar fluid rounded className="">
                <Navbar.Brand href="https://flowbite-react.com">
                    {/* <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" /> */}
                    <div className="self-center whitespace-nowrap text-3xl font-semibold dark:text-white">{title}</div>
                    <div className="text-gray-500 mt-1 self-center whitespace-nowrap dark:text-white">{subtitle}</div>
                </Navbar.Brand>
                <div className="flex md:order-2">
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar alt="User settings" img={photo} size="md" placeholderInitials="RY" rounded />
                        }
                    >
                        <Dropdown.Header>
                            <span className="block text-sm">Bonnie Green</span>
                            <span className="block truncate text-sm font-medium">name@flowbite.com</span>
                        </Dropdown.Header>
                        <Dropdown.Item>Dashboard</Dropdown.Item>
                        <Dropdown.Item>Settings</Dropdown.Item>
                        <Dropdown.Item>Earnings</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item>Sign out</Dropdown.Item>
                    </Dropdown>
                    <Navbar.Toggle />
                </div>
            </Navbar>
        </Flowbite>
    );
}
