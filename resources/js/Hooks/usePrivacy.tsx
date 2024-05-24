import { useState, useEffect } from "react";

type usePrivacyProps = {
    is_public?: number | boolean;
}

export const usePrivacy = ({ is_public = 0 }: usePrivacyProps) => {
    const privacyOptions = [{ value: 1, label: 'Anyone - Public List' }, { value: 0, label: 'You - Private List' }];
    const initialPrivacy = is_public === 1 ? 'Anyone - Public List' : 'You - Private List';
    const [privacy, setPrivacy] = useState(initialPrivacy);

    useEffect(() => {
        setPrivacy(is_public === 1 ? 'Anyone - Public List' : 'You - Private List')
    }, [is_public])

    return { privacyOptions, privacy, setPrivacy }
}
