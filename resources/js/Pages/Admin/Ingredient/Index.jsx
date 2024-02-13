import React from "react";
import Admin from "../../../Templates/Admin";
import TableComp from "../../../Components/Table";
import { Table, Label, Select, Button, TextInput, Flowbite } from 'flowbite-react';
import { MdDelete } from "react-icons/md";
import { useForm, Link } from '@inertiajs/react'
import DeleteConfirm from "../../../Components/DeleteConfirm";
import { usePage } from '@inertiajs/react'

const IngredientData = (dataGet) => {
    const searchParams = new URLSearchParams(window.location.search);
    // console.log(searchParams.has('page')); // price_descending

    return dataGet.map((item, index) => (
        <Table.Row key={item.id} className="bg-white border-none dark:bg-gray-800">
            <Table.Cell>{++index + (!searchParams.has('page') ? 0 : 10 * (searchParams.get('page') - 1))}</Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {item.name}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white flex gap-4">
                {/* <Link href="/admin/ingredient" method="delete" data={{ id: item.id }}>
                    <Button size={'sm'} color="failure" className="bg-red-500 hover:bg-red-600 text-white text-xl"><MdDelete /></Button>
                </Link> */}
                <DeleteConfirm id={item.id} href={"/admin/ingredient"}></DeleteConfirm>
            </Table.Cell>
        </Table.Row>
    ))
}
export default function Index({ ingredients }) {
    const { flash } = usePage().props

    const { data, setData, post, errors } = useForm({
        name: '',
    })

    function submit(e) {
        e.preventDefault()
        post('/admin/ingredient')
        setData('name', '')
    }

    return (
        <div>
            <Admin title="Daftar Bahan" bannerMessage={flash}>
                <div className="flex gap-8">
                    <div className="w-1/2 rounded-lg overflow-hidden shadow">
                        <TableComp
                            IsSearchable
                            paginationData={ingredients}
                            isPageable
                            head={["#", "Bahan", ""]}
                            tableContent={IngredientData(ingredients.data)}
                        />
                    </div>
                    <div className="w-1/3 p-4 h-modal bg-white rounded-lg shadow">
                        <h1 className=" text-xl font-bold mb-2">tambah daftar bahan</h1>
                        <form onSubmit={submit} className="">
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="email1" value="Nama bahan" />
                                </div>
                                <TextInput id="email1" type="text" placeholder="Masukkan bahan" value={data.name} onChange={e => setData('name', e.target.value)} required />
                                {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
                            </div>
                            <div className="w-full flex justify-end mt-4">
                                <Button color="primary" type="submit" size={'sm'}>Simpan</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </Admin>
        </div>
    );
}
