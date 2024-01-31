
'use client';

import { Flowbite, Table, Dropdown } from 'flowbite-react';
import { Label, TextInput } from 'flowbite-react';
import React from 'react';

'use client';

import { Pagination } from 'flowbite-react';
import { useState } from 'react';

function pagination() {
    const [currentPage, setCurrentPage] = useState(1);

    const onPageChange = (page) => setCurrentPage(page);

    return (
        <div className="flex overflow-x-auto sm:justify-center mb-6">
            <Pagination currentPage={currentPage} totalPages={100} onPageChange={onPageChange} showIcons />
        </div>
    );
}

export default function TableComp({ head, tableContent, IsSearchable, optionButton, isPageable }) {
    return (
        <Flowbite theme={{ theme: customTheme }}>
            <div className="overflow-x-auto bg-white shadow-sm">
                <div className="m-4 flex justify-between">
                    <h1 className="text-xl font-medium">Data pengeluaran untuk pembelian</h1>
                    <div className="flex gap-2">
                        {optionButton}
                        {IsSearchable ? <div className="">
                            <TextInput id="email4" type="text" placeholder="cari..." required />
                        </div> : <></>}
                    </div>

                </div>
                <Table hoverable>
                    <Table.Head>
                        {head.map((item, index) => (
                            <Table.HeadCell key={item}>{item}</Table.HeadCell>
                        ))}
                        {/* <Table.HeadCell>Product name</Table.HeadCell> */}
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {tableContent}
                    </Table.Body>
                </Table>
                {isPageable ? pagination() : <></>}
            </div>
        </Flowbite>
    );
}

const customTheme = {
    table: {
        "root": {
            "base": "w-full text-left text-sm text-gray-500 dark:text-gray-400",
            "shadow": "absolute bg-white dark:bg-black w-full h-full top-0 left-0 rounded-lg drop-shadow-md -z-10",
            "wrapper": "relative"
        },
        "body": {
            "base": "group/body",
            "cell": {
                "base": "group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg px-6 py-4"
            }
        },
        "head": {
            "base": "group/head text-xs uppercase text-gray-700 dark:text-gray-400",
            "cell": {
                "base": "group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg border-y dark:bg-gray-700 px-6 py-3"
            }
        },
        "row": {
            "base": "group/row",
            "hovered": "hover:bg-gray-50 dark:hover:bg-gray-600",
            "striped": "odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700"
        }
    }
}
