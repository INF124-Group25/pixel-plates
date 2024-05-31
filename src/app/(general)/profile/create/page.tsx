import styles from "./page.module.css";
import Image from "next/image";

const CreatePost = () => {
    const name = "JonnieEats";
    const description = "Add your review ...";
    const imageSrc = "/default-user.png";
    const password = "password";


    const uploadPostForm = async(formData: FormData) => {
      'use server'
      const rawFormData = {

      };

      // mutate data
      // revalidate cache
    };

    return (
            <div className={styles.uploadPostBox}>
              <h3>Create Post</h3>
              <div className={styles.search}>
                <input type="text" placeholder="Search for business ..." />
                <button>Search</button>
              </div>
              <form action={uploadPostForm} className={styles.uploadPostBoxForm}>
              <label htmlFor="upload-image">Upload Images</label>
                <div className={styles.uploadPostBoxFormFirstContainer}>
                  <div className={styles.imageContainer}>
                        <button className={styles.addImageBtn}>Camera</button>
                        <input type="caption" name="caption" id="caption" placeholder="Add a caption ..."/>
                  </div>
                    <label htmlFor="review">Review</label>
                    <textarea name="review" id="review" cols={30} rows={10} placeholder={description} style={{width: '100%'}}></textarea>
                </div>
                <div>
                  <button type="submit">Submit</button>
                </div>
              </form>
            </div>
    );
};

export default CreatePost;
