import Modal from "../Modal"
import { List, Books, User, ModalProps } from "@/types"
import BookPreview from "../BookPreview"
import { useForm } from "@inertiajs/react"
import { BiHide } from "react-icons/bi"
import PrimaryButton from "../UI/PrimaryButton"
import { FormEventHandler } from "react"
import { Bounce, toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useToast } from "@/Hooks/useToast"

type AddToListModalProps = ModalProps & {
    lists: List[]
    book: Books
}

const AddToListModal = ({ show, onClose, lists, book }: AddToListModalProps ) => {

    const checkList = (list: List) => {
        return list.list_details.some(detail => detail.book_id === book.id)
    }

    const { data, setData, post } = useForm({
        book_id: book.id,
        list_id: 0
    })

    const { toastSuccess } = useToast()

    const addToList: FormEventHandler = (e) => {
        e.preventDefault()
        post(route('lists.add'), {
            preserveScroll: true,
            onSuccess: () => {
                toastSuccess('Book added to list')
                onClose()
            }
        })
    }

    return (
        <Modal show={show} onClose={onClose} maxWidth="2xl">
            <form className="p-6 flex flex-col" onSubmit={addToList}>
                <p className="text-xl font-semibold">Add to List</p>
                <br />
                    {lists.length === 0 ? (
                        <h1 className="text-xl md:text-2xl font-semibold">No lists available</h1>
                    ) : (
                        lists.map(list => (
                            <div key={list.id} className="mb-8">
                                <div className="flex gap-4">
                                    <BookPreview books={list.list_details.map(detail => detail.book)} className="flex-1" count={3}/>
                                    <div className="flex flex-col gap-2 flex-1">
                                        <div className="flex justify-between">
                                            <h1 className="text-xl md:text-2xl font-semibold">{list.list_name}</h1>
                                        </div>
                                        <p>{list.list_details.length} Books</p>
                                        { checkList(list) ?
                                            <PrimaryButton className="max-w-40 py-2" disabled={true}>
                                                Added
                                            </PrimaryButton>
                                            :
                                            <PrimaryButton className="max-w-40 py-2" onClick={() => setData('list_id', list.id)}>
                                                Add to List
                                            </PrimaryButton>
                                        }
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
            </form>
        </Modal>
    )
}

export default AddToListModal
