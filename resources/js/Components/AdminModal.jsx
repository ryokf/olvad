
'use client';

import { Button, Modal, Table } from 'flowbite-react';
import React, { useState } from 'react';
import TableComp from './Table';

const DetailItemData = (data) => {
    // console.log(data)
    const dataLenght = Object.keys(data).length - 1

    return data.map(function (item, index) {

        return (
            <Table.Row key={item} className="bg-white border-none dark:bg-gray-800">
                <Table.Cell>{++index}</Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {item.name}
                </Table.Cell>
                <Table.Cell className="">
                    {item.detail_item.amount}
                </Table.Cell>
                <Table.Cell className="">
                    {item.detail_item.unit}
                </Table.Cell>
                <Table.Cell className="">
                    Rp{item.price}
                </Table.Cell>
                <Table.Cell className="">
                    Rp{item.detail_item.total}
                </Table.Cell>
            </Table.Row>
        )
    })
}
export default function AdminModalComp({ title, headerTitle, data }) {
    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <Button onClick={() => setOpenModal(true)}>{title}</Button>
            <Modal show={openModal} size={"5xl"} onClose={() => setOpenModal(false)}>
                <Modal.Header>{headerTitle}</Modal.Header>
                <Modal.Body>
                    <div className="font-medium">
                        Toko : {data.store}
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
                <Modal.Footer>
                    <Button onClick={() => setOpenModal(false)}>accept</Button>
                    <Button color="gray" onClick={() => setOpenModal(false)}>
                        Decline
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}