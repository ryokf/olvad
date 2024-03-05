import React from "react";
import Admin from "../../../Templates/Admin";

function Index({ wallets }) {
    console.log(wallets)

    let profit = wallets.income - wallets.outcome

    const numberFormat = (value) =>
        new Intl.NumberFormat('ID-id', {
            style: 'currency',
            currency: 'IDR',
        }).format(value);

    return (
        <Admin title="Dashboard">
            <div className="mx-10">
                <div className="">saldo : {numberFormat(wallets.balance)}</div>
                <div className="">pemasukan : {numberFormat(wallets.income)}</div>
                <div className="">pengeluaran : {numberFormat(wallets.outcome)}</div>
                <div className="">keuntungan : {numberFormat(profit)}</div>
                <h1 className="text-xl font-bold mt-4 mb-2">pembagian keuntungan</h1>
                <div className="">sosial : {numberFormat(profit * 10 / 100)}</div>
                <div className="">operasional : {numberFormat( profit * 40 / 100)}</div>
                <div className="">tabungan : {numberFormat(profit * 50 / 100)}</div>

            </div>
        </Admin>
    );
}

export default Index;
