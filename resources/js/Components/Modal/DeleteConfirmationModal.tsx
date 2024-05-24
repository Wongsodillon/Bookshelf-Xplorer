import Modal from "../Modal";
import { Books } from "@/types";
import { useForm } from "@inertiajs/react";
import PrimaryButton from "../UI/PrimaryButton";
import DangerButton from "../UI/DangerButton";
import { FormEventHandler } from "react";

type DeleteConfirmationModalProps = {
    show: boolean;
    onClose: CallableFunction;
    book: Books;
}

const DeleteConfirmationModal = ({ show, onClose, book }: DeleteConfirmationModalProps) => {

    const { post, errors, processing, reset, delete:deleteBook } = useForm({
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
                <p className="text-xl text-red-600 mb-2">Delete book</p>
                <p className="text-2xl">{book.book_title}</p>
                <p className="text-gray-500">Are you sure you want to delete this book?</p>
                <div className="flex justify-end gap-2 mt-6">
                    <PrimaryButton onClick={() => onClose()} type="button">Cancel</PrimaryButton>
                    <DangerButton>Delete</DangerButton>
                </div>
            </form>
        </Modal>
    );
}

export default DeleteConfirmationModal;
