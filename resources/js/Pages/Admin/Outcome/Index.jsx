import React, { useState } from "react";
import { useForm } from '@inertiajs/react'
import { Button } from 'flowbite-react';
import Admin from "../../../Templates/Admin";

export default function Index({ outcomeData }) {

    // data.outcomeBuys.data.map(item => {
    //     console.log(item)
    // })

    // data.outcomeSocials.data.map(item => {
    //     console.log(item)
    // })

    const [isBuyType, setIsBuyType] = useState(false);

    const { data, setData, post, processing, errors } = useForm(
        {
            type: isBuyType ? 'buy' : 'social',
            description: 'sedekah bulanan',
            total_cost: 20000,
            customer_id: 1,
            detail_item: [
                {
                    product_id: 2,
                    amount: 10,
                    unit_id: 1,
                },
                {
                    product_id: 3,
                    amount: 5,
                    unit_id: 1,
                },
            ]
        }
    )

    console.log(isBuyType)

    function submit(e) {
        e.preventDefault()
        post('/admin/outcome')
    }


    const date = new Date;
    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'long' });
    const dateNumber = date.getDate();
    const day = date.toLocaleString('default', { weekday: 'long' });

    return (
        <>
            <Admin title="Pengeluaran" subtitle={`${day}, ${dateNumber} ${month} ${year}`}>
                {/* <h1>halo</h1> */}
            </Admin>

            {/* // <div className="w-screen">
        //     <h1 className="text-3xl font-bold underline">outcome index</h1>
        //     {
        //         data.outcomeBuys.data.map(item => {
        //             return (
        //                 <div key={item.id}>
        //                     <p>{item.id}</p>
        //                     <p></p>
        //                 </div>
        //             )
        //         })
        //     }
        // </div> */}

            {/* <div>
                <Button onClick={() => setIsBuyType(true)}>buy</Button>
                <Button onClick={() => setIsBuyType(false)}>social</Button>
            </div>

            <h1>tambah data pengeluaran {isBuyType ? 'belanja' : 'social'}</h1>

            <form onSubmit={submit}>
                <input type="text" value={data.email} onChange={e => setData('email', e.target.value)} />
                {errors.email && <div>{errors.email}</div>}
                <input type="password" value={data.password} onChange={e => setData('password', e.target.value)} />
                {errors.password && <div>{errors.password}</div>}
                <button type="submit" disabled={processing}>Login</button>
            </form> */}

        </>

    );
}
