import React from "react";

import Admin from "../../../Templates/Admin";
import TableComp from "../../../Components/Table";
import { Table, Label, Select, Button, TextInput, Flowbite } from 'flowbite-react';
import { MdDelete } from "react-icons/md";
import { useForm, Link } from '@inertiajs/react'
import DeleteConfirm from "../../../Components/DeleteConfirm";
import Edit from "./Edit";
import { usePage } from '@inertiajs/react'

const CustomerData = (dataGet) => {
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
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white flex gap-4">
                {/* <Link href="/admin/ingredient" method="delete" data={{ id: item.id }}>
                    <Button size={'sm'} color="warning" className="bg-amber-400 hover:bg-red-600 text-white text-xl"><FaEdit /></Button>
                </Link> */}
                <Edit dataCustomer={item}></Edit>
                <DeleteConfirm id={item.id} href={"/admin/customer"}></DeleteConfirm>
            </Table.Cell>
        </Table.Row>
    ))
}
export default function Index({ customers, success }) {

    const { flash } = usePage().props
    console.log(flash)

    const { data, setData, post, errors } = useForm({
        name: '',
        address: '',
    })

    function submit(e) {
        e.preventDefault()
        post('/admin/customer')
        setData('name', '')
        setData('address', '')
    }

    return (
        <Admin title="Daftar Pelanggan" bannerMessage={flash}>
            <div className="rounded-lg overflow-hidden shadow ml-4">
                <TableComp head={["#", "Nama", "alamat", ""]} tableContent={CustomerData(customers.data)} isPageable={true} paginationData={customers} IsSearchable></TableComp>
            </div>
            <div className="mt-6 p-4 bg-white rounded-lg shadow">
                <h1 className="text-xl font-bold mb-2">tambah daftar pelanggan</h1>
                <form onSubmit={submit} className="grid grid-cols-2 gap-2">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email1" value="Nama toko" />
                        </div>
                        <TextInput id="email1" type="text" placeholder="" value={data.name} onChange={e => setData('name', e.target.value)} required />
                        {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email1" value="alamat" />
                        </div>
                        <TextInput id="email1" type="text" placeholder="" value={data.address} onChange={e => setData('address', e.target.value)} required />
                        {errors.address && <div className="text-red-500 text-sm">{errors.address}</div>}
                    </div>
                    <div className="w-full flex justify-end mt-4 col-span-4">
                        <Button color="primary" type="submit" size={'sm'}>Simpan</Button>
                    </div>
                </form>
            </div>
        </Admin>
    )
}
