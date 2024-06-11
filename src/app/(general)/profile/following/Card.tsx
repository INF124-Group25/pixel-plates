"use client"

import Link from "next/link";
import style from "./page.module.css";
import Image from "next/image";

// const Context = createContext();

const FollowerCard: React.FC<{ src: string; name: string; bio: string }> = ({
    src,
    name,
    bio,
}) => {
    // console.log("src: ", src);//TESTING
    return (
        <div className={style.followerCard}>
            <div>
                <Link href={`/user/${name}`} >
                    {/* <a> */}
                    <Image src={'/'+src} alt={name} width={100} height={100} ></Image>
                    {/* </a> */}
                </Link>
                <p>{name}</p>
                <p>{bio}</p>
            </div>
            {/* invoke an action! */}
            <button>Unfollow</button>
        </div>
    );
};

export default FollowerCard;