import React from "react";
import TableComp from "../../../Components/Table";
import {Table} from 'flowbite-react';
import DetailOutcome from "./DetailOutcome";
import DataOption from "./DataOption";

const OutcomeSocialData = (data) => {
    // console.log(data)

    return data.map((item, index) => (
        <Table.Row key={item.id} className="bg-white border-none dark:bg-gray-800">
            <Table.Cell>{++index + (window.location.search == "" ? 0 : 10 * (window.location.search.split("=")[1] - 1))}</Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {item.date}
            </Table.Cell>
            <Table.Cell>{item.description.slice(0, 50)}...</Table.Cell>
            <Table.Cell>{item.customer}</Table.Cell>
            <Table.Cell>Rp{item.cost}</Table.Cell>
            <Table.Cell>
                <DetailOutcome title={"detail"} data={item} headerTitle={"Detail Pengeluaran"}></DetailOutcome>
            </Table.Cell>
        </Table.Row>
    ))
}

export default function OutcomeSocial({data, paginationData}) {
    return (
        <div className="">
            <TableComp
            title={"Data pengeluaran untuk sosial"}
            head={["#", "tanggal", "deskripsi", "penerima", "total", ""]}
            tableContent={OutcomeSocialData(data)}
            IsSearchable
            isPageable
            paginationData={paginationData}
            optionButton={DataOption()}
            />
        </div>
    )
}
