import React from "react";

export default function Index({data}) {

    // data.outcomeBuys.data.map(item => {
    //     console.log(item)
    // })

    data.outcomeSocials.data.map(item => {
        console.log(item)
    })

    return (
        <div className="w-screen">
            <h1 className="text-3xl font-bold underline">outcome index</h1>
            {
                data.outcomeBuys.data.map(item => {
                    return (
                        <div key={item.id}>
                            <p>{item.id}</p>
                            <p></p>
                        </div>
                    )
                })
            }
        </div>
    );
}
