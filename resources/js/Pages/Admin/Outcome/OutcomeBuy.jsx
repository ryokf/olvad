import React, { useState } from "react";
import TableComp from "../../../Components/Table";
import { Table, Label, Select, Button, TextInput, Flowbite } from 'flowbite-react';
import DetailOutcome from "./DetailOutcome";
import DataOption from "./DataOption";
import CustomTheme from "../../../theme/CustomTheme";
import { useForm } from '@inertiajs/react'
import { RiDeleteBack2Fill } from "react-icons/ri";

import DeleteConfirm from "../../../Components/DeleteConfirm";
import CurrencyFormat from "../../../Helper/CurrencyFormat";

const OutcomeBuyData = (dataGet) => {
    const searchParams = new URLSearchParams(window.location.search);
    // console.log(searchParams.has('page')); // price_descending



    return dataGet.map((item, index) => (
        <Table.Row key={item.id} className="bg-white border-none dark:bg-gray-800">
            <Table.Cell>{++index + (!searchParams.has('page') ? 0 : 10 * (searchParams.get('page') - 1))}</Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {item.date}
            </Table.Cell>
            <Table.Cell>{item.description.slice(0, 50)}{
                item.description.length > 50 && (
                    <span>...</span>
                )
            }</Table.Cell>
            <Table.Cell>{item.store}</Table.Cell>
            <Table.Cell>{CurrencyFormat(item.cost)}</Table.Cell>
            <Table.Cell className="flex gap-4">
                <DetailOutcome title={"•••"} data={item} headerTitle={"Detail Pengeluaran"}></DetailOutcome>
                <DeleteConfirm id={item.outcome_id} href={"/admin/outcome"}></DeleteConfirm>
                {/* <Link href="/admin/outcome" method="delete" data={{ id: item.outcome_id }}>
                    <Button size={'sm'} color="failure" className="bg-red-500 hover:bg-red-600 text-white text-xl"><MdDelete /></Button>
                </Link> */}
            </Table.Cell>
        </Table.Row>
    ))
}

