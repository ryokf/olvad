import { Button, Modal } from 'flowbite-react';
import React, { useState } from 'react';
import { FaEdit } from "react-icons/fa";
import { useForm, Link } from '@inertiajs/react'
import { Table, Label, Select, TextInput, Flowbite, Textarea } from 'flowbite-react';
import TableComp from '../../../Components/Table';
import { FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { HiOutlineExclamationCircle } from 'react-icons/hi';

function DeleteConfirm({ id, type, href }) {
    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <Button className="bg-red-500 aspect-square" size={'xs'} color="failure" onClick={() => setOpenModal(true)}><MdDelete /></Button>
            <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Anda yakin ingin menghapus data ini?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Link href={href} method="delete" data={{ id: id, type: type }}>
                                <Button className="bg-red-500" color="failure" onClick={() => setOpenModal(false)}>
                                    yakin
                                </Button>
                            </Link>
                            <Button color="gray" onClick={() => setOpenModal(false)}>
                                batal
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

function VariantData(dataGet) {
    console.log(dataGet)
    return dataGet.map((item, index) => (
        <Table.Row key={item.id} className="bg-white border-none dark:bg-gray-800">
            <Table.Cell>{++index}</Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {item.flavor != null ? item.flavor : item.size}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap text-gray-600 dark:text-white">
                {item.price}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white flex gap-4">
                <DeleteConfirm type={item.flavor == null ? 'size' : 'flavor'} id={item.id} href={"/admin/product_variant"}></DeleteConfirm>
            </Table.Cell>
        </Table.Row>
    ))
}

export default function Edit({ dataProduct, categories }) {
    const [openModal, setOpenModal] = useState(false);

    const { data, setData, put, errors } = useForm({
        id: dataProduct.id,
        name: dataProduct.name,
        category_id: dataProduct.category_id,
        description: dataProduct.description,
        image: dataProduct.image,
        type: dataProduct.size != null ? 'size' : 'flavor',
        variant_products: dataProduct.size != null ? dataProduct.size : dataProduct.flavor,
    })

    const [variant, setVariant] = useState('');
    const [price, setPrice] = useState(0);

    function submit(e) {
        e.preventDefault()
        setOpenModal(false)
        put('/admin/product')
        // location.reload()
    }

    return (
        <>
            <Button className='bg-amber-400 aspect-square' size={'xs'} color='warning' onClick={() => setOpenModal(true)}><FaEdit /></Button>
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Edit data produk</Modal.Header>
                <Modal.Body>
                    <form onSubmit={submit} className="">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email1" value="Nama toko" />
                            </div>
                            <TextInput id="email1" type="text" placeholder="" value={data.name} onChange={e => setData('name', e.target.value)} required />
                            {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
                        </div>
                        <div className="">
                            <div className="mb-2 block">
                                <Label htmlFor="countries" value="pilih kategori" />
                            </div>
                            <Select id="countries" value={data.category_id} onChange={e => setData('category_id', e.target.value)} required>
                                {
                                    categories.map((category) => {
                                        return (
                                            <option key={category.id} value={category.id}>{category.name}</option>
                                        )
                                    })
                                }
                            </Select>
                        </div>
                        <div className="">
                            <div className="mb-2 block">
                                <Label htmlFor="comment" value="Your message" />
                            </div>
                            <Textarea id="comment" placeholder="Leave a comment..." value={data.description} onChange={e => setData('description', e.target.value)} required rows={4} />
                        </div>
                        <div className="">
                            <div className="my-1">
                                <TableComp title={`Pilihan varian`} head={["#", `Pilihan varian`, "Harga", ""]} tableContent={VariantData(data.variant_products)}></TableComp>
                            </div>
                            <div className="">
                                <form onSubmit={e => (e)} action="" className="">
                                    <div className="grid grid-cols-7 gap-4">
                                        <div className="col-span-3">
                                            <div className="mb-2 block">
                                                <Label htmlFor="amount" value="nama variant" />
                                            </div>
                                            <TextInput onChange={e => setVariant(e.target.value)} type="text" />
                                        </div>
                                        <div className="col-span-3">
                                            <div className="mb-2 block">
                                                <Label htmlFor="" value="harga" />
                                            </div>
                                            <TextInput onChange={e => setPrice(e.target.value)} type="number" />
                                        </div>
                                        <div className="col-span-1 flex justify-center items-end">
                                            <Button onClick={() => setData('variant_products', [...data.variant_products, data.type == 'flavor' ? { flavor: variant, price: price } : { size: variant, price: price }])} size={'sm'} className="p-2 border-none bg-white text-black"><FaPlus /></Button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <hr className="my-4" />
                        <div className="w-full flex justify-end mt-4 col-span-4">
                            <Button color="primary" type="submit" size={'sm'}>Simpan</Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}
