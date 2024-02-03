import React, { useEffect, useState } from "react";
import TableComp from "../../../Components/Table";
import { Table, Label, Select, Button, Checkbox, TextInput, FileInput, Flowbite } from 'flowbite-react';
import DetailOutcome from "./DetailOutcome";
import DataOption from "./DataOption";
import CustomTheme from "../../../theme/CustomTheme";
import { FaMinusCircle, FaCheck } from "react-icons/fa";
import { useForm } from '@inertiajs/react'

const OutcomeBuyData = (dataGet) => {
    const searchParams = new URLSearchParams(window.location.search);
    // console.log(searchParams.has('page')); // price_descending

    return dataGet.map((item, index) => (
        <Table.Row key={item.id} className="bg-white border-none dark:bg-gray-800">
            <Table.Cell>{++index + (!searchParams.has('page') ? 0 : 10 * (searchParams.get('page') - 1))}</Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {item.date}
            </Table.Cell>
            <Table.Cell>{item.description.slice(0, 50)}...</Table.Cell>
            <Table.Cell>{item.store}</Table.Cell>
            <Table.Cell>Rp{item.cost}</Table.Cell>
            <Table.Cell>
                <DetailOutcome title={"•••"} data={item} headerTitle={"Detail Pengeluaran"}></DetailOutcome>
            </Table.Cell>
        </Table.Row>
    ))
}

const addIngredientForm = (counter, data, eraseable, eraseFunc) => {
    // console.log(data)
    return (
        <div className="flex gap-6 items-end mt-2">
            <h1 className="pb-3 text-base font-medium ">barang {++counter}</h1>
            <div className="min-w-60 max-w-md">
                <div className="mb-2 block">
                    <Label htmlFor="ingredient" value="pilih bahan" />
                </div>
                <Select className="" id="ingredient" name="ingredient_id" required>
                    {
                        data.ingredient.map((item) => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))
                    }
                </Select>
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="amount" value="jumlah" />
                </div>
                <TextInput id="amount" name="amount" type="number" placeholder="" required />
            </div>
            <div className="min-w-40 max-w-md">
                <div className="mb-2 block">
                    <Label htmlFor="unit" value="pilih satuan" />
                </div>
                <Select className="" id="unit" name="unit_id" required>
                    {
                        data.unit.map((item) => (
                            <option key={item.id} value={item.id}>{item.unit}</option>
                        ))
                    }
                </Select>
            </div>
            <div className="min-w-60">
                <div className="mb-2 block">
                    <Label htmlFor="price" value="harga" />
                </div>
                <TextInput id="price" name="price" type="number" placeholder="" required />
            </div>
            <div className="min-w-60">
                <div className="mb-2 block">
                    <Label htmlFor="total" value="total" />
                </div>
                <TextInput readOnly disabled id="total" value={"2000"} type="text" placeholder="" required />
            </div>
            {
                eraseable &&
                <div className="">
                    <button className="text-2xl text-red-500" onClick={() => eraseFunc()}> <FaMinusCircle /> </button>
                </div>
            }

        </div>
    );
}

