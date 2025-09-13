import Modal from "../Modal";
import { Books } from "@/types";
import { useForm } from "@inertiajs/react";
import PrimaryButton from "../UI/PrimaryButton";
import DangerButton from "../UI/DangerButton";
import { FormEventHandler, useState } from "react";

type DeleteConfirmationModalProps = {
    show: boolean;
    onClose: CallableFunction;
    book: Books;
}

const DeleteConfirmationModal = ({ show, onClose, book }: DeleteConfirmationModalProps) => {

    const { processing, delete:deleteBook } = useForm({
        errors: ''
    })

    const onSubmit: FormEventHandler = e => {
        e.preventDefault()
        deleteBook(route('admin.delete', { id: book.id }), {
            preserveScroll: true,
            onSuccess: () => window.location.reload(),
        })
    }

    return (
        <Modal show={show} onClose={onClose}>
            <form className="p-6" onSubmit={onSubmit}>
                <p className="text-xl text-danger font-bold mb-2">Delete book</p>
                <p className="text-2xl text-white">{book.book_title}</p>
                <p className="text-slate-400">Are you sure you want to delete this book?</p>
                <div className="flex justify-end gap-2 mt-6">
                    <PrimaryButton onClick={() => onClose()} type="button">Cancel</PrimaryButton>
                    <DangerButton disabled={processing}>Delete</DangerButton>
                </div>
            </form>
        </Modal>
    );
}

export default DeleteConfirmationModal;
