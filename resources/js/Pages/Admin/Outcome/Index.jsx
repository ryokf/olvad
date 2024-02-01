import React, { useState } from "react";
import { useForm, Link } from '@inertiajs/react'
import { Button, Flowbite } from 'flowbite-react';
import Admin from "../../../Templates/Admin";
import DateFormat from "../../../Helper/DateFormat";
import OutcomeBuy from "./OutcomeBuy";
import CustomTheme from "../../../theme/CustomTheme";
import OutcomeSocial from "./OutcomeSocial";

export default function Index({ outcomeData }) {
    // const { data, setData, post, processing, errors } = useForm(
    //     {
    //         type: isBuyType ? 'buy' : 'social',
    //         description: 'sedekah bulanan',
    //         total_cost: 20000,
    //         customer_id: 1,
    //         detail_item: [
    //             {
    //                 product_id: 2,
    //                 amount: 10,
    //                 unit_id: 1,
    //             },
    //             {
    //                 product_id: 3,
    //                 amount: 5,
    //                 unit_id: 1,
    //             },
    //         ]
    //     }
    // )

    // function submit(e) {
    //     e.preventDefault()
    //     post('/admin/outcome')
    // }

    const date = DateFormat();
    const outcomeType = window.location.pathname.split("/")[3] == "buy" ? true : false;

    return (
        <>
            <Admin title="Pengeluaran" subtitle={`${date.day}, ${date.dateNumber} ${date.month} ${date.year}`}>
                <div className="my-4 pl-4 flex gap-2">
                    <Flowbite theme={{ theme: CustomTheme }}>
                        <Button outline={!outcomeType} color={outcomeType ? 'primary' : 'light'} onClick={() => window.location.replace('/admin/outcome/buy')}>Pembelian</Button>
                        <Button outline={outcomeType} color={outcomeType ? 'light' : 'primary'} onClick={() => window.location.replace('/admin/outcome/social')}>Sosial</Button>
                    </Flowbite>
                </div>
                {
                    outcomeType ? <OutcomeBuy data={outcomeData.outcomeBuys.data} paginationData={outcomeData.outcomeBuys.meta}></OutcomeBuy> : <OutcomeSocial data={outcomeData.outcomeSocials.data} paginationData={outcomeData.outcomeSocials.meta}></OutcomeSocial>
                }
            </Admin>

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