export default function OutcomeBuy({ dataGet, paginationData }) {
    let [addIngredientCount, setAddIngredientCount] = useState(1);

    const { data, setData, post, processing, errors } = useForm(
        {
            type: 'buy',
            description: '',
            total_cost: 0,
            store_id: 0,
            reciepe: '',
            detail_item: [

            ]
        }
    )

    const [ingredientId, setIngredientId] = useState(0)
    const [amount, setAmount] = useState(0)
    const [unitId, setUnitId] = useState(0)
    const [price, setPrice] = useState(0)
    function addItem() {
        setAddIngredientCount(addIngredientCount + 1)

        setData('detail_item', [...data.detail_item, { ingredient_id: ingredientId, amount: amount, unit_id: unitId, price: price },])
    }

    function submit(e) {
        e.preventDefault()
        post('/admin/outcome')
    }

    console.log(data)
    // console.log(data)

    return (
        <>
            <div className="">
                <TableComp title={"Data pengeluaran untuk pembelian"}
                    head={["#", "tanggal", "deskripsi", "toko", "total", ""]}
                    tableContent={OutcomeBuyData(dataGet.outcome)}
                    IsSearchable
                    // isPageable
                    // paginationData={paginationData}
                    optionButton={DataOption()}
                />
            </div>
            <Flowbite theme={{ theme: CustomTheme }}>

                <div className="my-6 p-4 min-h-min bg-white">
                    <h1 className="text-xl font-medium">Tambah data pembelian</h1>
                    <form onSubmit={submit} className="my-4">
                        <div className="flex gap-6">
                            <div className="min-w-80">
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
                            <div className="w-full max-w-md">
                                <div className="mb-2 block">
                                    <Label htmlFor="description" value="deskripsi" />
                                </div>
                                <TextInput id="description" type="text" placeholder="deskripsi pembelian" value={data.description} onChange={e => setData('description', e.target.value)} required />
                            </div>
                            <div id="fileUpload" className="min-w-80">
                                <div className="mb-2 block">
                                    <Label htmlFor="reciepe" value="upload nota" />
                                </div>
                                <FileInput id="reciepe" name="reciepe" />
                            </div>
                            <div className="min-w-60">
                                <div className="mb-2 block">
                                    <Label htmlFor="" value="total biaya semua bahan" />
                                </div>
                                <TextInput readOnly disabled id="" type="text" value={"Rp340000"} />
                            </div>
                        </div>
                        <hr className="my-6" />
                        <div className="">
                            {Array.apply(0, Array(addIngredientCount)).map(function (x, i) {

                                return <div key={x} className="flex gap-6 items-end mt-2">
                                    <h1 className="pb-3 text-base font-medium ">barang {++i}</h1>
                                    <div className="min-w-60 max-w-md">
                                        <div className="mb-2 block">
                                            <Label htmlFor="ingredient" value="pilih bahan" />
                                        </div>
                                        <Select {...i != addIngredientCount ? { disabled: true } : {}} id="ingredient" value={data?.detail_item[i - 1]?.ingredient_id} onChange={e => setIngredientId(e.target.value)} required>
                                            {
                                                dataGet.ingredient.map((item) => (
                                                    <option key={item.id} value={item.id}>{item.name}</option>
                                                ))
                                            }
                                        </Select>
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="amount" value="jumlah" />
                                        </div>
                                        <TextInput {...i != addIngredientCount ? { disabled: true } : {}}  value={data?.detail_item[i - 1]?.amount} onChange={e => setAmount(e.target.value)} id="amount" type="number" placeholder="" required />
                                    </div>
                                    <div className="min-w-40 max-w-md">
                                        <div className="mb-2 block">
                                            <Label htmlFor="unit" value="pilih satuan" />
                                        </div>
                                        <Select {...i != addIngredientCount ? { disabled: true } : {}} value={data?.detail_item[i - 1]?.unit_id} onChange={e => setUnitId(e.target.value)} className="" id="unit"  required>
                                            {
                                                dataGet.unit.map((item) => (
                                                    <option key={item.id} value={item.id}>{item.unit}</option>
                                                ))
                                            }
                                        </Select>
                                    </div>
                                    <div className="min-w-60">
                                        <div className="mb-2 block">
                                            <Label htmlFor="price" value="harga" />
                                        </div>
                                        <TextInput {...i != addIngredientCount ? { disabled: true } : {}} value={data?.detail_item[i - 1]?.price} onChange={e => setPrice(e.target.value)} id="price" type="number" placeholder="" required />
                                    </div>
                                    <div className="min-w-60">
                                        <div className="mb-2 block">
                                            <Label htmlFor="total" value="total" />
                                        </div>
                                        <TextInput readOnly disabled id="total" value={(data?.detail_item[i - 1]?.price * data?.detail_item[i - 1]?.amount) == NaN ? 0 : (data?.detail_item[i - 1]?.price * data?.detail_item[i - 1]?.amount)} type="text" placeholder="" required />
                                    </div>
                                    {
                                        i == addIngredientCount &&
                                        <div className="">
                                            {/* <button className="text-2xl text-red-500" onClick={() => setAddIngredientCount(addIngredientCount != 1 ? addIngredientCount - 1 : addIngredientCount)}> <FaMinusCircle /> </button> */}
                                            {/* <button className="text-2xl text-secondary-light" onClick={() => { setData('detail_item', [...data.detail_item, { ingredient_id: ingredientId, amount: amount, unit_id: unitId, price: price }]) }}> <FaCheck /> </button> */}
                                        </div>
                                    }
                                </div>;
                            })}
                        </div>
                        <div className="flex justify-between">
                            <button className="px-3 text-4xl font-bold " onClick={() => addItem()}>+</button>
                            <Button color="primary">Simpan</Button>
                        </div>
                    </form>
                </div>
            </Flowbite>
        </>
    )
}
