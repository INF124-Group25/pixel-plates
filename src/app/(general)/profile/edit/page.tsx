import EditProfile from "@/components/EditProfile";
import styles from "./page.module.css";
import Image from "next/image";

const ProfileEdit = () => {
    const name = "JonnieEats";
    const description = "Follow my account for more finds in OC!";
    const imageSrc = "/default-user.png";
    const password = "password";


    const editProfileForm = async(formData: FormData) => {
      'use server'
      const rawFormData = {

      };
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/`;
      const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + localStorage.getItem("token")
        },
      });
      // mutate data
      // revalidate cache
    };

    return (
            <div className={styles.profileEditBox}>
              <h3>Edit Profile</h3>
              <EditProfile />
            </div>
    );
};

export default ProfileEdit;
