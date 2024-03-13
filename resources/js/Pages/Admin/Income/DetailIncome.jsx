import { Button, Flowbite, Modal, Table } from 'flowbite-react';
import React, { useState } from 'react';
import TableComp from '../../../Components/Table';
import CustomTheme from '../../../theme/CustomTheme';
import CurrencyFormat from '../../../Helper/CurrencyFormat';


const DetailItemData = (data) => {
    return data.map(function (item, index) {
        console.log(item)
        return (
            <Table.Row key={item.id} className="bg-white border-none dark:bg-gray-800">
                <Table.Cell>{++index}</Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    { item.detail_item.name }
                </Table.Cell>
                <Table.Cell className="">
                    {item.amount}
                </Table.Cell>
                <Table.Cell className="">
                    {CurrencyFormat(item.detail_item.price)}
                </Table.Cell>
                <Table.Cell className="">
                    {CurrencyFormat(item.detail_item.price * item.amount)}
                </Table.Cell>
            </Table.Row>
        )
    })
}
export default function DetailIncome({ title, headerTitle, data }) {
    const [openModal, setOpenModal] = useState(false);

    // console.log(data)

    return (
        <>
            <Flowbite theme={CustomTheme}>
                <Button color='primary' size={'xs'} onClick={() => setOpenModal(true)}>{title}</Button>
            </Flowbite>
            <Modal show={openModal} size={"5xl"} onClose={() => setOpenModal(false)}>
                <Modal.Header>{headerTitle}</Modal.Header>
                <Modal.Body>
                    <div className="font-medium">
                        Pelanggan : {data.customer.name}
                    </div>
                    <div className="text-gray-400 my-2">
                        {data.date}
                    </div>
                    <div className="mb-2 ">
                        {data.description}
                    </div>
                    <div className="">
                        <TableComp head={["#", "Barang", "Jumlah", "Harga", "Harga total"]} tableContent={DetailItemData(data.items)}></TableComp>
                    </div>

                </Modal.Body>
            </Modal>
        </>
    );
}
