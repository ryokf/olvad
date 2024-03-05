import React from "react";
import { useForm } from '@inertiajs/react'
import Admin from "../../../Templates/Admin";
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';


export default function Index({ wallets }) {
    console.log(wallets)

    const { data, setData, post, processing, errors } = useForm({
        balance: wallets.balance,
        outcome: wallets.outcome,
        income: wallets.income,
    })

    function submit(e) {
        e.preventDefault()
        post('/admin/wallet')
    }

    const numberFormat = (value) =>
        new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(value);

    return (
        <Admin title="Pengaturan">
            <div className="mx-10 rounded-lg">
                <div className="shadow w-full p-4 rounded-lg overflow-hidden">
                    <h1 className="text-xl font-semibold mb-2">Data uang</h1>
                    <form className="grid grid-cols-3 gap-4" onSubmit={submit}>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email1" value="Balance" />
                            </div>
                            <TextInput value={data.balance} onChange={e => setData('balance', e.target.value)} id="balance" type="number" required />
                        </div>
                        {errors.email && <div>{errors.email}</div>}
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email1" value="Outcome" />
                            </div>
                            <TextInput value={data.outcome} onChange={e => setData('outcome', e.target.value)} id="balance" type="number" required />
                        </div>
                        {errors.email && <div>{errors.email}</div>}
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email1" value="Income" />
                            </div>
                            <TextInput value={data.income} onChange={e => setData('income', e.target.value)} id="balance" type="number" required />
                        </div>
                        {errors.email && <div>{errors.email}</div>}
                        <div className="flex justify-end col-span-3">
                            <Button color="success" className="mt-4 bg-primary-light" type="submit" disabled={processing}>Simpan</Button>
                        </div>
                    </form>
                </div>
            </div>
        </Admin>
    );
}
