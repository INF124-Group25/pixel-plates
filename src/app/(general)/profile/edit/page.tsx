import EditProfile from "@/components/EditProfile";
import styles from "./page.module.css";

const ProfileEdit = () => {

    return (
            <div className={styles.profileEditBox}>
              <h3>Edit Profile</h3>
              <EditProfile />
            </div>
    );
};

export default ProfileEdit;
