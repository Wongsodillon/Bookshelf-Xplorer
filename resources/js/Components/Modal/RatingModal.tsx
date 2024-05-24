import { FormEventHandler, useEffect, useState } from "react";
import Rating from '@mui/material/Rating';
import { RatingPivot, Books } from "@/types";
import PrimaryButton from "../UI/PrimaryButton";
import { useForm } from "@inertiajs/react";
import Modal from "../Modal";
import { useToast } from "@/Hooks/useToast";

type RatingModalProps = {
    book: Books;
    userRating: RatingPivot;
    show: boolean;
    closeable?: boolean;
    onClose: CallableFunction;
}

const RatingModal = ({ show, onClose, book, userRating }: RatingModalProps) => {

    const [value, setValue] = useState<number | null>(userRating ? userRating.rating : 0);

    const { data, setData, post, errors, processing, reset } = useForm({
        rating: value,
        book_id: book.id,
        user_id: userRating ? userRating.user_id : 0,
        errors: ''
    })

    const { toast } = useToast()

    const addRating: FormEventHandler = e => {
        e.preventDefault()

        post(route('ratings.add', { id: data.book_id }), {
            preserveScroll: true,
            onSuccess: () => {
                toast("Rating added!")
                onClose()
                reset()
            }
        })
    }

    return (
        <Modal show={show} onClose={onClose} maxWidth="xl">
            <form className="p-6 flex flex-col items-center gap-2">
                <p className="text-lg text-orange-400">Rate this book</p>
                <p className="text-2xl">{book.book_title}</p>
                <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue)
                        setData('rating', newValue)
                    }}
                    className="mb-2"
                />
                <PrimaryButton onClick={addRating}>
                    Rate
                </PrimaryButton>
                {errors.rating && <p className="text-red-500 font-bold mt-1">{errors.rating}</p>}
            </form>
        </Modal>
    );
}

export default RatingModal;
