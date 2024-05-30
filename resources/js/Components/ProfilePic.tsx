import { useEffect, useState } from "react";

type ProfilePicProps = {
    img: string
    size?: number
}

const ProfilePic = ({ img, size }: ProfilePicProps) => {

    const [profilePic, setProfilePic] = useState('');

    useEffect(() => {
        setProfilePic(img ? img : '/storage/profile-pic/none.jpg');
    }, [])

    return (
        <img src={profilePic} className={`h-${size} w-${size} rounded-full`} />
    );
}

export default ProfilePic;
