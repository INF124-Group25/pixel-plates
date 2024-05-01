import style from "./page.module.css";
import Image from "next/image";

const FollowerCard: React.FC<{ src: string; name: string; bio: string }> = ({
    src,
    name,
    bio,
}) => {
    return (
        <div className={style.followerCard}>
            <div>
                <Image src={src} alt={name} width={100} height={100}></Image>
                <p>{name}</p>
                <p>{bio}</p>
            </div>
            {/* invoke an action! */}
            <button>Unfollow</button>
        </div>
    );
};

export default FollowerCard;