import React from "react";
import Admin from "../../../Templates/Admin";

function Index({ wallets }) {
    console.log(wallets)

    let profit = wallets.income - wallets.outcome

    return (
        <Admin title="Dashboard">
            <div className="mx-10">
                <div className="">saldo : Rp{wallets.balance}</div>
                <div className="">pemasukan : Rp{wallets.income}</div>
                <div className="">pengeluaran : Rp{wallets.outcome}</div>
                <div className="">keuntungan : Rp{wallets.profit}</div>
                <h1 className="text-xl font-bold mt-4 mb-2">pembagian keuntungan</h1>
                <div className="">sosial : Rp{profit - profit * 10/100}</div>
                <div className="">operasional : Rp{profit - profit * 40/100}</div>
                <div className="">tabungan : Rp{profit - profit * 50/100}</div>

            </div>
        </Admin>
    );
}

export default Index;
