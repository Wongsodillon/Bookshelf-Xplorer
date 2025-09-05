import Modal from "../Modal";
import { Books, Review } from "@/types";
import { useForm } from "@inertiajs/react";
import PrimaryButton from "../UI/PrimaryButton";
import DangerButton from "../UI/DangerButton";
import { FormEventHandler } from "react";
import { useToast } from "@/Hooks/useToast";

type DeleteReviewConfirmationModalProps = {
    show: boolean;
    onClose: CallableFunction;
    review: Review | null;
    refetch?: CallableFunction;
}

const DeleteReviewConfirmationModal = ({ show, onClose, review, refetch }: DeleteReviewConfirmationModalProps) => {

    const { post, errors, processing, reset, delete:deleteBook } = useForm({
        errors: ''
    })

    if (!review) return null;

    const { toast } = useToast()

    const onSubmit: FormEventHandler = e => {
        e.preventDefault()
        deleteBook(route('review.delete', { id: review.id }), {
            preserveScroll: true,
            onSuccess: () => {
            onClose()
                if (refetch) refetch()
                toast("Review deleted successfully")
            },
        })
    }

    return (
        <Modal show={show} onClose={onClose}>
            <form className="p-6" onSubmit={onSubmit}>
                <p className="text-xl text-danger mb-2">Delete Review</p>
                <p className="text-xl mb-2">{review.review}</p>
                <p className="text-gray-500">Are you sure you want to delete this review?</p>
                <div className="flex justify-end gap-4 mt-4">
                    <PrimaryButton onClick={() => onClose()} type="button">Cancel</PrimaryButton>
                    <DangerButton>Delete</DangerButton>
                </div>
            </form>
        </Modal>
    );
}

export default DeleteReviewConfirmationModal;
