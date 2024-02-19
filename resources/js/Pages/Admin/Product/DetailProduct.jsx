'use client';
import { Button, Flowbite, Modal, Table } from 'flowbite-react';
import React, { useState } from 'react';
import TableComp from '../../../Components/Table';
import CustomTheme from '../../../theme/CustomTheme';
import { Badge } from 'flowbite-react';

const OptionalData = (data) => {
    return data?.map(function (item, index) {
        return (
            <Table.Row key={item.id} className="bg-white border-none dark:bg-gray-800">
                <Table.Cell>{++index}</Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {item.size ? item.size : item.flavor}
                </Table.Cell>
                <Table.Cell className="">
                    Rp{item.price}
                </Table.Cell>
            </Table.Row>
        )
    })
}
export default function DetailProduct({ title, headerTitle, data }) {
    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <Flowbite theme={CustomTheme}>
                <Button color='primary' size={'xs'} onClick={() => setOpenModal(true)}>{title}</Button>
            </Flowbite>
            <Modal show={openModal} size={"5xl"} onClose={() => setOpenModal(false)}>
                <Modal.Header>{headerTitle}</Modal.Header>
                <Modal.Body className='grid grid-cols-2 gap-4'>
                    <div className="">
                        <div className="flex justify-center rounded-lg overflow-hidden">
                            <img src={data.image} alt="" />
                        </div>
                    </div>
                    <div className="">
                        <div className="font-semibold text-2xl">
                            {data.name}
                        </div>
                        <Badge className="inline-block bg-primary-light text-primary-dark my-1">
                            {data.category}
                        </Badge>
                        <div className="mb-3">
                            {data.description}
                        </div>
                        <div className="">
                            <div className="my-1">
                                <TableComp title={`Pilihan ${data.size ? "ukuran" : "rasa"}`} head={["#", `Pilihan ${data.size ? "ukuran" : "rasa"}`, "Harga", ""]} tableContent={OptionalData(data.size ? data.size : data.flavor)}></TableComp>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
