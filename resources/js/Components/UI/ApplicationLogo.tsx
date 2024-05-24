import { SVGAttributes } from 'react';

type Props = {
    className?: string;
}

export default function ApplicationLogo({ className = '' }: Props) {
    return (
        <img className={(className ? className : "")} src="https://firebasestorage.googleapis.com/v0/b/laracasts-8e7f0.appspot.com/o/images%2Flogo.png?alt=media&token=6ac2f7bf-9049-49e2-80f5-d4972442bbb0" alt="" />
    );
}
