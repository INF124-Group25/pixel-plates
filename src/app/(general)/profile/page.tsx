import styles from "./page.module.css";
import Image from "next/image";

const Profile = () => {
    const name = "JonnieEats";
    const description = "Follow my account for more finds in OC!";
    const imageSrc = "/default-user.png";
    const password = "password";


    const editProfileForm = async(formData: FormData) => {
      'use server'
      const rawFormData = {

      };

      // mutate data
      // revalidate cache
    };

    return (
        <main className={styles.profile}>
            <section className={styles.profileNav}>
                <div className={styles.profileNavFirsttwocontainer}>
                  <div className={styles.profileNavInfo}>
                      <Image
                          src={imageSrc}
                          alt="default user"
                          width={125}
                          height={125}
                      />
                      <h3>{name}</h3>
                      <p>{description}</p>
                  </div>
                  <div className={styles.profileNavButtons}>
                      <button>Edit Profile</button>
                      <button>View Profile</button>
                      <button>View Following</button>
                  </div>
                </div>
                <button className={styles.profileNavUploadButton}>Upload Post</button>
            </section>
            <section className={styles.profileEditBox}>
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
            </section>
        </main>
    );
};

export default Profile;