export default function OutcomeBuy({ dataGet, paginationData }) {
    let [addIngredientCount, setAddIngredientCount] = useState(1);

    console.log(dataGet)

    if(dataGet.ingredient.length == 0 || dataGet.store.length == 0) {
        return(
            <div className="flex justify-center items-center">daftar bahan atau toko masih kossong</div>
        )
    }

    const { data, setData, post, processing, errors } = useForm(
        {
            type: 'buy',
            description: '',
            store_id: dataGet.store[dataGet.store.length - 1].id,
            reciepe: '',
            detail_item: []
        }
    )

    const [ingredientId, setIngredientId] = useState(dataGet.ingredient[dataGet.ingredient.length - 1].id)
    const [amount, setAmount] = useState(0)
    const [unitId, setUnitId] = useState(1)
    const [price, setPrice] = useState(0)
    const [readyToSave, setReadyToSave] = useState(false)

    let total = data.detail_item.map((item) => item.price * item.amount)
    function addItem() {
        setAddIngredientCount(addIngredientCount + 1)
        setData('detail_item', [...data.detail_item, { ingredient_id: ingredientId, amount: amount, unit_id: unitId, price: price },])
    }

    function eraseItem() {
        data.detail_item.splice(data.detail_item.length - 1, 1)
        setData('detail_item', data.detail_item)
        setAddIngredientCount(addIngredientCount != 1 ? addIngredientCount - 1 : addIngredientCount)
    }

    function finishData() {
        setReadyToSave(true)
        setData('detail_item', [...data.detail_item, { ingredient_id: ingredientId, amount: amount, unit_id: unitId, price: price },])
    }
    function submit(e) {
        e.preventDefault()
        post('/admin/outcome')
        setIngredientId(dataGet.ingredient[dataGet.ingredient.length - 1].id)
        setAmount(0)
        setUnitId(1)
        setPrice(0)
        setData('description', '')
        setData('store_id', dataGet.store[dataGet.store.length - 1].id)
        setData('reciepe', '')
        setData('detail_item', [])
        setReadyToSave(false)
        setAddIngredientCount(1)
        // location.reload()
    }

    return (
        <>
            <div className="">
                <TableComp title={"Data pengeluaran untuk pembelian"}
                    head={["#", "tanggal", "deskripsi", "toko", "total", ""]}
                    tableContent={OutcomeBuyData(dataGet.outcome)}
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
                        <div className="grid grid-cols-4 gap-6">
                            <div className="col-span-1">
                                <div className="mb-2 block">
                                    <Label htmlFor="store" value="pilih toko" />
                                </div>
                                <Select id="store" value={data.store_id} onChange={e => setData('store_id', e.target.value)} required>
                                    {
                                        dataGet.store.map((store) => {
                                            return (
                                                <option key={store.id} value={store.id}>{store.name}</option>
                                            )
                                        })
                                    }
                                </Select>
                            </div>
                            <div className="w-full col-span-1d">
                                <div className="mb-2 block">
                                    <Label htmlFor="description" value="deskripsi" />
                                </div>
                                <TextInput id="description" type="text" placeholder="deskripsi pembelian" value={data.description} onChange={e => setData('description', e.target.value)} required />
                                {errors.description && <div className="text-red-500 text-sm">{errors.description}</div>}
                            </div>
                            <div id="fileUpload" className="col-span-1">
                                <div className="mb-2 block">
                                    <Label htmlFor="reciepe" value="upload nota" />
                                </div>
                                {/* <FileInput id="reciepe" name="reciepe" /> */}
                                <input className="rounded-lg border bg-gray-50" type="file" defaultValue={data.reciepe} onChange={e => setData('reciepe', e.target.files[0])} />
                                {errors.reciepe && <div className="text-red-500 text-sm">{errors.reciepe}</div>}
                            </div>
                            <div className="col-span-1">
                                <div className="mb-2 block">
                                    <Label htmlFor="" value="total biaya semua bahan" />
                                </div>
                                <TextInput readOnly disabled id="" type="text" value={CurrencyFormat(total.reduce((a, b) => a + b, 0))} />
                            </div>
                        </div>
                        <hr className="my-6" />
                        <div key={data.description} className="">
                            {Array.apply(0, Array(addIngredientCount)).map(function (x, i) {
                                console.log(dataGet.ingredient[dataGet.ingredient.length - 1].id)
                                return <div key={x} className="grid grid-cols-12 gap-6 items-end mt-2">
                                    <h1 className="pb-3 text-base font-medium cols-span-1 text-center">barang {++i}</h1>
                                    <div className="col-span-3">
                                        <div className="mb-2 block">
                                            <Label htmlFor="ingredient" value="pilih bahan" />
                                        </div>
                                        <Select {...i != addIngredientCount || readyToSave ? { disabled: true } : {}} id="ingredient" value={data?.detail_item[i - 1]?.ingredient_id == null ? ingredientId : data?.detail_item[i - 1]?.ingredient_id} onChange={e => setIngredientId(e.target.value)} required>
                                            {
                                                dataGet.ingredient.map((item) => (
                                                    <option key={item.id} value={item.id}>{item.name}</option>
                                                ))
                                            }
                                        </Select>
                                    </div>
                                    <div className="cols-span-1">
                                        <div className="mb-2 block">
                                            <Label htmlFor="amount" value="jumlah" />
                                        </div>
                                        <TextInput {...i != addIngredientCount || readyToSave ? { disabled: true } : {}} value={data?.detail_item[i - 1]?.amount} onChange={function (e) { setAmount(e.target.value); setData('total_cost', total.reduce((a, b) => a + b, 0)) }} id="amount" type="number" placeholder="" required />
                                    </div>
                                    <div className="col-span-1">
                                        <div className="mb-2 block">
                                            <Label htmlFor="unit" value="pilih satuan" />
                                        </div>
                                        <Select {...i != addIngredientCount || readyToSave ? { disabled: true } : {}} value={data?.detail_item[i - 1]?.unit_id} onChange={e => setUnitId(e.target.value)} className="" id="unit" required>
                                            {
                                                dataGet.unit.map((item) => (
                                                    <option key={item.id} value={item.id}>{item.unit}</option>
                                                ))
                                            }
                                        </Select>
                                    </div>
                                    <div className="col-span-2">
                                        <div className="mb-2 block">
                                            <Label htmlFor="price" value="harga" />
                                        </div>
                                        <TextInput {...i != addIngredientCount || readyToSave ? { disabled: true } : {}} value={data?.detail_item[i - 1]?.price} onChange={function (e) { setPrice(e.target.value); setData('total_cost', total.reduce((a, b) => a + b, 0)) }} id="price" type="number" placeholder="" required />
                                    </div>
                                    <div className="col-span-2">
                                        <div className="mb-2 block">
                                            <Label htmlFor="total" value="total" />
                                        </div>
                                        <TextInput readOnly disabled id="total" value={addIngredientCount == i ? (price * amount) : (data?.detail_item[i - 1]?.amount * data?.detail_item[i - 1]?.price)} type="text" placeholder="" required />
                                    </div>
                                    {
                                        i == addIngredientCount && !readyToSave &&
                                        <div className="col-span-2">
                                            <button className="text-2xl text-red-500" onClick={() => eraseItem()}> <RiDeleteBack2Fill /> </button>
                                            {/* <button className="text-2xl text-secondary-light" onClick={() => { setData('detail_item', [...data.detail_item, { ingredient_id: ingredientId, amount: amount, unit_id: unitId, price: price }]) }}> <FaCheck /> </button> */}
                                        </div>
                                    }
                                </div>;
                            })}
                        </div>
                        <div className="flex justify-between mt-6">
                            <div className=""></div>
                            {
                                !readyToSave &&
                                <button className="px-3 text-4xl font-bold " onClick={() => addItem()}>+</button>
                            }
                            <Button color="primary" onClick={readyToSave ? submit : function () { finishData(); }}>{readyToSave ? 'simpan' : 'selesai'}</Button>
                        </div>
                    </form>
                </div>
            </Flowbite>
        </>
    )
}
