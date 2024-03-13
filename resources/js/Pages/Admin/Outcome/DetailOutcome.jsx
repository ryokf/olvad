'use client';
import { Button, Flowbite, Modal, Table } from 'flowbite-react';
import React, { useState } from 'react';
import TableComp from '../../../Components/Table';
import CustomTheme from '../../../theme/CustomTheme';
import CurrencyFormat from '../../../Helper/CurrencyFormat';


const DetailItemData = (data) => {
    return data.map(function (item, index) {
        const isBuyType = window.location.pathname.split("/")[3] == "buy" ? true : false;

        return (
            <Table.Row key={item.id} className="bg-white border-none dark:bg-gray-800">
                <Table.Cell>{++index}</Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {isBuyType ? item.name : item.product['name']}
                </Table.Cell>
                <Table.Cell className="">
                    {item.detail_item.amount}
                </Table.Cell>
                <Table.Cell className="">
                    {item.detail_item.unit}
                </Table.Cell>
                <Table.Cell className="">
                    {CurrencyFormat(isBuyType ? item.price : item.product['price'])}
                </Table.Cell>
                <Table.Cell className="">
                    {CurrencyFormat(item.detail_item.total)}
                </Table.Cell>
            </Table.Row>
        )
    })
}
export default function DetailOutcome({ title, headerTitle, data }) {
    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <Flowbite theme={CustomTheme}>
                <Button color='primary' size={'xs'} onClick={() => setOpenModal(true)}>{title}</Button>
            </Flowbite>
            <Modal show={openModal} size={"5xl"} onClose={() => setOpenModal(false)}>
                <Modal.Header>{headerTitle}</Modal.Header>
                <Modal.Body>
                    <div className="font-medium">
                    {data.reciepe != null ? "Toko" : "Pelanggan"} : {data.reciepe != null ? data.store : data.customer}
                        {/* {localStorage.getItem('isBuyType') ? "Toko" : "Penerima"} : {localStorage.getItem('isBuyType') ? data.store : data.customer} */}
                    </div>
                    <div className="font-medium">
                        Jenis : {data.reciepe != null ? "Pembelian" : "Sosial"}
                    </div>
                    <div className="text-gray-400 my-2">
                        {data.date}
                    </div>
                    <div className="mb-2 ">
                        {data.description}
                    </div>
                    <div className="">
                        <TableComp head={["#", "Barang", "Jumlah", "Satuan", "Harga", "Harga total"]} tableContent={DetailItemData(data.item)}></TableComp>
                    </div>
                    <div className="flex justify-center my-6">
                        <img src={data.reciepe} alt="" />
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
