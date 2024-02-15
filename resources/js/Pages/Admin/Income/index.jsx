import React from "react";

import Admin from "../../../Templates/Admin";
import TableComp from "../../../Components/Table";
import { Table, Label, Select, Button, TextInput, Flowbite } from 'flowbite-react';
import { MdDelete } from "react-icons/md";
import { useForm, Link } from '@inertiajs/react'
import DeleteConfirm from "../../../Components/DeleteConfirm";
import DetailIncome from "./DetailIncome";

const IncomeData = (dataGet) => {
    const searchParams = new URLSearchParams(window.location.search);
    // console.log(searchParams.has('page')); // price_descending

    return dataGet.map((item, index) => (
        <Table.Row key={item.id} className="bg-white border-none dark:bg-gray-800">
            <Table.Cell>{++index + (!searchParams.has('page') ? 0 : 10 * (searchParams.get('page') - 1))}</Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {item.date}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap text-gray-600 dark:text-white">
                {item.description.slice(0, 50)}
                {
                    item.description.length > 50 && (
                        <span>...</span>
                    )
                }
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap text-gray-600 dark:text-white">
                {item.customer.name}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap text-gray-600 dark:text-white">
                {item.total}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white flex gap-4">
                {/* <Link href="/admin/ingredient" method="delete" data={{ id: item.id }}>
                    <Button size={'sm'} color="warning" className="bg-amber-400 hover:bg-red-600 text-white text-xl"><FaEdit /></Button>
                </Link> */}
                {/* <Edit dataStore={item}></Edit> */}
                <DetailIncome title={"•••"} data={item} headerTitle={"Detail Pemasukan"}></DetailIncome>
                <DeleteConfirm id={item.id} href={"/admin/income"}></DeleteConfirm>
            </Table.Cell>
        </Table.Row>
    ))
}

export default function Index({ incomes }) {
    console.log(incomes)
    return (
        <div className="">
            <Admin title="Pemasukan" >
                <div className="">
                    <TableComp head={["#", "tanggal", "deskripsi", "pelanggan", "total", ""]} tableContent={IncomeData(incomes.data)} isPageable IsSearchable paginationData={incomes.meta}></TableComp>
                </div>
            </Admin>
        </div>
    )
}

