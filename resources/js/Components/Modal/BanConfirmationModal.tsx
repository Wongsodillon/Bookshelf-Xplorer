import Modal from "../Modal";
import { User } from "@/types";
import { useForm } from "@inertiajs/react";
import PrimaryButton from "../UI/PrimaryButton";
import DangerButton from "../UI/DangerButton";
import { FormEventHandler } from "react";
import { useToast } from "@/Hooks/useToast";

type BanConfirmationModalProps = {
    show: boolean;
    onClose: CallableFunction;
    user: User
}

const BanConfirmationModal = ({ show, onClose, user }: BanConfirmationModalProps) => {

    const { post, errors, processing, reset } = useForm({
        errors: ''
    })

    const { toast } = useToast()

    const onBan: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        post(route('admin.ban', { id: user.id }) , {
            preserveScroll: true,
            onSuccess: () => {
                window.location.reload()
                toast("User banned")
            }
        })
    }

    const onUnban: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        post(route('admin.unban', { id: user.id }) , {
            preserveScroll: true,
            onSuccess: () => {
                window.location.reload()
                toast("User unbanned")
            }
        })
    }

    return (
        <Modal show={show} onClose={onClose}>
            <form className="p-6" onSubmit={user.status == 0 ? onUnban : onBan}>
                <p className="text-xl text-danger mb-2">{user.status == 0 ? 'Unban' : 'Ban'} user</p>
                <p className="text-xl">{user.username}</p>
                <p className="text-gray-500">{`Are you sure you want to ${user.status == 1 ? 'ban' : 'unban'} this user?`}</p>
                <div className="flex justify-end gap-4 mt-4">
                    <PrimaryButton onClick={() => onClose()} type="button">Cancel</PrimaryButton>
                    <DangerButton type="submit">{user.status == 0 ? 'Unban' : 'Ban'}</DangerButton>
                </div>
            </form>
        </Modal>
    );
}

export default BanConfirmationModal;
