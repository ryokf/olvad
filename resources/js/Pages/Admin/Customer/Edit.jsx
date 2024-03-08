import { Button, Modal } from 'flowbite-react';
import React, { useState } from 'react';
import { FaEdit } from "react-icons/fa";
import { useForm } from '@inertiajs/react'
import { Label, TextInput } from 'flowbite-react';

export default function Edit({ dataCustomer }) {
    const [openModal, setOpenModal] = useState(false);

    const { data, setData, put, errors } = useForm({
        id: dataCustomer.id,
        name: dataCustomer.name,
        address: dataCustomer.address,
    })

    function submit(e) {
        e.preventDefault()
        put('/admin/customer')
        setData('name', '')
        setData('address', '')
        setOpenModal(false)
    }

    return (
        <>
            <Button className='bg-amber-400 aspect-square' size={'xs'} color='warning' onClick={() => setOpenModal(true)}><FaEdit /></Button>
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
                        <div className="w-full flex justify-end mt-4 col-span-4">
                            <Button color="primary" type="submit" size={'sm'}>Simpan</Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}
