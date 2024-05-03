import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";

const PostDetails = ({params} : {params: {postId: string}}) => {

    
    // return <h1> Details about post {params.postId}</h1>

    const description = "I really recommend giving this place a try. The two items I got were popcorn chicken and brown sugar milk tea. I love the popcorn chicken from this place. Especially the sauce that they give to compliment the spiciness if you want to add a bit of sweetness. The boba here is really soft and chewy, their brown sugar milk tea is the best I’ve had in this area. 100% recommend!";
    const restaurantName = "Cha For Tea - University Town Center"
    const restaurantAddress = "4187 Campus Dr Ste M173 Irvine, CA 92612"
    const restaurantNumber = "(949) 725-0300"
    const restaurantRating = "3.8 Stars (1099 Reviews)"

    const postImage = "/popcorn-chicken.png";

    type posts = {
        name: string;
        imageSrc: string;
    };
    const postImages: posts[] = new Array(4).fill({
        name: restaurantName,
        imageSrc: postImage,
    });


    const postForm = async(formData: FormData) => {
      'use server'
      const rawFormData = {

      };

      // mutate data
      // revalidate cache
    };

    return (
            <div className={styles.postBox}>
                <h3>{restaurantName}</h3>
             <div className={styles.postHeader}>
                <div>
                    <h6>{restaurantAddress}</h6>
                    <h6>{restaurantNumber}</h6>
                    <h6>{restaurantRating}</h6>
                </div>
                <div className={styles.direction}>
                    <button>Directions</button>
                </div>
              </div>
              <div className={styles.postBoxForm}>
              <div style={{ borderBottom: '1px solid black' }}></div>
                <div className={styles.postBoxFormFirstContainer}>
                    <div className={styles.postPictures}>
                        {postImages.map((image, index) => (
                            <Link
                                key={index}
                                href={`/user/${params.postId}`}
                                className={styles.postPicturesCards}
                                style={{
                                    backgroundImage: `url(${image.imageSrc})`,
                                    borderRadius: '0px',
                                    border: "0.01rem solid black",
                                    margin: "20px"
                                }}
                            />
                        ))}
                    </div>
                  <div style={{ borderBottom: '1px solid black' }}></div>
                 
                    <label htmlFor="review">Review</label>
                    <div style={{ 
                        width: '100%', 
                        border: '1px solid #ccc', 
                        borderRadius: '4px', 
                        padding: '6px 12px', 
                        fontSize: '14px', 
                        overflowY: 'auto', 
                        height: 'auto', 
                        minHeight: '100px', 
                        whiteSpace: 'pre-wrap' 
                    }}>
                        {description}
                    </div>                
                </div>
                <div>
                </div>
              </div>
            </div>
    );
}

export default PostDetails;

