import React, { useState } from "react";

import Admin from "../../../Templates/Admin";
import TableComp from "../../../Components/Table";
import { Table, Label, Select, Button, TextInput, Flowbite, Radio } from 'flowbite-react';
import { MdDelete } from "react-icons/md";
import { useForm, Link } from '@inertiajs/react'
import DeleteConfirm from "../../../Components/DeleteConfirm";
import { usePage } from '@inertiajs/react'
import DetailProduct from "./DetailProduct";
import CustomTheme from "../../../theme/CustomTheme";
import DateFormat from "../../../Helper/DateFormat";
import { RiDeleteBack2Fill } from "react-icons/ri";
import Edit from "./Edit";

const ProductData = (dataGet, categories) => {
    const searchParams = new URLSearchParams(window.location.search);
    console.log(dataGet)
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
                <DetailProduct title="•••" headerTitle="Detail produk" data={item}></DetailProduct>
                <Edit dataProduct={item} categories={categories}></Edit>
                <DeleteConfirm id={item.id} href={"/admin/product"}></DeleteConfirm>
            </Table.Cell>
        </Table.Row>
    ))
}

export default function Product({ products, categories }) {
    const { flash } = usePage().props
    let [addVariantCount, setAddVariantCount] = useState(1);

    const date = DateFormat();

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        category_id: 1,
        description: '',
        image: '',
        type: 'flavor',
        variant_products: [],
    })

    const [variant, setVariant] = useState('')
    const [price, setPrice] = useState(0)
    const [readyToSave, setReadyToSave] = useState(false)

    function addItem() {
        setAddVariantCount(addVariantCount + 1)
        setData('variant_products', [...data.variant_products, { variant: variant, price: price, },])
    }

    function eraseItem() {
        data.variant_products.splice(data.variant_products.length - 1, 1)
        setData('variant_products', data.variant_products)
        setAddVariantCount(addVariantCount != 1 ? addVariantCount - 1 : addVariantCount)
    }

    function finishData() {
        setReadyToSave(true)
        setData('variant_products', [...data.variant_products, { variant: variant, price: price, },])
    }

    function submit(e) {
        e.preventDefault()
        post('/admin/product')
        setReadyToSave(false)
        setAddVariantCount(1)
        setData('name', '')
        setData('category_id', 1)
        setData('description', '')
        setData('image', '')
        setData('type', 'flavor')
        setData('variant_products', [])
    }

    return (
        <div className="">
            <Admin title="Produk" bannerMessage={flash}>
                <div className="">
                    <TableComp isPageable={true} paginationData={products.meta} IsSearchable head={["#", "nama", "kategori", "deskripsi", " "]} tableContent={ProductData(products.data, categories)}></TableComp>
                </div>
                <Flowbite theme={{ theme: CustomTheme }}>
                    <div className="my-6 p-4 min-h-min bg-white">
                        <h1 className="text-xl font-medium">Tambah data pembelian</h1>
                        <form onSubmit={submit} className="my-4">
                            <div className="grid grid-cols-5 gap-6">

                                <div className="w-full col-span-1">
                                    <div className="mb-2 block">
                                        <Label htmlFor="name" value="nama produk" />
                                    </div>
                                    <TextInput id="name" type="text" placeholder="masukkan nama produk" value={data.name} onChange={e => setData('name', e.target.value)} required />
                                    {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
                                </div>

                                <div className="col-span-1">
                                    <div className="mb-2 block">
                                        <Label htmlFor="category" value="pilih kategori" />
                                    </div>
                                    <Select id="category" onChange={e => setData('category_id', e.target.value)} required>
                                        {
                                            categories.map((category) => {
                                                return (
                                                    <option key={category.id} value={category.id}>{category.name}</option>
                                                )
                                            })
                                        }
                                    </Select>
                                </div>

                                <div id="fileUpload" className="col-span-1 ">
                                    <div className="mb-2 block">
                                        <Label htmlFor="photo" value="upload foto produk" />
                                    </div>
                                    <input className="rounded-lg border bg-gray-50" type="file" defaultValue={data.image} onChange={e => setData('image', e.target.files[0])} />
                                    {errors.image && <div className="text-red-500 text-sm">{errors.image}</div>}
                                </div>

                                <div className="col-span-2">
                                    <div className="mb-2 block">
                                        <Label htmlFor="description" value="deskripsi produk" />
                                    </div>
                                    <TextInput id="description" type="text" placeholder="masukkan deskripsi produk" value={data.description} onChange={e => setData('description', e.target.value)} required />
                                    {errors.description && <div className="text-red-500 text-sm">{errors.description}</div>}
                                </div>
                            </div>
                            <hr className="my-6" />
                            <fieldset className="flex max-w-md gap-4 m-auto justify-center" onChange={e => setData('type', e.target.value)}>
                                <legend className="mb-4 font-medium text-center">Pilih tipe variasi produk</legend>
                                <div className="flex items-center gap-2">
                                    <Radio id="flavor" name="variant_type" value="flavor" defaultChecked />
                                    <Label htmlFor="flavor">flavor</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Radio id="size" name="variant_type" value="size" />
                                    <Label htmlFor="size">size</Label>
                                </div>
                            </fieldset>
                            <div key={data.description} className="">
                                {Array.apply(0, Array(addVariantCount)).map(function (x, i) {
                                    return <div key={i} className="grid grid-cols-6 gap-6 items-end mt-2">
                                        <h1 className="pb-3 text-base font-medium col-span-1 text-center">variasi {++i}</h1>
                                        <div className="col-span-2">
                                            <div className="mb-2 block">
                                                <Label htmlFor="amount" value="nama variant" />
                                            </div>
                                            <TextInput {...i != addVariantCount || readyToSave ? { disabled: true } : {}} value={data?.variant_products[i-1]?.variant} onChange={e => setVariant(e.target.value)} type="text" placeholder="" required />
                                        </div>
                                        <div className="col-span-2">
                                            <div className="mb-2 block">
                                                <Label htmlFor="" value="harga" />
                                            </div>
                                            <TextInput {...i != addVariantCount || readyToSave ? { disabled: true } : {}} value={data?.variant_products[i - 1]?.product} onChange={e => setPrice(e.target.value)} type="number" />
                                        </div>
                                        {
                                            i == addVariantCount && !readyToSave &&
                                            <div className="col-span-1">
                                                <button className="text-2xl text-red-500" onClick={() => eraseItem()}> <RiDeleteBack2Fill /> </button>
                                                {/* <button className="text-2xl text-secondary-light" onClick={() => { setData('detail_item', [...data.detail_item, { product_id: productId, amount: amount, unit_id: unitId, price: price }]) }}> <FaCheck /> </button> */}
                                            </div>
                                        }
                                    </div>;
                                })}
                            </div>
                            <div className="flex justify-between mt-6">
                                <div className=""></div>
                                {
                                    !readyToSave &&
                                    <button type="button" className="px-3 text-4xl font-bold " onClick={() => addItem()}>+</button>
                                }
                                <Button color="primary" onClick={readyToSave ? submit : function () { finishData(); }}>{readyToSave ? 'simpan' : 'selesai'}</Button>
                            </div>
                        </form>
                    </div>
                </Flowbite>
            </Admin>
        </div>
    )
}
