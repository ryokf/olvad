import React from "react";
import TableComp from "../../../Components/Table";
import {Table} from 'flowbite-react';
import DetailOutcome from "./DetailOutcome";
import DataOption from "./DataOption";

const OutcomeBuyData = (data) => {
    const searchParams = new URLSearchParams(window.location.search);
    // console.log(searchParams.has('page')); // price_descending

    console.log(searchParams.get('page'))

    return data.map((item, index) => (
        <Table.Row key={item.id} className="bg-white border-none dark:bg-gray-800">
            <Table.Cell>{++index + (!searchParams.has('page') ? 0 : 10 * (searchParams.get('page') - 1))}</Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {item.date}
            </Table.Cell>
            <Table.Cell>{item.description.slice(0, 50)}...</Table.Cell>
            <Table.Cell>{item.store}</Table.Cell>
            <Table.Cell>Rp{item.cost}</Table.Cell>
            <Table.Cell>
                <DetailOutcome title={"•••"} data={item} headerTitle={"Detail Pengeluaran"}></DetailOutcome>
            </Table.Cell>
        </Table.Row>
    ))
}

export default function OutcomeBuy({data, paginationData}) {
    return (
        <div className="">
            <TableComp title={"Data pengeluaran untuk pembelian"}
            head={["#", "tanggal", "deskripsi", "toko", "total", ""]}
            tableContent={OutcomeBuyData(data)}
            IsSearchable
            isPageable
            paginationData={paginationData}
            optionButton={DataOption()}
            />
        </div>
    )
}
