import React from "react"

import { Button } from 'flowbite-react';

function Component() {
    return (
        <div className="w-screen">
            <Button>Default</Button>
            <Button color="blue">Blue</Button>
            {/* <Button color="gray">Gray</Button>
            <Button color="dark">Dark</Button>
            <Button color="light">Light</Button>
            <Button color="success">Success</Button>
            <Button color="failure">Failure</Button>
            <Button color="warning">Warning</Button>
            <Button color="purple">Purple</Button> */}
        </div>
    );
}

export default function Home() {
    return (
        <div className="w-screen h-screen bg-slate-700">
            <h1 className="text-3xl font-bold underline">halo</h1>
            <Button color="blue">Blue</Button>
        </div>
    )
}
