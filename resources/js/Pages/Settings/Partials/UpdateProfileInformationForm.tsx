import InputError from '@/Components/UI/InputError';
import InputLabel from '@/Components/UI/InputLabel';
import PrimaryButton from '@/Components/UI/PrimaryButton';
import TextInput from '@/Components/UI/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import Dropzone from '@/Components/Dropzone';
import { FormEventHandler, useEffect } from 'react';
import { PageProps } from '@/types';
import TextArea from '@/Components/UI/TextArea';
import { useToast } from '@/Hooks/useToast';
import DangerButton from '@/Components/UI/DangerButton';

type UserInput = {
    username: string;
    name: string;
    email: string;
    about: string;
    profile_pic_url: File | null;
}

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }: { mustVerifyEmail: boolean, status?: string, className?: string }) {
    const user = usePage<PageProps>().props.auth.user;

    const { data, setData, patch, errors, processing } = useForm<UserInput>({
        username: user.username,
        name: user.name,
        email: user.email,
        about: user.about,
        profile_pic_url: null,
    });

    const onDrop = (acceptedFiles: File[]) => {
        setData('profile_pic_url', acceptedFiles[0])
    };

    const { toastSuccess } = useToast()

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('profile.update'), {
            preserveScroll: true,
            onSuccess: () => {
                toastSuccess('Profile updated successfully');
            },
        });
    };

    useEffect(() => {
        console.log(data)
    }, [data.profile_pic_url])

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>
                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel className='text-xl mb-2 font-bold' htmlFor="profile-pic" value="Profile Picture" />
                    <div className='flex gap-4 items-end'>
                        <Dropzone onDrop={onDrop} img={user.profile_pic_url ? user.profile_pic_url : '/storage/profile-pic/none.jpg'} className='max-w-32 max-h-32 rounded-full' />
                        {user.profile_pic_url && (
                            <DangerButton type='button'>Remove</DangerButton>
                        )}
                    </div>
                    <InputLabel value='Drag n Drop profile pic' className='mt-2 text-lg'/>
                </div>
                <div>
                    <InputLabel htmlFor="username" value="Username" />
                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.username}
                        onChange={(e) => setData('username', e.target.value)}
                        isFocused
                        autoComplete="username"
                        disabled
                    />

                </div>

                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>
                <div>
                    <InputLabel htmlFor="about" value="About" />
                    <TextArea
                        id="about"
                        className="mt-1 min-h-36 block w-full"
                        value={data.about}
                        onChange={(e) => setData('about', e.target.value)}
                    />
                </div>
                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                A new verification link has been sent to your email address.
                            </div>
                        )}
                    </div>
                )}
                <PrimaryButton disabled={processing}>Save</PrimaryButton>
            </form>
        </section>
    );
}
