import { forwardRef, useEffect, useImperativeHandle, useRef, TextareaHTMLAttributes } from 'react';

export default forwardRef(function TextArea(
    { className = '', isFocused = false, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement> & { isFocused?: boolean },
    ref
) {
    const localRef = useRef<HTMLTextAreaElement>(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <textarea
            {...props}
            className={
                'resize-none border-gray-300 focus:border-indigo-500 focus:ring-indigo-600 rounded-md shadow-sm ' +
                className
            }
            ref={localRef}
        />
    );
});
