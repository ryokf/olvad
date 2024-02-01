
'use client';

import { Flowbite, Table, TextInput, Pagination } from 'flowbite-react';
import React, { useState } from 'react';
import CustomTheme from '../theme/CustomTheme';

function PaginationComp(data) {
    const [currentPage, setCurrentPage] = useState(data.current_page);
    const onPageChange = function (page) {
        window.location.replace(`?page=${page}`)
        // setCurrentPage()
    }

    return (
        <Flowbite theme={{ theme: CustomTheme }}>
            <div className="flex overflow-x-auto sm:justify-center mb-6">
                <Pagination currentPage={currentPage} totalPages={data.last_page} onPageChange={onPageChange} showIcons />
            </div>
        </Flowbite>
    );
}

export default function TableComp({ head, tableContent, IsSearchable, optionButton, isPageable, title, paginationData }) {
    return (
        <Flowbite theme={{ theme: CustomTheme }}>
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

