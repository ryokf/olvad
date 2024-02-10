import React, { useState } from "react";
import TableComp from "../../../Components/Table";
import { Button, Flowbite, Label, Select, Table, TextInput } from 'flowbite-react';
import DetailOutcome from "./DetailOutcome";
import DataOption from "./DataOption";
import { useForm } from '@inertiajs/react'
import CustomTheme from "../../../theme/CustomTheme";
import { RiDeleteBack2Fill } from "react-icons/ri";

const OutcomeSocialData = (data) => {
    const searchParams = new URLSearchParams(window.location.search);

    return data.map((item, index) => (
        <Table.Row key={item.id} className="bg-white border-none dark:bg-gray-800">
            <Table.Cell>{++index + (!searchParams.has('page') ? 0 : 10 * (searchParams.get('page') - 1))}</Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {item.date}
            </Table.Cell>
            <Table.Cell>{item.description.slice(0, 50)}...</Table.Cell>
            <Table.Cell>{item.customer}</Table.Cell>
            <Table.Cell>Rp{item.cost}</Table.Cell>
            <Table.Cell>
                <DetailOutcome title={"•••"} data={item} headerTitle={"Detail Pengeluaran"}></DetailOutcome>
            </Table.Cell>
        </Table.Row>
    ))
}

export default function OutcomeSocial({ dataGet, paginationData }) {
    let [addProductCount, setAddProductCount] = useState(1);

    const { data, setData, post, errors } = useForm(
        {
            type: 'social',
            description: '',
            customer_id: 1,
            detail_item: []
        }
    )

    const [productId, setProductId] = useState(1)
    const [amount, setAmount] = useState(0)
    const [unitId, setUnitId] = useState(1)
    const [price, setPrice] = useState(dataGet.product[0].price)
    const [priceList, setPriceList] = useState([])
    const [readyToSave, setReadyToSave] = useState(false)
    function addItem() {
        setAddProductCount(addProductCount + 1)
        setData('detail_item', [...data.detail_item, { product_id: productId, amount: amount, unit_id: unitId },])
    }

    function eraseItem() {
        data.detail_item.splice(data.detail_item.length - 1, 1)
        setData('detail_item', data.detail_item)
        priceList.splice(priceList.length - 1, 1)
        setAddProductCount(addProductCount != 1 ? addProductCount - 1 : addProductCount)
    }

    function finishData() {
        setPriceList([...priceList, parseInt(price) * amount])
        setData('total_cost', priceList)
        setReadyToSave(true)
        setData('detail_item', [...data.detail_item, { product_id: productId, amount: amount, unit_id: unitId },])
    }
    function submit(e) {
        e.preventDefault()
        post('/admin/outcome')
        setReadyToSave(false)
        setAddProductCount(1)
        setData('detail_item', [])
    }

    return (
        <div className="">
            <div className="">

                <TableComp
                    title={"Data pengeluaran untuk sosial"}
                    head={["#", "tanggal", "deskripsi", "penerima", "total", ""]}
                    tableContent={OutcomeSocialData(dataGet.outcome)}
                    IsSearchable
                    isPageable
                    paginationData={paginationData}
                    optionButton={DataOption()}
                />
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
                                <Select id="customer" value={dataGet.customer_id} onChange={e => setData('customer_id', e.target.value)} required>
                                    {
                                        dataGet.customer.map((store) => {
                                            return (
                                                <option key={store.id} value={store.id}>{store.name}</option>
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
                                <TextInput readOnly disabled id="" type="text" value={priceList.reduce((a, b) => a + b, 0)} />
                            </div>
                        </div>
                        <hr className="my-6" />
                        <div key={data.description} className="">
                            {Array.apply(0, Array(addProductCount)).map(function (x, i) {
                                return <div key={x} className="grid grid-cols-12 gap-6 items-end mt-2">
                                    <h1 className="pb-3 text-base font-medium col-span-1 text-center">barang {++i}</h1>
                                    <div className="w-full col-span-3">
                                        <div className="mb-2 block">
                                            <Label htmlFor="product" value="pilih produk" />
                                        </div>
                                        <Select {...i != addProductCount || readyToSave ? { disabled: true } : {}} id="product" value={data?.detail_item[i - 1]?.product_id} onChange={function (e) { console.log(""); setProductId(parseInt(e.target.value.split(",")[0])); setPrice(e.target.value.split(",")[1]); }} required>
                                            {
                                                dataGet.product.map((item) => (
                                                    <option key={item.id} value={[item.id, item.price]}>{item.name}</option>
                                                ))
                                            }
                                        </Select>
                                    </div>
                                    <div className="col-span-1">
                                        <div className="mb-2 block">
                                            <Label htmlFor="amount" value="jumlah" />
                                        </div>
                                        <TextInput {...i != addProductCount || readyToSave ? { disabled: true } : {}} value={data?.detail_item[i - 1]?.amount} onChange={function (e) { setAmount(e.target.value); }} id="amount" type="number" placeholder="" required />
                                    </div>
                                    <div className="col-span-1">
                                        <div className="mb-2 block">
                                            <Label htmlFor="unit" value="pilih satuan" />
                                        </div>
                                        <Select {...i != addProductCount || readyToSave ? { disabled: true } : {}} value={data?.detail_item[i - 1]?.unit_id} onChange={e => setUnitId(e.target.value)} className="" id="unit" required>
                                            {
                                                dataGet.unit.map((item) => (
                                                    <option key={item.id} value={item.id}>{item.unit}</option>
                                                ))
                                            }
                                        </Select>
                                    </div>
                                    <div className="col-span-2">
                                        <div className="mb-2 block">
                                            <Label htmlFor="" value="harga satuan" />
                                        </div>
                                        <TextInput readOnly disabled id="" type="text" value={!priceList[i - 1] ? price : priceList[i - 1] / data?.detail_item[i - 1]?.amount} />
                                    </div>
                                    <div className="col-span-2">
                                        <div className="mb-2 block">
                                            <Label htmlFor="" value="harga" />
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
        </div>
    )
}
