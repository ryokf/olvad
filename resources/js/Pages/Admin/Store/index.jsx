import React from "react";
import Admin from "../../../Templates/Admin";
import TableComp from "../../../Components/Table";
import { Table, Label, Select, Button, TextInput, Flowbite } from 'flowbite-react';
import { MdDelete } from "react-icons/md";
import { useForm, Link } from '@inertiajs/react'
import { FaEdit } from "react-icons/fa";

const StoreData = (dataGet) => {
    const searchParams = new URLSearchParams(window.location.search);
    // console.log(searchParams.has('page')); // price_descending

    return dataGet.map((item, index) => (
        <Table.Row key={item.id} className="bg-white border-none dark:bg-gray-800">
            <Table.Cell>{++index + (!searchParams.has('page') ? 0 : 10 * (searchParams.get('page') - 1))}</Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {item.name}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap text-gray-600 dark:text-white">
                {item.address}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap text-gray-600 dark:text-white">
                {item.phone}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap text-gray-600 dark:text-white">
                {item.pic_name}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white flex gap-4">
                <Link href="/admin/ingredient" method="delete" data={{ id: item.id }}>
                    <Button size={'sm'} color="warning" className="bg-amber-400 hover:bg-red-600 text-white text-xl"><FaEdit /></Button>
                </Link>
                <Link href="/admin/ingredient" method="delete" data={{ id: item.id }}>
                    <Button size={'sm'} color="failure" className="bg-red-500 hover:bg-red-600 text-white text-xl"><MdDelete /></Button>
                </Link>
            </Table.Cell>
        </Table.Row>
    ))
}

const Index = ({ stores }) => {
    console.log(stores)
    return (
        <div className="">
            <Admin title="Daftar Toko">
                <div className="rounded-lg overflow-hidden shadow">
                    <TableComp head={["#", "Toko", "alamat","no.telp" , "PIC", ""]} tableContent={StoreData(stores.data)} isPageable={true} paginationData={stores}></TableComp>
                </div>
            </Admin>
        </div>
    )
}

export default Index
