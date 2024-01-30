import React from "react";

'use client';

import { Footer } from 'flowbite-react';

export default function AdminFooterComp() {
    return (
        <Footer container className="bg-transparent">
            <Footer.Copyright href="#" by="OLVAD™" year={2024} />
            <Footer.LinkGroup>
                <Footer.Link href="#">About</Footer.Link>
                <Footer.Link href="#">Privacy Policy</Footer.Link>
                <Footer.Link href="#">Licensing</Footer.Link>
                <Footer.Link href="#">Contact</Footer.Link>
            </Footer.LinkGroup>
        </Footer>
    );
}
