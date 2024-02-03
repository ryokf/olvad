import React from "react";
import { Dropdown } from 'flowbite-react';
import { Link } from '@inertiajs/react'

export default function DataOption() {
    // console.log(window.location.href)
    return (
        <>
            <Dropdown label="Urutkan" color="light" dismissOnClick={false}>
                <Link href={window.location.href} method="get" data={{ sort: "desc" }}>
                    <Dropdown.Item>Terbaru</Dropdown.Item>
                </Link>
                <Link href={window.location.href} method="get" data={{ sort: "asc" }}>
                    <Dropdown.Item>Terlama</Dropdown.Item>
                </Link>
                <Link href={window.location.href} method="get" data={{ sort: "least" }}>
                    <Dropdown.Item>biaya paling sedikit</Dropdown.Item>
                </Link>
                <Link href={window.location.href} method="get" data={{ sort: "most" }}>
                    <Dropdown.Item>biaya paling banyak</Dropdown.Item>
                </Link>
            </Dropdown>
            <Dropdown label="Tahun" color="light" dismissOnClick={false}>
            <Link href={window.location.href} method="get" data={{ year: "2024" }}>
                    <Dropdown.Item>2024</Dropdown.Item>
                </Link>
                <Link href={window.location.href} method="get" data={{ year: "2023" }}>
                    <Dropdown.Item>2023</Dropdown.Item>
                </Link>
                <Link href={window.location.href} method="get" data={{ year: "2022" }}>
                    <Dropdown.Item>2022</Dropdown.Item>
                </Link>
            </Dropdown>
        </>
    );
}
