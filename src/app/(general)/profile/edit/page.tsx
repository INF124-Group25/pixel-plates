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
              <form action={editProfileForm} className={styles.profileEditBoxForm}>
                <div className={styles.profileEditBoxFormFirstContainer}>
                  <div >
                    <label htmlFor="username">Change username</label>
                    <input type="text" name="username" id="username" placeholder={name}/>
                  </div>
                  <div>
                    <label htmlFor="password">Change password</label>
                    <input type="password" name="password" id="password" placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"/>
                  </div>
                  <div>
                    <label htmlFor="bio">Bio</label>
                    <textarea name="bio" id="bio" cols={30} rows={10} placeholder={description}></textarea>
                  </div>
                </div>
                <div>
                  <button type="submit">Save</button>
                </div>
              </form>
            </div>
    );
};

export default ProfileEdit;
