// 'use client';

import React from "react";
import { Flowbite, Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from 'react-icons/hi';
import { FaChartBar, FaStore  } from "react-icons/fa";
import { RiCake3Fill } from "react-icons/ri";
import { BsBoxArrowUpRight, BsBoxArrowInDownLeft } from "react-icons/bs";
import { GiFlour } from "react-icons/gi";
import { FaPeopleGroup } from "react-icons/fa6";

const AdminSidebarComp = () => {
    const route = [
        { name: "Dashboard", href: "/admin", icon: FaChartBar },
        { name: "Product", href: "/admin/product", icon: RiCake3Fill },
        { name: "Outcome", href: "/admin/outcome", icon: BsBoxArrowUpRight },
        { name: "Income", href: "/admin/income", icon: BsBoxArrowInDownLeft },
        { name: "Ingredient", href: "/admin/ingredient", icon: GiFlour },
        { name: "Store", href: "/admin/store", icon: FaStore },
        { name: "Customer", href: "/admin/customer", icon: FaPeopleGroup },
    ];

    console.log(window.location.pathname)

    return (
        <Flowbite theme={{ theme: customTheme }}>
            <Sidebar aria-label="Sidebar with logo branding example" className="fixed">
                <Sidebar.Logo href="#" img="/assets/logo.png" imgAlt="Flowbite logo">
                    <h1 className="text-4xl font-light">
                        OLVAD
                        </h1>
                </Sidebar.Logo>
                <hr className="my-3 w-11/12 m-auto"/>
                <Sidebar.Items>
                    <Sidebar.ItemGroup>
                        {route.map((item, index) => (
                            <Sidebar.Item
                                key={item.href}
                                href={item.href}
                                icon={item.icon}
                                {...(window.location.pathname === item.href ? { active: true } : {})}
                            >
                                {item.name}
                            </Sidebar.Item>
                        ))}
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>
        </Flowbite>
    );
}

export default AdminSidebarComp

const customTheme = {
    sidebar: {
        "root": {
            "base": "h-screen",
            "collapsed": {
                "on": "w-16",
                "off": "w-72"
            },
            "inner": "h-full overflow-y-auto overflow-x-hidden rounded bg-white py-4 px-3 dark:bg-gray-800"
        },
        "collapse": {
            "button": "group flex w-full items-center rounded-lg p-2 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",
            "icon": {
                "base": "h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",
                "open": {
                    "off": "",
                    "on": "text-gray-900"
                }
            },
            "label": {
                "base": "ml-3 flex-1 whitespace-nowrap text-left",
                "icon": {
                    "base": "h-6 w-6 transition ease-in-out delay-0",
                    "open": {
                        "on": "rotate-180",
                        "off": ""
                    }
                }
            },
            "list": "space-y-2 py-2"
        },
        "cta": {
            "base": "mt-6 rounded-lg p-4 bg-gray-100 dark:bg-gray-700",
            "color": {
                "blue": "bg-cyan-50 dark:bg-cyan-900",
                "dark": "bg-dark-50 dark:bg-dark-900",
                "failure": "bg-red-50 dark:bg-red-900",
                "gray": "bg-alternative-50 dark:bg-alternative-900",
                "green": "bg-green-50 dark:bg-green-900",
                "light": "bg-light-50 dark:bg-light-900",
                "red": "bg-red-50 dark:bg-red-900",
                "purple": "bg-purple-50 dark:bg-purple-900",
                "success": "bg-green-50 dark:bg-green-900",
                "yellow": "bg-yellow-50 dark:bg-yellow-900",
                "warning": "bg-yellow-50 dark:bg-yellow-900"
            }
        },
        "item": {
            "base": "flex items-center justify-center rounded-lg p-2 text-xl text-gray-400 font-normal hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",
            "active": "bg-emerald-400/75 text-white hover:bg-emerald-400 dark:bg-gray-700",
            "collapsed": {
                "insideCollapse": "group w-full pl-8 transition duration-75",
                "noIcon": "font-bold"
            },
            "content": {
                "base": "px-3 flex-1 whitespace-nowrap"
            },
            "icon": {
                "base": "h-6 w-6 flex-shrink-0 text-gray-400 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",
                "active": "text-white dark:text-gray-100"
            },
            "label": "",
            "listItem": ""
        },
        "items": {
            "base": ""
        },
        "itemGroup": {
            "base": "mt-4 space-y-2 border-t border-gray-200 pt-4 first:mt-0 first:border-t-0 first:pt-0 dark:border-gray-700"
        },
        "logo": {
            "base": "mb-5 flex items-center pl-2.5",
            "collapsed": {
                "on": "hidden",
                "off": "self-center whitespace-nowrap text-xl font-semibold dark:text-white"
            },
            "img": "mr-3 h-6 sm:h-7 lg:h-12"
        }
    }
}
