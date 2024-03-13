import React, { useState } from "react";

import Admin from "../../../Templates/Admin";
import TableComp from "../../../Components/Table";
import { Table, Label, Select, Button, TextInput, Flowbite } from 'flowbite-react';
import { MdDelete } from "react-icons/md";
import { useForm, Link } from '@inertiajs/react'
import DeleteConfirm from "../../../Components/DeleteConfirm";
import DetailIncome from "./DetailIncome";
import { usePage } from '@inertiajs/react'
import CustomTheme from "../../../theme/CustomTheme";
import { RiDeleteBack2Fill } from "react-icons/ri";
import DateFormat from "../../../Helper/DateFormat";
import DataOption from "./DataOption";
import CurrencyFormat from "../../../Helper/CurrencyFormat";

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
                {CurrencyFormat(item.total)}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white flex gap-4">
                <DetailIncome title={"•••"} data={item} headerTitle={"Detail Pemasukan"}></DetailIncome>
                <DeleteConfirm id={item.id} href={"/admin/income"}></DeleteConfirm>
            </Table.Cell>
        </Table.Row>
    ))
}

export default function Index({ incomes, products, customers }) {

    const date = DateFormat();
    if (products.length == 0 || customers.length == 0) {
        return (
            <Admin title="Pemasukan" subtitle={`${date.day}, ${date.dateNumber} ${date.month} ${date.year}`}>
                <div className="flex justify-center">daftar produk atau pelanggan masih kosong</div>
            </Admin>
        )
    }
    // console.log(products)
    const { flash } = usePage().props
    let [addProductCount, setAddProductCount] = useState(1);

    // console.log(customers[customers.length - 1].id)

    const { data, setData, post, processing, errors } = useForm({
        description: '',
        customer_id: customers[customers.length - 1].id,
        detail_items: [],
    })

    console.log(data);


    // const [productId, setProductId] = useState(products[products.length - 1].data.id)
    const [productId, setProductId] = useState(products[products.length - 1].data.id)
    const [parentProductId, setParentProductId] = useState(products[products.length - 1].data.product_id)
    const [amount, setAmount] = useState(0)
    const [price, setPrice] = useState(products[products.length - 1].data.price)
    const [productType, setProductType] = useState(products[products.length - 1].data.type)
    const [priceList, setPriceList] = useState([])
    const [readyToSave, setReadyToSave] = useState(false)

    // console.log(priceList)

    function addItem() {
        setAddProductCount(addProductCount + 1)
        setData('detail_items', [...data.detail_items, { product_id: productId, amount: amount, type: productType, parentProductId: parentProductId },])
    }

    function eraseItem() {
        data.detail_items.splice(data.detail_items.length - 1, 1)
        setData('detail_items', data.detail_items)
        priceList.splice(priceList.length - 1, 1)
        setAddProductCount(addProductCount != 1 ? addProductCount - 1 : addProductCount)
    }

    function finishData() {
        setPriceList([...priceList, parseInt(price) * amount])
        setReadyToSave(true)
        setData('detail_items', [...data.detail_items, { product_id: productId, amount: amount, type: productType, parentProductId: parentProductId },])
    }

    function submit(e) {
        e.preventDefault()
        post('/admin/income')
        setReadyToSave(false)
        setAddProductCount(1)
        setParentProductId(products[products.length - 1].data.product_id)
        setProductId(products[products.length - 1].data.id)
        setPrice(products[products.length - 1].data.price)
        setAmount(0)
        setProductType(products[products.length - 1].data.type)
        setPriceList([])
        setData('description', '')
        setData('customer_id', customers[customers.length - 1].id)
        setData('detail_items', [])
        // location.reload()
    }

    return (
        <div className="">
            <Admin title="Pemasukan" bannerMessage={flash} subtitle={`${date.day}, ${date.dateNumber} ${date.month} ${date.year}`}>
                <div className="my-2">
                    <TableComp optionButton={DataOption()} title={"data pemasukan"} head={["#", "tanggal", "deskripsi", "pelanggan", "total", ""]} tableContent={IncomeData(incomes.data)} isPageable IsSearchable paginationData={incomes.meta}></TableComp>
                </div>
                <Flowbite theme={{ theme: CustomTheme }}>
                    <div className="my-6 p-4 min-h-min bg-white">
                        <h1 className="text-xl font-medium">Tambah data pembelian</h1>
                        <form onSubmit={submit} className="my-4">
                            <div className="grid grid-cols-3 gap-6">
                                <div className="col-span-1">
                                    <div className="mb-2 block">
                                        <Label htmlFor="customer" value="pilih pelanggan" />
                                    </div>
                                    <Select id="customer" value={data.customer_id} onChange={e => setData('customer_id', e.target.value)} required>
                                        {
                                            customers.map((customer) => {
                                                return (
                                                    <option key={customer.id} value={customer.id}>{customer.name}</option>
                                                )
                                            })
                                        }
                                    </Select>
                                </div>
                                <div className="w-full col-span-1">
                                    <div className="mb-2 block">
                                        <Label htmlFor="description" value="deskripsi" />
                                    </div>
                                    <TextInput id="description" type="text" placeholder="deskripsi pembelian" value={data.description} onChange={e => setData('description', e.target.value)} required />
                                    {errors.description && <div className="text-red-500 text-sm">{errors.description}</div>}
                                </div>
                                <div className="col-span-1">
                                    <div className="mb-2 block">
                                        <Label htmlFor="" value="total biaya semua produk" />
                                    </div>
                                    <TextInput readOnly disabled id="" type="text" value={CurrencyFormat(priceList.reduce((a, b) => a + b, 0))} />
                                </div>
                            </div>
                            <hr className="my-6" />
                            <div key={data.description} className="">
                                {Array.apply(0, Array(addProductCount)).map(function (x, i) {
                                    return <div key={i} className="grid grid-cols-12 gap-6 items-end mt-2">
                                        <h1 className="pb-3 text-base font-medium col-span-1 text-center">barang {++i}</h1>
                                        <div className="w-full col-span-3">
                                            <div className="mb-2 block">
                                                <Label htmlFor="product" value="pilih produk" />
                                            </div>
                                            <Select {...i != addProductCount || readyToSave ? { disabled: true } : {}} id="product" onChange={function (e) { console.log(e.target.value.split(",")[0]); setProductId(parseInt(e.target.value.split(",")[0])); setPrice(e.target.value.split(",")[1]); setProductType(e.target.value.split(",")[2]); setParentProductId(parseInt(e.target.value.split(",")[3])); }} required>
                                                {
                                                    products.map((item) => (
                                                        <option selected={item.data.id} key={item.data.name} value={[item.data.id, item.data.price, item.data.type, item.data.product_id]}>{item.data.name}</option>
                                                    ))
                                                }
                                            </Select>

                                        </div>
                                        <div className="col-span-1">
                                            <div className="mb-2 block">
                                                <Label htmlFor="amount" value="jumlah" />
                                            </div>
                                            <TextInput {...i != addProductCount || readyToSave ? { disabled: true } : {}} value={data?.detail_items[i - 1]?.amount} onChange={function (e) { setAmount(e.target.value); }} id="amount" type="number" placeholder="" required />
                                        </div>
                                        <div className="col-span-2">
                                            <div className="mb-2 block">
                                                <Label htmlFor="" value="harga satuan" />
                                            </div>
                                            <TextInput readOnly disabled id="" type="text" value={i < addProductCount ? priceList[i - 1] / data?.detail_items[i - 1]?.amount : price} />
                                        </div>
                                        <div className="col-span-2">
                                            <div className="mb-2 block">
                                                <Label htmlFor="" value="harga total" />
                                            </div>
                                            <TextInput readOnly disabled id="" type="text" value={!priceList[i - 1] ? price : priceList[i - 1]} />
                                        </div>
                                        {
                                            i == addProductCount && !readyToSave &&
                                            <div className="col-span-2">
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
                                    <button className="px-3 text-4xl font-bold " onClick={function () { addItem(); setPriceList([...priceList, parseInt(price) * amount]) }}>+</button>
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

