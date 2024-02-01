'use client';

import React from "react";
import { Flowbite, Sidebar } from 'flowbite-react';
import { FaChartBar, FaStore  } from "react-icons/fa";
import { RiCake3Fill } from "react-icons/ri";
import { BsBoxArrowUpRight, BsBoxArrowInDownLeft } from "react-icons/bs";
import { GiFlour } from "react-icons/gi";
import { FaPeopleGroup } from "react-icons/fa6";
import CustomTheme from "../theme/CustomTheme";

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

    return (
        <Flowbite theme={{ theme: CustomTheme }}>
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
                                key={index}
                                href={item.href}
                                icon={item.icon}
                                {...(window.location.pathname.split("/")[2] == item.name.toLowerCase() ? { active: true } : {})}
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
