import React from "react";

'use client';

import { Avatar, Dropdown, Flowbite, Navbar } from 'flowbite-react';

export default function AdminHeaderComp({ title, photo, subtitle }) {
    return (
        <Flowbite theme={{ theme: customTheme }}>

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

const customTheme = {
    avatar: {
        "root": {
            "base": "flex justify-center items-center space-x-4 rounded",
            "bordered": "p-1 ring-2",
            "rounded": "rounded-full",
            "color": {
                "dark": "ring-gray-800 dark:ring-gray-800",
                "failure": "ring-red-500 dark:ring-red-700",
                "gray": "ring-gray-500 dark:ring-gray-400",
                "info": "ring-cyan-400 dark:ring-cyan-800",
                "light": "ring-gray-300 dark:ring-gray-500",
                "purple": "ring-purple-500 dark:ring-purple-600",
                "success": "ring-green-500 dark:ring-green-500",
                "warning": "ring-yellow-300 dark:ring-yellow-500",
                "pink": "ring-pink-500 dark:ring-pink-500"
            },
            "img": {
                "base": "rounded",
                "off": "relative overflow-hidden bg-gray-100 dark:bg-gray-600",
                "on": "",
                "placeholder": "absolute w-auto h-auto text-gray-400 -bottom-1"
            },
            "size": {
                "xs": "w-6 h-6",
                "sm": "w-8 h-8",
                "md": "w-16 h-16",
                "lg": "w-20 h-20",
                "xl": "w-36 h-36"
            },
            "stacked": "ring-2 ring-gray-300 dark:ring-gray-500",
            "statusPosition": {
                "bottom-left": "-bottom-1 -left-1",
                "bottom-center": "-bottom-1 center",
                "bottom-right": "-bottom-1 -right-1",
                "top-left": "-top-1 -left-1",
                "top-center": "-top-1 center",
                "top-right": "-top-1 -right-1",
                "center-right": "center -right-1",
                "center": "center center",
                "center-left": "center -left-1"
            },
            "status": {
                "away": "bg-yellow-400",
                "base": "absolute h-3.5 w-3.5 rounded-full border-2 border-white dark:border-gray-800",
                "busy": "bg-red-400",
                "offline": "bg-gray-400",
                "online": "bg-green-400"
            },
            "initials": {
                "text": "font-medium text-gray-600 dark:text-gray-300",
                "base": "inline-flex overflow-hidden relative justify-center items-center bg-gray-100 dark:bg-gray-600"
            }
        },
        "group": {
            "base": "flex -space-x-4"
        },
        "groupCounter": {
            "base": "relative flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 rounded-full ring-2 ring-gray-300 hover:bg-gray-600 dark:ring-gray-500"
        }
    },
    navbar: {
        "root": {
            "base": "bg-transparent px-2 py-2.5 dark:border-gray-700 dark:bg-gray-800 sm:px-4",
            "rounded": {
                "on": "rounded",
                "off": ""
            },
            "bordered": {
                "on": "border",
                "off": ""
            },
            "inner": {
                "base": "mx-auto flex flex-wrap items-center justify-between",
                "fluid": {
                    "on": "",
                    "off": "container"
                }
            }
        },
        "brand": {
            "base": ""
        },
        "collapse": {
            "base": "w-full md:block md:w-auto",
            "list": "mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium",
            "hidden": {
                "on": "hidden",
                "off": ""
            }
        },
        "link": {
            "base": "block py-2 pr-4 pl-3 md:p-0",
            "active": {
                "on": "bg-cyan-700 text-white dark:text-white md:bg-transparent md:text-cyan-700",
                "off": "border-b border-gray-100  text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-cyan-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
            },
            "disabled": {
                "on": "text-gray-400 hover:cursor-not-allowed dark:text-gray-600",
                "off": ""
            }
        },
        "toggle": {
            "base": "inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden",
            "icon": "h-6 w-6 shrink-0"
        }
    }
}
// https://flowbite.com/docs/images/people/profile-picture-5.jpg
