import React from "react";
import TableComp from '../../../Components/Table';
import { useForm } from '@inertiajs/react'
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import DeleteConfirm from '../../../Components/DeleteConfirm';

export default function UnitSetting({ units }) {

    const { data, setData, post, processing, errors } = useForm({
        unit: '',
    })
    function submit(e) {
        e.preventDefault()
        post('/admin/unit')
        setData('unit', '')
    }

    console.log(units)

    return (
        <div className="shadow w-full p-4 rounded-lg overflow-hidden mt-2">
            <h1 className="text-xl font-semibold mb-2">Data satuan</h1>
            {
                units.map((unit, index) => {
                    return (
                        <div className="mb-2 flex">{++index}. {unit.unit} | <DeleteConfirm className="inline" href={'/admin/unit/'} id={unit.id}></DeleteConfirm></div>
                    )
                })
            }
            <div className="w-1/2 my-4">
                <form onSubmit={submit} className="flex">
                    <div>
                        <TextInput value={data.unit} onChange={e => setData('unit', e.target.value)} type="text" placeholder="masukkan nama satuan" required />
                    </div>
                    <Button type="submit" size={"xs"} color="success" className="ml-2 hover:bg-primary-medium">tambah</Button>
                </form>
            </div>
        </div>
    )
}
