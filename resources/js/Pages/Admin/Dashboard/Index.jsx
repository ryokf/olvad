import React from "react";
import Admin from "../../../Templates/Admin";

function Index({wallets}) {
    console.log(wallets)

    return (
        <Admin title="Dashboard">
            <div className="mx-10">

            <div className="">saldo : Rp.{wallets.balance}</div>
            <div className="">pemasukan : Rp.{wallets.income}</div>
            <div className="">pengeluaran : Rp.{wallets.outcome}</div>
            <div className="">keuntungan : Rp.{wallets.profit}</div>
            </div>
        </Admin>
    );
}

export default Index;
