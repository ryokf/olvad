import { Button, Modal } from 'flowbite-react';
import React, { useState } from 'react';
import { FaEdit } from "react-icons/fa";
import { useForm, Link } from '@inertiajs/react'
import { Table, Label, Select, TextInput, Flowbite } from 'flowbite-react';

export default function Edit({ dataStore }) {
    const [openModal, setOpenModal] = useState(false);

    const { data, setData, put, errors } = useForm({
        id: dataStore.id,
        name: dataStore.name,
        address: dataStore.address,
        phone: dataStore.phone,
        pic_name: dataStore.pic_name,
    })

    function submit(e) {
        e.preventDefault()
        put('/admin/store')
        setData('name', '')
        setData('address', '')
        setData('phone', '')
        setData('pic_name', '')
        setOpenModal(false)
    }

    console.log(data.pic_name)

    return (
        <>
            <Button className='bg-amber-400' size={'sm'} color='warning' onClick={() => setOpenModal(true)}><FaEdit /></Button>
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Edit data toko</Modal.Header>
                <Modal.Body>
                    <form onSubmit={submit} className="">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email1" value="Nama toko" />
                            </div>
                            <TextInput id="email1" type="text" placeholder="" value={data.name} onChange={e => setData('name', e.target.value)} required />
                            {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email1" value="alamat" />
                            </div>
                            <TextInput id="email1" type="text" placeholder="" value={data.address} onChange={e => setData('address', e.target.value)} required />
                            {errors.address && <div className="text-red-500 text-sm">{errors.address}</div>}
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email1" value="no.telp" />
                            </div>
                            <TextInput id="email1" type="text" placeholder="" value={data.phone} onChange={e => setData('phone', e.target.value)} required />
                            {errors.phone && <div className="text-red-500 text-sm">{errors.phone}</div>}
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email1" value="pic" />
                            </div>
                            <TextInput id="email1" type="text" placeholder="" value={data.pic_name} onChange={e => setData('pic_name', e.target.value)} required />
                            {errors.pic_name && <div className="text-red-500 text-sm">{errors.pic_name}</div>}
                        </div>
                        <div className="w-full flex justify-end mt-4 col-span-4">
                            <Button color="primary" type="submit" size={'sm'}>Simpan</Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}
