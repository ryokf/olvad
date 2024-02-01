import React from "react";
'use client';

import { Dropdown } from 'flowbite-react';

export default function DataOption() {
    return (
        <>
            <Dropdown label="Urutkan" color="light" dismissOnClick={false}>
                <Dropdown.Item>Terbaru</Dropdown.Item>
                <Dropdown.Item>Terlama</Dropdown.Item>
                <Dropdown.Item>Biaya paling sedikit</Dropdown.Item>
                <Dropdown.Item>Biaya paling banyak</Dropdown.Item>
            </Dropdown>
            <Dropdown label="Tahun" color="light" dismissOnClick={false}>
                <Dropdown.Item>2024</Dropdown.Item>
                <Dropdown.Item>2023</Dropdown.Item>
                <Dropdown.Item>2022</Dropdown.Item>
            </Dropdown>
        </>
    );
}
