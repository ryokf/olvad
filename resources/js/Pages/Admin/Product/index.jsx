import React from "react";

import Admin from "../../../Templates/Admin";
import TableComp from "../../../Components/Table";
import { Table, Label, Select, Button, TextInput, Flowbite } from 'flowbite-react';
import { MdDelete } from "react-icons/md";
import { useForm, Link } from '@inertiajs/react'
import DeleteConfirm from "../../../Components/DeleteConfirm";
import { usePage } from '@inertiajs/react'
import DetailProduct from "./DetailProduct";

const ProductData = (dataGet) => {
    const searchParams = new URLSearchParams(window.location.search);

    return dataGet.map((item, index) => (
        <Table.Row key={item.id} className="bg-white border-none dark:bg-gray-800">
            <Table.Cell>{++index + (!searchParams.has('page') ? 0 : 10 * (searchParams.get('page') - 1))}</Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {item.name}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap text-gray-600 dark:text-white">
                {item.category}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap text-gray-600 dark:text-white">
            {item.description.slice(0, 50)}{
                item.description.length > 50 && (
                    <span>...</span>
                )
            }
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white flex gap-4">
                {/* <Link href="/admin/ingredient" method="delete" data={{ id: item.id }}>
                    <Button size={'sm'} color="warning" className="bg-amber-400 hover:bg-red-600 text-white text-xl"><FaEdit /></Button>
                </Link> */}
                {/* <Edit dataStore={item}></Edit> */}
                <DetailProduct title="•••" headerTitle="Detail produk" data={item}></DetailProduct>
                <DeleteConfirm id={item.id} href={"/admin/product"}></DeleteConfirm>
            </Table.Cell>
        </Table.Row>
    ))
}

export default function Product({ products }) {
    return (
        <div className="">
            <Admin title="Produk" >
                <div className="">
                    <TableComp isPageable={true} paginationData={products.meta} IsSearchable head={["#", "nama", "kategori", "deskripsi"," "]} tableContent={ProductData(products.data)}></TableComp>
                </div>
            </Admin>
        </div>
    )
}
