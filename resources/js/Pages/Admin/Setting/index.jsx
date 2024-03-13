import React from "react";
import { useForm } from '@inertiajs/react'
import Admin from "../../../Templates/Admin";
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import WalletSetting from "./WalletSetting";
import UnitSetting from "./UnitSetting";


export default function Index({ wallets, units }) {
    console.log(units)
    return (
        <Admin title="Pengaturan">
            <div className="mx-10 rounded-lg">
                <WalletSetting wallets={wallets}></WalletSetting>
                <UnitSetting units={units}></UnitSetting>
            </div>
        </Admin>
    );
}
