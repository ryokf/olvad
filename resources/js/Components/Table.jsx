
'use client';

import { Flowbite, Table, Dropdown } from 'flowbite-react';
import { Label, TextInput } from 'flowbite-react';
import React from 'react';
import { Pagination } from 'flowbite-react';
import { useState } from 'react';

function PaginationComp(data) {
    const [currentPage, setCurrentPage] = useState(data.current_page);
    const onPageChange = function (page) {
        window.location.replace(`?page=${page}`)
        setCurrentPage(page);
    }

    return (
        <div className="flex overflow-x-auto sm:justify-center mb-6">
            <Pagination currentPage={currentPage} totalPages={data.last_page} onPageChange={onPageChange} showIcons />
        </div>
    );
}

export default function TableComp({ head, tableContent, IsSearchable, optionButton, isPageable, title, paginationData }) {
    return (
        <Flowbite theme={{ theme: customTheme }}>
            <div className="overflow-x-auto bg-white shadow-sm">
                <div className="m-4 flex justify-between">
                    <h1 className="text-xl font-medium">{title}</h1>
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
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {tableContent}
                    </Table.Body>
                </Table>
                {isPageable ? PaginationComp(paginationData) : <></>}
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
