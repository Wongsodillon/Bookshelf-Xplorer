import { List } from "@/types"
import Modal from "../Modal"
import InputLabel from "../UI/InputLabel"
import TextInput from "../UI/TextInput"
import { useForm } from "@inertiajs/react"
import PrimaryButton from "../UI/PrimaryButton"
import TextArea from "../UI/TextArea"
import { usePrivacy } from "@/Hooks/usePrivacy"
import FilterDropdown from "../FilterDropdown"
import { FormEventHandler, useEffect } from "react"
import { useToast } from "@/Hooks/useToast"

type CreateListModalProps = {
    show: boolean;
    closeable?: boolean;
    onClose: CallableFunction;
}

const CreateListModal = ({ show, onClose }: CreateListModalProps) => {

    const { privacyOptions, privacy, setPrivacy } = usePrivacy({ is_public: 1 })

    const { data, setData, post, errors, processing, reset } = useForm({
        list_name: '',
        list_description: '',
        list_is_public: 1
    })

    const { toastSuccess } = useToast()

    useEffect(() => {
        setData('list_is_public', privacy == 'Anyone - Public List' ? 1 : 0)
        console.log(privacy)
    }, [privacy])

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault()
        post(route('lists.create'), {
            preserveScroll: true,
            onSuccess: () => toastSuccess('List has been created')
        })
    };

    useEffect(() => {
        if (!processing && Object.keys(errors).length === 0) {
            onClose();
        }
    }, [processing, errors]);

    return (
        <Modal onClose={onClose} show={show}>
            <form className="px-6 pt-6 pb-10 flex flex-col items-start gap-2" onSubmit={handleSubmit}>
                <p className="text-lg font-bold text-orange-400">Create a new list</p>
                <div className="mt-4 w-full">
                    <InputLabel htmlFor="list_name" value="List Name" />
                    <TextInput
                        id="list_name"
                        type="text"
                        name="list_name"
                        className="mt-1 block w-full"
                        autoComplete="list_name"
                        onChange={e => setData('list_name', e.target.value)}
                    />
                    {errors.list_name && <p className="text-red-500 font-bold mt-1">{errors.list_name}</p>}
                </div>
                <div className="my-4 w-full">
                    <InputLabel htmlFor="list_description" value="List Description" />
                    <TextArea
                        id="list_description"
                        name="list_description"
                        className="mt-1 block w-full h-32"
                        autoComplete="list_description"
                        onChange={e => setData('list_description', e.target.value)}
                    />
                </div>
                <FilterDropdown
                    options={privacyOptions.map(option => option.label)}
                    value={privacy}
                    setvalue={setPrivacy}
                    includeAll={false}
                />
                <PrimaryButton className="mt-4">
                    Create List
                </PrimaryButton>
            </form>
        </Modal>
    );
}

export default CreateListModal;
