import React from "react";

import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Link } from '@inertiajs/react'
import { MdDelete } from "react-icons/md";
export default function DeleteConfirm({ id, href }) {
    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <Button className="bg-red-500 aspect-square" size={'xs'} color="failure" onClick={() => setOpenModal(true)}><MdDelete /></Button>
            <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Anda yakin ingin menghapus data ini?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Link href={href} method="delete" data={{ id: id }}>
                                <Button className="bg-red-500" color="failure" onClick={() => setOpenModal(false)}>
                                    yakin
                                </Button>
                            </Link>
                            <Button color="gray" onClick={() => setOpenModal(false)}>
                                batal
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
